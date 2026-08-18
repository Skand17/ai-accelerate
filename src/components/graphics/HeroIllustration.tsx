import { motion } from "framer-motion";
import { Bot, Rocket, Search, TrendingUp } from "lucide-react";

/**
 * Animated hero visual: a stylized product dashboard with a drawing
 * area chart, growing bars, and floating capability badges.
 * Fully token-based so it adapts to light/dark themes.
 */
export const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto" aria-hidden="true">
      {/* Glow behind the mockup */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-transparent to-cyan/20 blur-3xl rounded-full" />

      {/* Decorative network lines */}
      <svg
        viewBox="0 0 560 480"
        className="absolute -inset-4 w-[calc(100%+2rem)] h-auto text-primary/30"
        fill="none"
      >
        <motion.circle
          cx="40" cy="80" r="5"
          fill="currentColor"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="520" cy="120" r="4"
          fill="currentColor"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="500" cy="420" r="6"
          fill="currentColor"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        />
        <motion.path
          d="M40 80 C 140 20, 380 40, 520 120"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -56] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M520 120 C 560 260, 560 340, 500 420"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -56] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Browser mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-cyan/60" />
          <span className="w-3 h-3 rounded-full bg-primary/60" />
          <div className="ml-3 flex-1 h-6 rounded-md bg-background/70 border border-border flex items-center px-3">
            <span className="text-[10px] text-muted-foreground font-medium">yourproduct.com</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-5 grid grid-cols-3 gap-4">
          {/* KPI tiles */}
          {[
            { label: "Visitors", value: "12.4k", delay: 0.6 },
            { label: "Leads", value: "348", delay: 0.75 },
            { label: "Revenue", value: "$18.2k", delay: 0.9 },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: kpi.delay }}
              className="rounded-xl border border-border bg-background/60 p-3"
            >
              <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
              <p className="text-sm font-bold text-gradient">{kpi.value}</p>
            </motion.div>
          ))}

          {/* Area chart */}
          <div className="col-span-2 rounded-xl border border-border bg-background/60 p-3">
            <p className="text-[10px] text-muted-foreground mb-2">Growth</p>
            <svg viewBox="0 0 220 80" className="w-full h-auto">
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--brand-indigo))" />
                  <stop offset="100%" stopColor="hsl(var(--brand-cyan))" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 70 C 30 62, 45 58, 70 52 S 120 44, 145 30 S 195 14, 220 8 L 220 80 L 0 80 Z"
                fill="url(#hero-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              />
              <motion.path
                d="M0 70 C 30 62, 45 58, 70 52 S 120 44, 145 30 S 195 14, 220 8"
                stroke="url(#hero-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.9, ease: "easeOut" }}
              />
              <motion.circle
                r="4"
                cx="220"
                cy="8"
                fill="hsl(var(--brand-cyan))"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.5, delay: 2.4 }}
              />
            </svg>
          </div>

          {/* Bar chart */}
          <div className="rounded-xl border border-border bg-background/60 p-3 flex items-end justify-between gap-1.5 h-full min-h-[96px]">
            {[38, 55, 42, 70, 58, 88].map((h, i) => (
              <motion.div
                key={i}
                className="w-full rounded-sm bg-gradient-to-t from-primary to-cyan"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 1 + i * 0.12, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute -left-4 top-16 sm:-left-8 animate-float"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card shadow-lg">
          <Rocket className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">MVP in 15 days</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -right-2 top-6 sm:-right-6 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card shadow-lg">
          <Bot className="w-4 h-4 text-cyan" />
          <span className="text-xs font-semibold">AI Automation</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute -bottom-5 left-8 animate-float"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card shadow-lg">
          <Search className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">SEO + AI Visibility</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.1 }}
        className="absolute -bottom-3 right-6 animate-float"
        style={{ animationDelay: "2.2s" }}
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card shadow-lg">
          <TrendingUp className="w-4 h-4 text-cyan" />
          <span className="text-xs font-semibold">3× Faster Growth</span>
        </div>
      </motion.div>
    </div>
  );
};
