import { ArrowRight, CheckCircle2, Clock3, Layers3, Settings2 } from 'lucide-react';

const questionsOptions = [5, 10, 15];
const interviewTypes = ['Technical', 'Behavioral', 'Mixed'];
  const durations = ['15 minutes', '30 minutes', '45 minutes'];

export default function InterviewSetup({
  role,
  difficulty,
  config,
  onChangeConfig,
  onStartInterview,
  onBack,
  error,
  hasQuestions,
  isGenerating,
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="section-label">Step 2 of 3</div>
          <h2 className="section-heading mt-3">Interview setup</h2>
          <p className="section-copy">Review your role and difficulty, then configure the interview format before starting.</p>
        </div>
        <button type="button" onClick={onBack} className="secondary-button px-4 py-2.5">
          Back to roles
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6 md:p-8">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <Settings2 className="h-4 w-4 text-blue-600" />
            Interview configuration
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Selected role</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">{role?.title || role?.name}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Selected difficulty</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">{difficulty}</div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Layers3 className="h-4 w-4 text-blue-600" />
                Number of questions
              </div>
              <div className="flex flex-wrap gap-3">
                {questionsOptions.map((count) => {
                  const active = config.questionCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => onChangeConfig({ questionCount: count })}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                        active
                          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/15'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {count}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Interview type
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {interviewTypes.map((type) => {
                  const active = config.interviewType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onChangeConfig({ interviewType: type })}
                      className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        active
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock3 className="h-4 w-4 text-blue-600" />
                Duration
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {durations.map((duration) => {
                  const active = config.duration === duration;
                  return (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => onChangeConfig({ duration })}
                      className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        active
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {duration}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <aside className="surface-card p-6 md:p-8">
          <div className="section-label">Ready to practice</div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Your interview is set up</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sensible defaults are prefilled for a smooth first session: 10 questions, mixed format, and a 30-minute timer.
          </p>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Role</span>
                <span className="font-medium text-slate-950">{role?.title || role?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Difficulty</span>
                <span className="font-medium text-slate-950">{difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Questions</span>
                <span className="font-medium text-slate-950">{config.questionCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Interview type</span>
                <span className="font-medium text-slate-950">{config.interviewType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span className="font-medium text-slate-950">{config.duration}</span>
              </div>
            </div>
          </div>

          {error && <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          {!hasQuestions && !error && (
            <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">No questions available for this role and difficulty.</p>
          )}
          <button
  type="button"
  onClick={onStartInterview}
  disabled={!hasQuestions || isGenerating}
  className="primary-button mt-6 flex w-full items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isGenerating ? 'Preparing your interview...' : 'Start Interview'}
  {!isGenerating && <ArrowRight className="h-4 w-4" />}
</button>
        </aside>
      </div>
    </section>
  );
}
