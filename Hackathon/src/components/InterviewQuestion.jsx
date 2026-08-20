import {
  ArrowLeft,
  ArrowRight,
  TimerReset,
  Volume2,
  VolumeX,
  Square,
  LoaderCircle,
} from 'lucide-react';

import ProgressBar from './ProgressBar.jsx';

export default function InterviewQuestion({
  role,
  difficulty,
  currentIndex,
  totalQuestions,
  question,
  timerLabel,
  progressValue,
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  onListenQuestion,
  onStopQuestion,
  isQuestionSpeaking,
  isVoiceSupported,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Question Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Question {currentIndex + 1} of {totalQuestions}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {role}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <TimerReset className="h-4 w-4" />
          {timerLabel}
        </div>
      </div>

      {/* AI Interviewer */}
      <div className="mt-8 flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8">

        {/* Animated interviewer circle */}
        <div className="relative flex h-32 w-32 items-center justify-center">

          {isQuestionSpeaking && (
            <>
              <div className="absolute h-32 w-32 animate-ping rounded-full border border-blue-300 opacity-30" />

              <div className="absolute h-24 w-24 animate-pulse rounded-full border-2 border-blue-400 opacity-50" />
            </>
          )}

          <div
            className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              isQuestionSpeaking
                ? 'scale-110 border-blue-500 bg-blue-100'
                : 'border-slate-300 bg-white'
            }`}
          >
            {isQuestionSpeaking ? (
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
                <span
                  className="h-5 w-3 animate-pulse rounded-full bg-blue-500"
                  style={{
                    animationDelay: '120ms',
                  }}
                />
                <span
                  className="h-3 w-3 animate-pulse rounded-full bg-blue-500"
                  style={{
                    animationDelay: '240ms',
                  }}
                />
              </div>
            ) : (
              <Volume2 className="h-7 w-7 text-slate-500" />
            )}
          </div>
        </div>

        <div className="mt-5 text-center">
          <div className="text-base font-semibold text-slate-900">
            AI Interviewer
          </div>

          <p className="mt-1 text-sm text-slate-600">
            {isQuestionSpeaking
              ? 'Interviewer is speaking...'
              : 'Listen carefully, then answer when ready.'}
          </p>
        </div>

        {/* Existing manual speech controls */}
        <div className="mt-5 flex items-center gap-2">

          <button
            type="button"
            onClick={
              isQuestionSpeaking
                ? onStopQuestion
                : onListenQuestion
            }
            disabled={!isVoiceSupported}
            aria-label={
              isQuestionSpeaking
                ? 'Stop interviewer'
                : 'Replay interview question'
            }
            className={`secondary-button px-4 py-2.5 ${
              isQuestionSpeaking
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : ''
            }`}
          >
            {isQuestionSpeaking ? (
              <Square className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}

            {isQuestionSpeaking
              ? 'Stop'
              : 'Replay'}
          </button>

          {isQuestionSpeaking && (
            <LoaderCircle className="h-5 w-5 animate-spin text-blue-600" />
          )}

          {!isVoiceSupported && (
            <span className="text-sm text-slate-500">
              Audio unavailable
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <ProgressBar
          value={progressValue}
          label="Interview progress"
        />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">

        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="inline-flex items-center gap-2 font-medium text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous question
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="inline-flex items-center gap-2 font-medium text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next question
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </section>
  );
}