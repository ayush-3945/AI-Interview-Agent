import { CalendarDays, Clock3, Eye, Star } from 'lucide-react';
import Header from '../components/Header.jsx';

function formatDate(value) {
  if (!value) return 'Recently';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default function HistoryPage({ history, onViewResults, onBackToRoles, onNavigate, onOpenHistory, onOpenProgress }) {
  return (
    <div>
      <Header mode="home" onNavigate={onNavigate} onOpenHistory={onOpenHistory} onOpenProgress={onOpenProgress} />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-label">My Interviews</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Interview history</h1>
            <p className="section-copy">Review past sessions, scores, and completed interviews stored locally in the browser.</p>
          </div>
          <button type="button" onClick={onBackToRoles} className="secondary-button px-4 py-2.5">
            Back to roles
          </button>
        </div>

        {history.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Clock3 className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">No interviews yet</h2>
            <p className="mt-2 text-sm text-slate-600">Finish a mock interview and your results will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {history.map((item) => (
              <article key={item.id} className="surface-card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">{item.role}</h2>
                    <p className="mt-1 text-sm text-slate-500">{item.difficulty} • {item.questionCount || item.questions} Questions</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {item.status}
                  </div>
                </div>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-blue-500" /> Score</span>
                    <span className="text-2xl font-semibold text-slate-950">{item.score}/100</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-blue-500" /> Date</span>
                    <span className="font-medium text-slate-950">{formatDate(item.date || item.completedAt)}</span>
                  </div>
                </div>

                <button type="button" onClick={() => onViewResults(item)} className="primary-button mt-5 w-full py-3">
                  <Eye className="h-4 w-4" />
                  View Results
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
