import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Clock3, MoveRight } from 'lucide-react';

const levels = [
  {
    id: 'Beginner',
    title: 'BEGINNER',
    description: 'Fundamentals and basic concepts',
    accent: 'from-emerald-50 to-emerald-100 border-emerald-200',
    icon: Brain,
  },
  {
    id: 'Intermediate',
    title: 'INTERMEDIATE',
    description: 'Practical and scenario-based questions',
    accent: 'from-blue-50 to-blue-100 border-blue-200',
    icon: MoveRight,
  },
  {
    id: 'Advanced',
    title: 'ADVANCED',
    description: 'Deep technical and challenging problems',
    accent: 'from-indigo-50 to-indigo-100 border-indigo-200',
    icon: Clock3,
  },
];

export default function DifficultySelector({ open, role, selectedDifficulty, onSelectDifficulty, onContinue, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="surface-card w-full max-w-4xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="section-label">Step 1 of 3</div>
                <h3 className="section-heading mt-3">Choose your interview difficulty</h3>
                <p className="section-copy">Selected role: <span className="font-semibold text-slate-900">{role?.title || role?.name}</span></p>
              </div>
              <button type="button" onClick={onClose} className="secondary-button px-4 py-2">
                Close
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {levels.map((level) => {
                const active = selectedDifficulty === level.id;
                const Icon = level.icon;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => onSelectDifficulty(level.id)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      active
                        ? 'border-slate-900 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]'
                        : `bg-gradient-to-br ${level.accent} text-slate-950 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]`
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active ? 'bg-white/10' : 'bg-white'} shadow-sm`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-blue-200' : 'text-blue-700'}`} />
                    </div>
                    <div className="mt-5 text-xs font-semibold tracking-[0.24em] opacity-70">{level.title}</div>
                    <h4 className="mt-2 text-xl font-semibold">{level.id}</h4>
                    <p className={`mt-2 text-sm leading-6 ${active ? 'text-slate-200' : 'text-slate-600'}`}>{level.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex justify-end">
              <button type="button" onClick={onContinue} disabled={!selectedDifficulty} className="primary-button px-6 py-3">
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
