import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onExploreRoles }) {
  const steps = [
    {
      number: '1',
      title: 'Choose your role',
      description: 'Pick the role you want to practice.',
    },
    {
      number: '2',
      title: 'Pick difficulty',
      description: 'Set the challenge level.',
    },
    {
      number: '3',
      title: 'Configure interview',
      description: 'Choose duration and interview style.',
    },
    {
      number: '4',
      title: 'Practice with AI feedback',
      description: 'Receive evaluation and a result summary.',
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#8697C4]/40 bg-gradient-to-br from-[#0B1020] via-[#121A2E] to-[#3D52A0] shadow-[0_30px_90px_rgba(61,82,160,0.25)]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#7091E6]/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#3D52A0]/30 blur-[100px]" />

      <div className="pointer-events-none absolute left-[45%] top-[20%] h-64 w-64 rounded-full bg-[#8697C4]/5 blur-[80px]" />

      {/* Content */}
      <div className="relative grid min-h-[560px] gap-8 p-7 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">

        {/* Left Side */}
        <div className="flex flex-col justify-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8697C4]/30 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#EDE8F5] backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#7091E6]" />
            AI Interview Practice
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-6xl lg:text-7xl"
          >
            MockMate
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-2xl text-base leading-7 text-[#C5D0E7] md:text-lg"
          >
            Practice realistic interviews tailored to your role,
            experience, and goals.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={onExploreRoles}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1020] shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EDE8F5]"
            >
              Explore roles

              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#8697C4]/30 bg-white/[0.07] px-5 py-3.5 text-sm font-medium text-[#EDE8F5] backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[#7091E6]" />
              Structured feedback for every session
            </div>
          </motion.div>

          {/* Small trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 text-sm text-[#9FAED0]"
          >
            <CheckCircle2 className="h-4 w-4 text-[#7091E6]" />
            Built for focused interview preparation
          </motion.div>

        </div>

        {/* Right Side - Interview Flow */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center"
        >

          <div className="w-full rounded-[2rem] border border-[#8697C4]/25 bg-[#121A2E]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-6">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">
                  Interview flow
                </div>

                <div className="mt-1 text-xs text-[#8697C4]">
                  Your preparation journey
                </div>
              </div>

              <div className="h-2.5 w-2.5 rounded-full bg-[#7091E6] shadow-[0_0_12px_rgba(112,145,230,0.7)]" />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.08,
                  }}
                  className="group rounded-2xl border border-[#8697C4]/20 bg-white/[0.045] p-4 transition-all duration-200 hover:border-[#7091E6]/40 hover:bg-[#7091E6]/[0.08]"
                >
                  <div className="flex items-start gap-3">

                    {/* Number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3D52A0] text-xs font-semibold text-white shadow-[0_4px_15px_rgba(61,82,160,0.35)]">
                      {step.number}
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">
                        {step.title}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-[#AEBBD8]">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-start gap-3 border-t border-[#8697C4]/15 pt-5">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7091E6]/10">
                <CheckCircle2 className="h-4 w-4 text-[#7091E6]" />
              </div>

              <p className="text-xs leading-5 text-[#C5D0E7]">
                Designed for a professional,
                focused interview experience.
              </p>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}