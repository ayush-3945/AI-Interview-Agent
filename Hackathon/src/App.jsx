import { AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { roles as allRoles } from './data/roles.js';

import HomePage from './pages/Home.jsx';
import InterviewSetupPage from './pages/InterviewSetup.jsx';
import InterviewPage from './pages/Interview.jsx';
import ResultsPage from './pages/Results.jsx';
import HistoryPage from './pages/History.jsx';

import InterviewGenerationModal from './components/InterviewGenerationModal.jsx';
import SubmitAnswerConfirmModal from './components/SubmitAnswerConfirmModal.jsx';

import {
  calculateFinalSummary,
  evaluateAnswer,
  generateQuestions,
} from './services/interviewService.js';

import {
  getInterviewHistory,
  saveInterviewHistory,
} from './utils/storage.js';


const DEFAULT_CONFIG = {
  questionCount: 10,
  interviewType: 'Mixed',
  duration: '30 minutes',
};


const durationToSeconds = (duration) => {
  if (duration === '15 minutes') return 15 * 60;
  if (duration === '45 minutes') return 45 * 60;

  return 30 * 60;
};


const formatTimer = (seconds) => {
  const safeSeconds = Math.max(0, seconds);

  const minutes = String(
    Math.floor(safeSeconds / 60)
  ).padStart(2, '0');

  const remainingSeconds = String(
    safeSeconds % 60
  ).padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};


const createId = () => {
  if (
    typeof crypto !== 'undefined' &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};


const resolveRole = (role) =>
  allRoles.find(
    (item) => item.id === role?.id
  ) || allRoles[0];


const scrollToElement = (id) => {
  window.requestAnimationFrame(() => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  });
};


const createSession = ({
  role,
  difficulty,
  config,
}) => {
  return {
    id: createId(),

    role,

    difficulty,

    interviewType: config.interviewType,

    questionCount: config.questionCount,

    duration: config.duration,

    questions: [],

    currentQuestionIndex: 0,

    answers: [],

    evaluations: [],

    startTime: Date.now(),

    status: 'in-progress',
  };
};


export default function App() {
  const [screen, setScreen] =
    useState('home');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [activeFilter, setActiveFilter] =
    useState('all');

  const [selectedRole, setSelectedRole] =
    useState(allRoles[0]);

  const [selectedDifficulty, setSelectedDifficulty] =
    useState('');

  const [difficultyModalOpen, setDifficultyModalOpen] =
    useState(false);

  const [config, setConfig] =
    useState(DEFAULT_CONFIG);

  const [session, setSession] =
    useState(null);

  const [draftAnswer, setDraftAnswer] =
    useState('');

  const [currentEvaluation, setCurrentEvaluation] =
    useState(null);

  const [submitConfirmOpen, setSubmitConfirmOpen] =
    useState(false);

  // Loading state for Gemini answer evaluation
  const [isEvaluating, setIsEvaluating] =
    useState(false);

  const [validationMessage, setValidationMessage] =
    useState('');

  const [timerSeconds, setTimerSeconds] =
    useState(
      durationToSeconds(
        DEFAULT_CONFIG.duration
      )
    );

  const [history, setHistory] =
    useState([]);

  const [activeResult, setActiveResult] =
    useState(null);

  const [setupError, setSetupError] =
    useState('');

  const [generationState, setGenerationState] =
    useState('idle');

  const [generationError, setGenerationError] =
    useState('');

  const [generationRequest, setGenerationRequest] =
    useState(null);

  const finalizingRef = useRef(false);


  // Load history
  useEffect(() => {
    const storedHistory =
      getInterviewHistory();

    if (Array.isArray(storedHistory)) {
      setHistory(storedHistory);
    }
  }, []);


  // Save history
  useEffect(() => {
    saveInterviewHistory(history);
  }, [history]);


  // Interview timer
  useEffect(() => {
    if (
      screen !== 'interview' ||
      !session
    ) {
      return undefined;
    }

    if (timerSeconds <= 0) {
      return undefined;
    }

    const interval =
      window.setInterval(() => {
        setTimerSeconds(
          (current) =>
            Math.max(0, current - 1)
        );
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, [
    screen,
    session?.id,
    timerSeconds,
  ]);


  // Automatically finalize when timer expires
  useEffect(() => {
    if (
      screen === 'interview' &&
      session &&
      timerSeconds === 0 &&
      !finalizingRef.current
    ) {
      finalizeInterview('Time expired');
    }
  }, [
    screen,
    session,
    timerSeconds,
  ]);


  // Filter roles
  const filteredRoles = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return allRoles.filter((role) => {
      const matchesFilter =
        activeFilter === 'all' ||
        role.category === activeFilter;

      const searchable = [
        role.title,
        role.description,
        role.category,
        ...role.skills,
        ...(role.questionTopics || []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        searchable.includes(query);

      return (
        matchesFilter &&
        matchesSearch
      );
    });
  }, [
    activeFilter,
    searchTerm,
  ]);


  // Progress summary
  const progressSummary = useMemo(() => {
    const totalInterviews =
      history.length;

    const averageScore =
      totalInterviews > 0
        ? Math.round(
            history.reduce(
              (sum, item) =>
                sum + item.score,
              0
            ) / totalInterviews
          )
        : 0;

    const bestEntry =
      history.reduce(
        (best, item) =>
          item.score >
          (best?.score ?? -1)
            ? item
            : best,
        null
      );

    const roleCounts =
      history.reduce(
        (counts, item) => {
          counts[item.role] =
            (counts[item.role] || 0) + 1;

          return counts;
        },
        {}
      );

    const mostPracticedRole =
      Object.entries(roleCounts)
        .sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] ||
      'No sessions yet';

    const recentPerformance =
      history[0]
        ? `${history[0].score}/100 in ${history[0].role}`
        : 'No interview completed yet';

    return {
      totalInterviews,
      averageScore,
      bestScore: bestEntry?.score || 0,
      mostPracticedRole,
      recentPerformance,
    };
  }, [history]);


  const openHome = () => {
    setScreen('home');
  };


  const openRoleSelection = () => {
    setScreen('home');

    scrollToElement(
      'role-selection-grid'
    );
  };


  const openProgress = () => {
    setScreen('home');

    scrollToElement(
      'progress-section'
    );
  };


  const handleSelectRole = (role) => {
    setSelectedRole(role);

    setSelectedDifficulty('');

    setDifficultyModalOpen(true);

    setSetupError('');
  };


  const handleContinueDifficulty = () => {
    if (!selectedDifficulty) {
      return;
    }

    setDifficultyModalOpen(false);

    setConfig(DEFAULT_CONFIG);

    setScreen('setup');

    setSetupError('');
  };


  // Start a new interview
  const handleStartInterview = () => {
    if (
      !selectedRole ||
      !selectedDifficulty
    ) {
      setSetupError(
        'Please choose a role and difficulty before starting.'
      );

      return;
    }

    const request = {
      role: selectedRole.title,
      difficulty: selectedDifficulty,
      interviewType:
        config.interviewType,
      questionCount:
        config.questionCount,
    };

    setGenerationRequest(request);

    setGenerationState('loading');

    setGenerationError('');

    setSetupError('');


    generateQuestions(request)
      .then((questions) => {
        const nextSession = {
          ...createSession({
            role: selectedRole,
            difficulty:
              selectedDifficulty,
            config,
          }),

          questions,

          answers:
            Array.from(
              {
                length:
                  questions.length,
              },
              () => null
            ),

          evaluations:
            Array.from(
              {
                length:
                  questions.length,
              },
              () => null
            ),
        };

        setSession(nextSession);

        setTimerSeconds(
          durationToSeconds(
            config.duration
          )
        );

        setDraftAnswer('');

        setCurrentEvaluation(null);

        setIsEvaluating(false);

        setValidationMessage('');

        setActiveResult(null);

        setScreen('interview');

        setGenerationState('idle');

        setGenerationError('');
      })

      .catch((error) => {
        setGenerationState('error');

        setGenerationError(
          error?.message ||
            'Unable to generate a new interview right now.'
        );
      });
  };


  // Retry question generation
  const retryGeneration = () => {
    if (!generationRequest) {
      return;
    }

    setGenerationState('loading');

    setGenerationError('');


    generateQuestions(
      generationRequest
    )
      .then((questions) => {
        const nextSession = {
          ...createSession({
            role: selectedRole,
            difficulty:
              selectedDifficulty,
            config,
          }),

          questions,

          answers:
            Array.from(
              {
                length:
                  questions.length,
              },
              () => null
            ),

          evaluations:
            Array.from(
              {
                length:
                  questions.length,
              },
              () => null
            ),
        };

        setSession(nextSession);

        setTimerSeconds(
          durationToSeconds(
            config.duration
          )
        );

        setDraftAnswer('');

        setCurrentEvaluation(null);

        setIsEvaluating(false);

        setValidationMessage('');

        setActiveResult(null);

        setScreen('interview');

        setGenerationState('idle');

        setGenerationError('');
      })

      .catch((error) => {
        setGenerationState('error');

        setGenerationError(
          error?.message ||
            'Unable to generate a new interview right now.'
        );
      });
  };


  // Update answer/evaluation for a question
  const updateSessionAtIndex = (
    index,
    updater
  ) => {
    setSession((current) => {
      if (!current) {
        return current;
      }

      const nextSession = {
        ...current,
      };

      nextSession.answers = [
        ...current.answers,
      ];

      nextSession.evaluations = [
        ...current.evaluations,
      ];

      updater(
        nextSession,
        index
      );

      return nextSession;
    });
  };


    // Answer changed
    const handleAnswerChange = (
      value
    ) => {
      setDraftAnswer(value);

      if (!session) {
        return;
      }

      updateSessionAtIndex(
        session.currentQuestionIndex,
        (
          nextSession,
          index
        ) => {
          const currentQuestion =
            nextSession.questions[
              index
            ];

          nextSession.answers[index] = {
            ...(nextSession.answers[index] ||
              {}),

            answer: value,

            questionId:
              currentQuestion?.id,
          };
        }
      );
    };


    const handleRequestSubmitAnswer = () => {
      if (
        !session ||
        isEvaluating
      ) {
        return;
      }

      if (!draftAnswer.trim()) {
        setValidationMessage(
          'Please enter an answer before continuing.'
        );

        return;
      }

      const currentQuestion =
        session.questions[
          session.currentQuestionIndex
        ];

      if (!currentQuestion) {
        setValidationMessage(
          'No question is available for this step.'
        );

        return;
      }

      setValidationMessage('');
      setSubmitConfirmOpen(true);
    };


    const handleCancelSubmitAnswer = () => {
      setSubmitConfirmOpen(false);
    };


    const handleConfirmSubmitAnswer = async () => {
      if (
        !session ||
        isEvaluating
      ) {
        return;
      }

      const currentQuestion =
        session.questions[
          session.currentQuestionIndex
        ];

      if (!currentQuestion) {
        setValidationMessage(
          'No question is available for this step.'
        );

        setSubmitConfirmOpen(false);

        return;
      }

      setSubmitConfirmOpen(false);

      try {
        setIsEvaluating(true);

        setValidationMessage('');

        setCurrentEvaluation(null);

        const evaluation =
          await evaluateAnswer({
            answer: draftAnswer,

            question:
              currentQuestion.question,

            role: session.role,

            difficulty:
              session.difficulty,
          });

        updateSessionAtIndex(
          session.currentQuestionIndex,
          (
            nextSession,
            index
          ) => {
            nextSession.answers[index] = {
              ...(nextSession.answers[index] ||
                {}),

              answer: draftAnswer,

              questionId:
                currentQuestion.id,
            };

            nextSession.evaluations[index] =
              evaluation;
          }
        );

        setCurrentEvaluation(
          evaluation
        );
      } catch (error) {
        console.error(
          'Answer evaluation failed:',
          error
        );

        setValidationMessage(
          error?.message ||
            'Unable to evaluate your answer. Please try again.'
        );
      } finally {
        setIsEvaluating(false);
      }
    };


    const handleSubmitAnswer =
      handleRequestSubmitAnswer;


  // ============================================================
  // FINALIZE INTERVIEW
  // ============================================================
  function finalizeInterview(
    reason = 'Completed'
  ) {
    if (
      !session ||
      finalizingRef.current
    ) {
      return;
    }

    finalizingRef.current = true;


    const summary =
      calculateFinalSummary({
        role: session.role,

        difficulty:
          session.difficulty,

        questions:
          session.questions,

        evaluations:
          session.evaluations,
      });


    const completedAt =
      new Date().toISOString();


    const historyEntry = {
      id: createId(),

      roleId:
        session.role.id,

      role:
        session.role.title,

      difficulty:
        session.difficulty,

      score:
        summary.overallScore,

      questionCount:
        session.questions.length,

      questions:
        session.questions.length,

      date:
        completedAt,

      duration:
        session.duration,

      status: 'Completed',

      summary,

      completedAt,

      reason,
    };


    setHistory(
      (current) => [
        historyEntry,
        ...current.filter(
          (item) =>
            item.id !==
            historyEntry.id
        ),
      ]
    );


    setActiveResult(summary);

    setScreen('results');

    setCurrentEvaluation(null);

    setSubmitConfirmOpen(false);

    setDraftAnswer('');

    setValidationMessage('');

    setSetupError('');

    setIsEvaluating(false);

    finalizingRef.current = false;
  }


  // Continue after evaluation
  const handleContinueFromEvaluation =
    () => {
      if (!session) {
        return;
      }


      if (
        session.currentQuestionIndex >=
        session.questions.length - 1
      ) {
        finalizeInterview();

        return;
      }


      const nextIndex =
        session.currentQuestionIndex + 1;


      setSession((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          currentQuestionIndex:
            nextIndex,
        };
      });


      setDraftAnswer(
        session.answers[nextIndex]
          ?.answer || ''
      );

      setCurrentEvaluation(
        session.evaluations[nextIndex] ||
          null
      );

      setValidationMessage('');
    };


  // Previous question
  const handlePreviousQuestion =
    () => {
      if (
        !session ||
        session.currentQuestionIndex ===
          0 ||
        currentEvaluation
      ) {
        return;
      }

      const nextIndex =
        session.currentQuestionIndex - 1;


      setSession((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          currentQuestionIndex:
            nextIndex,
        };
      });


      setDraftAnswer(
        session.answers[nextIndex]
          ?.answer || ''
      );
    };


  // Next question
  const handleNextQuestion =
    () => {
      if (
        !session ||
        currentEvaluation ||
        session.currentQuestionIndex >=
          session.questions.length - 1
      ) {
        return;
      }

      const nextIndex =
        session.currentQuestionIndex + 1;


      setSession((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          currentQuestionIndex:
            nextIndex,
        };
      });


      setDraftAnswer(
        session.answers[nextIndex]
          ?.answer || ''
      );
    };


  // Exit interview
  const handleExitInterview =
    () => {
      const shouldExit =
        window.confirm(
          'Exit the interview and return to role selection?'
        );

      if (!shouldExit) {
        return;
      }

      setSession(null);

      setDraftAnswer('');

      setCurrentEvaluation(null);

      setSubmitConfirmOpen(false);

      setIsEvaluating(false);

      setValidationMessage('');

      setTimerSeconds(
        durationToSeconds(
          DEFAULT_CONFIG.duration
        )
      );

      setScreen('home');

      setGenerationState('idle');

      setGenerationError('');
    };


  // History
  const handleViewHistory = () => {
    setScreen('history');
  };


  // View result
  const handleViewResult = (
    item
  ) => {
    setSelectedRole(
      resolveRole({
        id: item.roleId,
      })
    );

    setSelectedDifficulty(
      item.difficulty
    );

    setActiveResult(
      item.summary
    );

    setScreen('results');
  };


  // Back to roles
  const handleBackToRoles =
    () => {
      setSession(null);

      setDraftAnswer('');

      setCurrentEvaluation(null);

      setSubmitConfirmOpen(false);

      setIsEvaluating(false);

      setValidationMessage('');

      setTimerSeconds(
        durationToSeconds(
          DEFAULT_CONFIG.duration
        )
      );

      setScreen('home');

      setActiveResult(null);

      setGenerationState('idle');

      setGenerationError('');
    };


  // Try again
  const handleTryAgain =
    () => {
      setSession(null);

      setDraftAnswer('');

      setCurrentEvaluation(null);

      setSubmitConfirmOpen(false);

      setIsEvaluating(false);

      setValidationMessage('');

      setScreen('setup');

      setGenerationState('idle');

      setGenerationError('');
    };


  const currentQuestion =
    session?.questions?.[
      session.currentQuestionIndex
    ] || null;


  const questionProgress =
    session &&
    session.questions.length > 0
      ? (
          (session.currentQuestionIndex + 1) /
          session.questions.length
        ) * 100
      : 0;


  const currentTimerLabel =
    formatTimer(timerSeconds);


  return (
    <AnimatePresence mode="wait">

      {/* HOME */}
      {screen === 'home' && (
        <HomePage
          key="home"

          roles={filteredRoles}

          searchTerm={searchTerm}

          activeFilter={activeFilter}

          onSearchChange={
            setSearchTerm
          }

          onFilterChange={
            setActiveFilter
          }

          onStartRole={
            handleSelectRole
          }

          onExploreRoles={
            openRoleSelection
          }

          onNavigate={
            openHome
          }

          onOpenHistory={
            handleViewHistory
          }

          onOpenProgress={
            openProgress
          }

          difficultyModalOpen={
            difficultyModalOpen
          }

          selectedDifficulty={
            selectedDifficulty
          }

          onSelectDifficulty={
            setSelectedDifficulty
          }

          onContinueDifficulty={
            handleContinueDifficulty
          }

          onCloseDifficulty={() =>
            setDifficultyModalOpen(false)
          }

          selectedRole={
            selectedRole
          }

          progressSummary={
            progressSummary
          }

          onClearSearch={() =>
            setSearchTerm('')
          }
        />
      )}


      {/* SETUP */}
      {screen === 'setup' && (
        <InterviewSetupPage
          key="setup"

          role={selectedRole}

          difficulty={
            selectedDifficulty
          }

          config={config}

          onChangeConfig={(
            partial
          ) =>
            setConfig(
              (current) => ({
                ...current,
                ...partial,
              })
            )
          }

          onStartInterview={
            handleStartInterview
          }

          onBack={
            handleBackToRoles
          }

          onNavigate={
            openHome
          }

          onOpenHistory={
            handleViewHistory
          }

          onOpenProgress={
            openProgress
          }

          error={setupError}

          hasQuestions

          isGenerating={
            generationState ===
            'loading'
          }
        />
      )}


      {/* INTERVIEW */}
      {screen === 'interview' &&
        session && (
          <InterviewPage
            key="interview"

            role={session.role}

            difficulty={
              session.difficulty
            }

            questionId={
              currentQuestion?.id
            }

            currentQuestion={
              currentQuestion?.question ||
              ''
            }

            currentIndex={
              session.currentQuestionIndex
            }

            totalQuestions={
              session.questions.length
            }

            timerLabel={
              currentTimerLabel
            }

            progressValue={
              questionProgress
            }

            answer={
              draftAnswer
            }

            onAnswerChange={
              handleAnswerChange
            }

            onSubmitAnswer={
              handleSubmitAnswer
            }

            evaluation={
              currentEvaluation
            }

            // IMPORTANT:
            // Sends Gemini loading state to AnswerInput
            isEvaluating={
              isEvaluating
            }

            isSubmitConfirmOpen={
              submitConfirmOpen
            }

            onContinue={
              handleContinueFromEvaluation
            }

            onPrevious={
              handlePreviousQuestion
            }

            onNext={
              handleNextQuestion
            }

            onExit={
              handleExitInterview
            }

            onNavigate={
              openHome
            }

            onOpenHistory={
              handleViewHistory
            }

            canGoPrevious={
              session.currentQuestionIndex >
                0 &&
              !currentEvaluation &&
              !isEvaluating
            }

            canGoNext={
              session.currentQuestionIndex <
                session.questions.length - 1 &&
              !currentEvaluation &&
              !isEvaluating
            }

            validationMessage={
              validationMessage
            }
          />
        )}


      {/* RESULTS */}
      {screen === 'results' &&
        activeResult && (
          <ResultsPage
            key="results"

            summary={
              activeResult
            }

            onTryAgain={
              handleTryAgain
            }

            onBackToRoles={
              handleBackToRoles
            }

            onViewHistory={
              handleViewHistory
            }

            onNavigate={
              openHome
            }

            onOpenHistory={
              handleViewHistory
            }

            onOpenProgress={
              openProgress
            }
          />
        )}


      {/* HISTORY */}
      {screen === 'history' && (
        <HistoryPage
          key="history"

          history={history}

          onViewResults={
            handleViewResult
          }

          onBackToRoles={
            handleBackToRoles
          }

          onNavigate={
            openHome
          }

          onOpenHistory={
            handleViewHistory
          }

          onOpenProgress={
            openProgress
          }
        />
      )}


      {/* QUESTION GENERATION MODAL */}
      <InterviewGenerationModal
        open={
          generationState !== 'idle'
        }

        loading={
          generationState ===
          'loading'
        }

        error={
          generationError
        }

        roleName={
          selectedRole?.title ||
          selectedRole?.name ||
          'your role'
        }

        onRetry={
          retryGeneration
        }

        onBack={() => {
          setGenerationState(
            'idle'
          );

          setGenerationError('');
        }}
      />

      <SubmitAnswerConfirmModal
        open={submitConfirmOpen}
        loading={isEvaluating}
        onCancel={handleCancelSubmitAnswer}
        onConfirm={handleConfirmSubmitAnswer}
      />

    </AnimatePresence>
  );
}