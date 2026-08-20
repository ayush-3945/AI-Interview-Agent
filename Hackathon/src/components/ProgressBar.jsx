import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, label, tone = 'blue' }) {
  const barClass = tone === 'emerald' ? 'bg-emerald-500' : tone === 'rose' ? 'bg-rose-500' : 'bg-blue-600';
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-2">
      {(label || label === '') && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="font-medium text-slate-700">{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={`h-full rounded-full ${barClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
