import { useEffect, useMemo } from 'react';
import Header from '../components/Header.jsx';
import InterviewQuestion from '../components/InterviewQuestion.jsx';
import AnswerInput from '../components/AnswerInput.jsx';
import EvaluationCard from '../components/EvaluationCard.jsx';
import useSpeechRecognition from '../hooks/useSpeechRecognition.js';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis.js';

export default function InterviewPage({
  role,
  difficulty,
  currentQuestion,
  currentIndex,
  totalQuestions,
  timerLabel,
  progressValue,
  answer,
  onAnswerChange,
  onSubmitAnswer,
  evaluation,
  onContinue,
  onPrevious,
  onNext,
  onExit,
  onNavigate,
  onOpenHistory,
  canGoPrevious,
  canGoNext,
  validationMessage,
  isEvaluating,
  isSubmitConfirmOpen,
  questionId,
}) {
  const speechRecognition = useSpeechRecognition({
    onTranscriptChange: onAnswerChange,
  });
  const speechSynthesis = useSpeechSynthesis();

  const voiceState = useMemo(() => {
    if (!speechRecognition.isSupported) return 'unsupported';
    if (speechRecognition.error && /denied|not-allowed|service-not-allowed/i.test(speechRecognition.error)) return 'denied';
    if (speechRecognition.isListening && speechRecognition.transcript) return 'transcribing';
    if (speechRecognition.isListening) return 'listening';
    return 'idle';
  }, [speechRecognition.error, speechRecognition.isListening, speechRecognition.isSupported, speechRecognition.transcript]);

 useEffect(() => {
  speechRecognition.stopListening();
  speechRecognition.resetTranscript();
  speechSynthesis.stop();

  if (!currentQuestion) return;

  const timer = window.setTimeout(() => {
    speechSynthesis.speak(currentQuestion);
  }, 300);

  return () => {
    window.clearTimeout(timer);
    speechSynthesis.stop();
  };
}, [questionId]);

  useEffect(() => () => {
    speechRecognition.stopListening();
    speechSynthesis.stop();
  }, []);

  const handleToggleListening = () => {
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
      return;
    }

    speechSynthesis.stop();
    speechRecognition.startListening(answer);
  };

  const handleClearAnswer = () => {
    speechRecognition.stopListening();
    speechRecognition.resetTranscript();
    onAnswerChange('');
  };

  const handleListenQuestion = () => {
    if (!currentQuestion) return;
    speechRecognition.stopListening();
    speechSynthesis.speak(currentQuestion);
  };

  const handleStopQuestion = () => {
    speechSynthesis.stop();
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#edf2ff_100%)]">
      <Header
        mode="interview"
        role={role?.title || role?.name}
        difficulty={difficulty}
        questionStatus={`Question ${currentIndex + 1} / ${totalQuestions}`}
        timerLabel={timerLabel}
        onNavigate={onNavigate}
        onOpenHistory={onOpenHistory}
        onOpenProgress={onExit}
      />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-6">
        <InterviewQuestion
          role={role?.title || role?.name}
          difficulty={difficulty}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          question={currentQuestion}
          timerLabel={timerLabel}
          progressValue={progressValue}
          onPrevious={onPrevious}
          onNext={onNext}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          onListenQuestion={handleListenQuestion}
          onStopQuestion={handleStopQuestion}
          isQuestionSpeaking={speechSynthesis.isSpeaking}
          isVoiceSupported={speechSynthesis.isSupported}
        />

        <AnswerInput
          value={answer}
          onChange={onAnswerChange}
          onSubmit={onSubmitAnswer}
          validationMessage={validationMessage}
          voiceState={voiceState}
          onToggleListening={handleToggleListening}
          onClearAnswer={handleClearAnswer}
          voiceError={speechRecognition.error}
          voiceHint="Speak naturally. Click the microphone when you're finished."
          isSubmitting={isEvaluating}
          isConfirmationOpen={isSubmitConfirmOpen}
        />

        {evaluation && <EvaluationCard evaluation={evaluation} onContinue={onContinue} finalQuestion={currentIndex === totalQuestions - 1} />}
      </main>
    </div>
  );
}
