import { motion } from 'framer-motion';

function AnimatedBackground() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Subtle grid pattern (light mode) */}
      <div
        className="absolute inset-0 opacity-30 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle grid pattern (dark mode) */}
      <div
        className="absolute inset-0 hidden dark:block opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glowing gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-3xl bg-gradient-to-br from-primary-300/40 via-primary-500/25 to-primary-700/20 dark:from-primary-800/40 dark:via-primary-600/25 dark:to-primary-400/20"
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl bg-gradient-to-tl from-fuchsia-300/30 via-purple-400/20 to-sky-300/20 dark:from-fuchsia-800/30 dark:via-purple-700/20 dark:to-sky-700/20"
        animate={{ x: [0, -15, 10, 0], y: [0, 12, -10, 0], scale: [1, 0.97, 1.04, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl bg-gradient-to-tr from-amber-300/25 via-rose-300/20 to-primary-300/20 dark:from-amber-700/25 dark:via-rose-700/20 dark:to-primary-700/20"
        animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.02, 0.99, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Gentle vignette to focus content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-white/5" />
    </motion.div>
  );
}

export default AnimatedBackground;


