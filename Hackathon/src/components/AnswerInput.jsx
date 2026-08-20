import {
  Mic,
  MicOff,
  Send,
  LoaderCircle,
  X,
} from 'lucide-react';

export default function AnswerInput({
  value,
  onChange,
  onSubmit,
  validationMessage,
  voiceState,
  onToggleListening,
  onClearAnswer,
  voiceError,
  voiceHint,
  isSubmitting = false,
  isConfirmationOpen = false,
}) {
  const isListening =
    voiceState === 'listening';

  const isTranscribing =
    voiceState === 'transcribing';

  const isIdle =
    voiceState === 'idle';

  const isUnsupported =
    voiceState === 'unsupported';

  const isDenied =
    voiceState === 'denied';

  const handleSubmit = () => {
    if (
      !value.trim() ||
      isSubmitting ||
      isConfirmationOpen
    ) {
      return;
    }

    onSubmit();
  };

  return (
    <section className="surface-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="section-label">
            Your answer
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Write a structured answer, speak it, or mix both modes freely.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleListening}
          disabled={
            isUnsupported ||
            isSubmitting ||
            isConfirmationOpen
          }
          aria-label={
            isListening
              ? 'Stop voice recording'
              : 'Start voice answer'
          }
          className={`secondary-button px-4 py-2.5 ${
            isListening
              ? 'border-blue-300 bg-blue-50 text-blue-700'
              : ''
          }`}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}

          {isListening
            ? 'Stop'
            : 'Speak'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        {isListening && (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-700">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />
            Listening...
          </span>
        )}

        {isTranscribing && (
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Live transcript
          </span>
        )}

        {isIdle && voiceHint && (
          <span className="text-slate-500">
            {voiceHint}
          </span>
        )}

        {isUnsupported && (
          <span className="text-amber-700">
            Voice input is not supported in this browser.
            Please type your answer.
          </span>
        )}

        {isDenied && (
          <span className="text-rose-600">
            Microphone access was denied.
            You can still type your answer.
          </span>
        )}

        {voiceError &&
          !isDenied &&
          !isUnsupported && (
            <span className="text-rose-600">
              {voiceError}
            </span>
          )}
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={
          isSubmitting ||
          isConfirmationOpen
        }
        rows={8}
        placeholder="Type your response here..."
        className="mt-5 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {validationMessage && (
        <p className="mt-3 text-sm font-medium text-rose-600">
          {validationMessage}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          Aim for a clear answer, one specific example, and a short wrap-up.
        </div>

        <div className="flex gap-3">
          {value.trim() &&
            !isSubmitting && (
              <button
                type="button"
                onClick={onClearAnswer}
                disabled={
                  isSubmitting ||
                  isConfirmationOpen
                }
                className="secondary-button px-4 py-3"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !value.trim() ||
              isSubmitting ||
              isConfirmationOpen
            }
            className={`primary-button px-5 py-3 ${
              !value.trim() ||
              isSubmitting ||
              isConfirmationOpen
                ? 'cursor-not-allowed opacity-60'
                : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                Submit Answer
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}