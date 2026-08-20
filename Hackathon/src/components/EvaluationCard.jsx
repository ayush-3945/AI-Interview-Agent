import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

const metrics = [
  { key: 'technicalAccuracy', label: 'Technical accuracy' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'depth', label: 'Depth' },
  { key: 'communication', label: 'Communication' },
  { key: 'completeness', label: 'Completeness' },
];

export default function EvaluationCard({ evaluation, onContinue, finalQuestion }) {
  const strengths = Array.isArray(evaluation.strengths) ? evaluation.strengths : [];
  const improvements = Array.isArray(evaluation.improvements) ? evaluation.improvements : [];
  const notes = [
    ...strengths.map((item) => `Strength: ${item}`),
    ...improvements.map((item) => `Improve: ${item}`),
  ];
  const recommendation = evaluation.suggestion || evaluation.recommendation || evaluation.feedback || 'Focus on more specific examples and tighter answer structure.';
  const idealAnswer = evaluation.idealAnswer || '';

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="surface-card p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI evaluation
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">Answer review</h3>
          <p className="mt-2 text-sm text-slate-600">Your answer has been evaluated using the Gemini response from the backend.</p>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-2xl font-semibold text-white shadow-lg shadow-slate-900/15">
          {Math.round(evaluation.score ?? evaluation.overall ?? 0)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.key} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <ProgressBar value={Number(evaluation[metric.key]) || 0} label={metric.label} />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold text-slate-700">Notes</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {notes.length > 0 ? notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>{note}</span>
              </li>
            )) : (
              <li className="text-slate-500">No additional notes were returned.</li>
            )}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold text-slate-700">Quick summary</div>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {recommendation}
          </p>
          {idealAnswer && (
            <p className="mt-3 text-sm leading-7 text-slate-600">Ideal answer: {idealAnswer}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={onContinue} className="primary-button px-6 py-3">
          {finalQuestion ? 'See Results' : 'Next Question'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.section>
  );
}
