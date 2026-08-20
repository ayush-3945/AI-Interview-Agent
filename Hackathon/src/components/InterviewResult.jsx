import { ArrowLeft, Clock4, RefreshCcw, History } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

export default function InterviewResult({ summary, onTryAgain, onBackToRoles, onViewHistory }) {
  const breakdownItems = [
    { label: 'Technical Knowledge', value: summary.breakdown.technicalKnowledge },
    { label: 'Communication', value: summary.breakdown.communication },
    { label: 'Problem Solving', value: summary.breakdown.problemSolving },
    { label: 'Answer Relevance', value: summary.breakdown.answerRelevance },
    { label: 'Completeness', value: summary.breakdown.completeness },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <div className="surface-card overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="section-label">Step 3 of 3</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">Interview Complete</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Here is your interview performance summary for <span className="font-semibold text-slate-900">{summary.role}</span> at <span className="font-semibold text-slate-900">{summary.difficulty}</span> difficulty.
            </p>

            <div className="mt-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.2)]">
              <div className="text-sm text-slate-300">Overall score</div>
              <div className="mt-2 text-5xl font-semibold tracking-tight">{summary.overallScore} / 100</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">Based on your answers across {summary.totalQuestions} questions.</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={onTryAgain} className="primary-button px-5 py-3">
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>
              <button type="button" onClick={onBackToRoles} className="secondary-button px-5 py-3">
                <ArrowLeft className="h-4 w-4" />
                Back to Roles
              </button>
              <button type="button" onClick={onViewHistory} className="secondary-button px-5 py-3">
                <History className="h-4 w-4" />
                View Interview History
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {breakdownItems.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <ProgressBar value={item.value} label={item.label} />
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="text-sm font-semibold text-emerald-800">Your Strengths</div>
                <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
                  {summary.strengths.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <div className="text-sm font-semibold text-amber-800">Areas to Improve</div>
                <ul className="mt-3 space-y-2 text-sm text-amber-900/80">
                  {summary.areasToImprove.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-700">AI Recommendation</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{summary.recommendation}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Clock4 className="h-4 w-4" />
                Keep this result in history and compare future sessions over time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
