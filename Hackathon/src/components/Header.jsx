import { Bell, Search, Sparkles, UserCircle2 } from 'lucide-react';

export default function Header({
  mode = 'home',
  searchValue = '',
  onSearch,
  onNavigate,
  onOpenHistory,
  onOpenProgress,
  role,
  difficulty,
  questionStatus,
  timerLabel,
}) {
  if (mode === 'interview') {
    return (
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <button type="button" onClick={onNavigate} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-slate-950">Interview Agent</div>
              <div className="text-xs text-slate-500">Focused interview workspace</div>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="chip">{role}</span>
            <span className="chip">{difficulty}</span>
            <span className="chip">{questionStatus}</span>
            <span className="chip">{timerLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenHistory && (
              <button type="button" className="secondary-button px-4 py-2.5" onClick={onOpenHistory}>
                History
              </button>
            )}
            <button type="button" className="secondary-button px-4 py-2.5" onClick={onOpenProgress}>
              Exit Interview
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:px-6">
        <button type="button" onClick={onNavigate} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="text-base font-semibold text-slate-950">Interview Agent</div>
            <div className="text-xs text-slate-500">AI-powered mock interviews</div>
          </div>
        </button>

        <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={searchValue}
            onChange={(event) => onSearch?.(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search roles, skills, or interview types"
          />
        </div>

        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <button type="button" onClick={onOpenHistory} className="secondary-button px-4 py-2.5">
            My Interviews
          </button>
          <button type="button" onClick={onOpenProgress} className="secondary-button px-4 py-2.5">
            Progress
          </button>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50">
            <Bell className="h-4 w-4" />
          </button>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20">
            <UserCircle2 className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>
  );
}
