import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

export default function SubmitAnswerConfirmModal({
  open,
  loading,
  onCancel,
  onConfirm,
}) {
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
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="surface-card w-full max-w-lg p-6 md:p-8"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Confirmation required
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Submit your answer?
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Are you sure you want to submit this answer? You won't be able to edit it after submission.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="secondary-button px-5 py-3"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="primary-button px-5 py-3"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  'Submit Answer'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}