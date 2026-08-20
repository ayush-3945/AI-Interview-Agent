import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

export default function RoleCard({ role, onStart }) {
  const Icon = role.icon;

  return (
    <motion.article
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className="
        group
        flex
        h-full
        flex-col
        rounded-3xl
        border
        border-[#2D313C]
        bg-[#1A1D24]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:border-indigo-500/40
        hover:shadow-[0_25px_70px_rgba(99,102,241,0.15)]
      "
    >

      {/* Icon + Category */}
      <div className="flex items-start justify-between gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-violet-500
            text-white
            shadow-lg
            shadow-indigo-500/20
            transition-all
            duration-300
            group-hover:shadow-indigo-500/40
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        <span className="chip">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />

          {role.category === 'technical'
            ? 'Technical'
            : 'Non-Technical'}
        </span>

      </div>

      {/* Role Information */}
      <div className="mt-5">

        <h3
          className="
            text-lg
            font-semibold
            tracking-tight
            text-white
          "
        >
          {role.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-400
          "
        >
          {role.description}
        </p>

      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">

        {role.skills.map((skill) => (
          <span
            key={skill}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#2D313C]
              bg-[#222631]
              px-3
              py-1.5
              text-xs
              font-medium
              text-slate-300
              transition-all
              duration-200
              group-hover:border-indigo-500/30
            "
          >
            <BadgeCheck
              className="
                h-3.5
                w-3.5
                text-indigo-400
              "
            />

            {skill}
          </span>
        ))}

      </div>

      {/* Start Interview Button */}
      <div className="mt-6 flex flex-1 items-end">

        <button
          type="button"
          onClick={() => onStart(role)}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            to-violet-500
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-500/20
            transition-all
            duration-300
            hover:from-indigo-400
            hover:to-violet-400
            hover:shadow-indigo-500/40
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-400
            focus:ring-offset-2
            focus:ring-offset-[#0F1115]
          "
        >
          Start Interview

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

        </button>

      </div>

    </motion.article>
  );
}