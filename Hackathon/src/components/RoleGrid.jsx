import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { roleFilters } from '../data/roles.js';
import RoleCard from './RoleCard.jsx';

export default function RoleGrid({
  roles,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onStartRole,
  onClearSearch,
}) {
  return (
    <section id="role-selection-grid" className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="section-label">Choose your interview role</div>
          <h2 className="section-heading mt-3">Find the role you want to practice</h2>
          <p className="section-copy">Search by job title, narrow by category, and start a focused interview in a few clicks.</p>
        </div>
        <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search roles"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {roleFilters.map((filter) => {
          const active = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/15'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {roles.length === 0 ? (
        <div className="surface-card flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="text-xl font-semibold tracking-tight text-slate-950">No roles found</div>
          <p className="mt-2 max-w-md text-sm text-slate-600">Try a different search term or clear the current search to see all roles again.</p>
          <button type="button" onClick={onClearSearch} className="primary-button mt-5 px-5 py-3">
            Clear search
          </button>
        </div>
      ) : (
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => (
            <motion.div key={role.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.24 }}>
              <RoleCard role={role} onStart={onStartRole} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
