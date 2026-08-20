import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, LoaderCircle, RefreshCcw } from 'lucide-react';

export default function InterviewGenerationModal({ open, loading, error, roleName, onRetry, onBack }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="surface-card w-full max-w-lg p-6 md:p-8"
          >
            {loading ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-900/20">
                  <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Preparing your interview...</h3>
                <p className="mt-2 text-sm text-slate-600">Generating personalized questions for {roleName}...</p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Interview generation failed</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Couldn't generate your interview.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{error || 'Unable to generate a new interview right now.'}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button type="button" onClick={onBack} className="secondary-button px-5 py-3">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button type="button" onClick={onRetry} className="primary-button px-5 py-3">
                    <RefreshCcw className="h-4 w-4" />
                    Retry
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}