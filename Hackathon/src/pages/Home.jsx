import {
  ArrowRight,
  Layers3,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';

import Hero from '../components/Hero.jsx';
import RoleGrid from '../components/RoleGrid.jsx';
import DifficultySelector from '../components/DifficultySelector.jsx';

export default function Home({
  roles,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onStartRole,
  onExploreRoles,
  difficultyModalOpen,
  selectedDifficulty,
  onSelectDifficulty,
  onContinueDifficulty,
  onCloseDifficulty,
  selectedRole,
  progressSummary,
  onClearSearch,
}) {
  const workflow = [
    'Select role',
    'Choose difficulty',
    'Configure interview',
    'Answer questions',
    'Review results',
  ];

  const highlights = [
    {
      icon: Layers3,
      title: 'Role-based prompts',
      copy: 'Tailored questions for technical and non-technical roles.',
    },
    {
      icon: MessageSquareText,
      title: 'Structured feedback',
      copy: 'A clear evaluation state after each answer.',
    },
    {
      icon: ShieldCheck,
      title: 'Production-ready flow',
      copy: 'Reusable components and local history persistence.',
    },
  ];

  return (
    <>
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 pb-16 lg:px-6">

        {/* Hero */}
        <Hero onExploreRoles={onExploreRoles} />

        {/* Progress */}
        <section id="progress-section" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="section-label">
                Progress
              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Your interview momentum
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                This updates automatically from completed interviews saved in your browser.
              </p>
            </div>
          </div>

          {progressSummary.totalInterviews === 0 ? (
            <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-8 text-center">
              <div className="text-lg font-semibold tracking-tight text-white">
                No interview history yet
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Complete your first interview to see progress, averages,
                and your strongest roles here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

              <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-5">
                <div className="section-label">
                  Total interviews
                </div>

                <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {progressSummary.totalInterviews}
                </div>
              </div>

              <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-5">
                <div className="section-label">
                  Average score
                </div>

                <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {progressSummary.averageScore}/100
                </div>
              </div>

              <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-5">
                <div className="section-label">
                  Best score
                </div>

                <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {progressSummary.bestScore}/100
                </div>
              </div>

              <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-5">
                <div className="section-label">
                  Most practiced role
                </div>

                <div className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {progressSummary.mostPracticedRole}
                </div>
              </div>

              <div className="surface-card border-white/10 bg-[#1A1D24]/90 p-5">
                <div className="section-label">
                  Recent performance
                </div>

                <div className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {progressSummary.recentPerformance}
                </div>
              </div>

            </div>
          )}
        </section>

        {/* Interview Flow */}
        <section className="surface-card border-white/10 bg-[#1A1D24]/90 p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="section-label">
                Interview flow
              </div>

              <h2 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                The path is intentionally simple
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-300">
              {workflow.map((item, index) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {index + 1}. {item}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* Roles + Sidebar */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">

          <RoleGrid
            roles={roles}
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onStartRole={onStartRole}
            onClearSearch={onClearSearch}
          />

          <aside className="space-y-6 xl:sticky xl:top-28">

            {/* Features */}
            <section className="surface-card border-white/10 bg-[#1A1D24]/95 p-6">

              <div className="section-label">
                What you get
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                A polished interview experience
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                The UI is designed to feel like a modern career platform:
                professional, responsive, and easy to understand at a glance.
              </p>

              <div className="mt-5 space-y-3">

                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.title}
                          </div>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {item.copy}
                          </p>
                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </section>

            {/* Reminder */}
            <section className="surface-card border-white/10 bg-[#1A1D24]/95 p-6">

              <div className="section-label">
                Need a reminder?
              </div>

              <div className="mt-3 text-lg font-semibold tracking-tight text-white">
                Select a role, then difficulty, then start the interview.
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Every major action in the product moves you forward with a
                clear next step.
              </p>

              <button
                type="button"
                onClick={onExploreRoles}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#1A1D24]"
              >
                Explore roles
                <ArrowRight className="h-4 w-4" />
              </button>

            </section>

          </aside>
        </div>
      </main>

      {/* Difficulty Modal */}
      <DifficultySelector
        open={difficultyModalOpen}
        role={selectedRole}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={onSelectDifficulty}
        onContinue={onContinueDifficulty}
        onClose={onCloseDifficulty}
      />
    </>
  );
}