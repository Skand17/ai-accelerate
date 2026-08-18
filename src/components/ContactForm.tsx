import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { submitLead } from "@/lib/contact";
import { site } from "@/lib/site";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
});

interface LeadForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

const serviceOptions = [
  "MVP Development (15 days)",
  "Static Website",
  "Dynamic Website / Web App",
  "AI Consulting & Strategy",
  "Automation & AI Agents",
  "AI SEO & LLM Visibility",
  "Digital Marketing",
  "Cloud & DevOps",
  "Not sure yet",
];

const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Celebratory confirmation dialog shown after a successful submission. */
const SuccessDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-w-md rounded-3xl border-glow card-gradient p-10 text-center">
      {/* Animated check */}
      <div className="relative mx-auto mb-2 w-24 h-24">
        {/* Sparkles */}
        {[
          { x: -46, y: -20, d: 0.8 },
          { x: 48, y: -28, d: 1.0 },
          { x: -34, y: 38, d: 1.2 },
          { x: 42, y: 34, d: 1.4 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gradient-to-tr from-primary to-cyan"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={open ? { opacity: [0, 1, 0], x: s.x, y: s.y, scale: [0, 1.2, 0.6] } : {}}
            transition={{ duration: 1.1, delay: s.d, ease: "easeOut" }}
          />
        ))}
        <svg viewBox="0 0 96 96" className="w-24 h-24">
          <defs>
            <linearGradient id="success-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--brand-indigo))" />
              <stop offset="100%" stopColor="hsl(var(--brand-cyan))" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="url(#success-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={open ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.path
            d="M30 50 L43 63 L67 36"
            fill="none"
            stroke="url(#success-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={open ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
          />
        </svg>
      </div>

      <DialogTitle className="text-2xl font-bold">Message Sent!</DialogTitle>
      <DialogDescription className="text-muted-foreground leading-relaxed">
        Thanks for reaching out — your message is in our inbox. Abhishek from our team will
        personally get back to you <span className="text-foreground font-medium">within 24 hours</span> with
        an honest recommendation and a fixed-price quote.
      </DialogDescription>

      <div className="mt-2 space-y-3">
        <Button variant="hero" size="lg" className="w-full" onClick={onClose}>
          Great, thanks!
        </Button>
        <p className="text-xs text-muted-foreground">
          Need us sooner?{" "}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Mail className="w-3 h-3" /> {site.email}
          </a>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

interface ContactFormProps {
  /** Analytics label for where the lead originated. */
  source: string;
  /** Compact hides the phone/budget row for tighter embeds. */
  compact?: boolean;
  defaultService?: string;
}

export const ContactForm = ({ source, compact = false, defaultService }: ContactFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService ?? "" },
  });

  const onSubmit = async (data: LeadForm) => {
    try {
      await submitLead({ ...data, source });
      reset();
      setShowSuccess(true);
    } catch (err) {
      console.error("Lead submission failed:", err);
      toast.error(
        `Something went wrong sending your message. Please email us directly at ${site.email}.`,
      );
    }
  };

  return (
    <>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative p-6 sm:p-8 rounded-3xl border-glow card-gradient"
        noValidate
      >
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor={`${source}-name`} className="block text-sm font-medium mb-2">
              Full name <span className="text-primary">*</span>
            </label>
            <Input
              id={`${source}-name`}
              placeholder="Your name"
              autoComplete="name"
              className="bg-background/50"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor={`${source}-email`} className="block text-sm font-medium mb-2">
              Work email <span className="text-primary">*</span>
            </label>
            <Input
              id={`${source}-email`}
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="bg-background/50"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor={`${source}-company`} className="block text-sm font-medium mb-2">
              Company
            </label>
            <Input
              id={`${source}-company`}
              placeholder="Your company"
              autoComplete="organization"
              className="bg-background/50"
              {...register("company")}
            />
          </div>
          <div>
            <label htmlFor={`${source}-service`} className="block text-sm font-medium mb-2">
              What do you need?
            </label>
            <select id={`${source}-service`} className={selectClasses} {...register("service")}>
              <option value="">Select a service…</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {!compact && (
            <>
              <div>
                <label htmlFor={`${source}-phone`} className="block text-sm font-medium mb-2">
                  Phone / WhatsApp
                </label>
                <Input
                  id={`${source}-phone`}
                  type="tel"
                  placeholder="Optional"
                  autoComplete="tel"
                  className="bg-background/50"
                  {...register("phone")}
                />
              </div>
              <div>
                <label htmlFor={`${source}-budget`} className="block text-sm font-medium mb-2">
                  Approximate budget
                </label>
                <select id={`${source}-budget`} className={selectClasses} {...register("budget")}>
                  <option value="">Select a range…</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor={`${source}-message`} className="block text-sm font-medium mb-2">
            Tell us about your project <span className="text-primary">*</span>
          </label>
          <Textarea
            id={`${source}-message`}
            placeholder="What are you building? What's the goal, and when do you need it?"
            rows={compact ? 4 : 6}
            className="bg-background/50 resize-none"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={isSubmitting}
            className="sm:w-auto w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Get my free consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Reply within 24 hours · No spam, no obligation
          </p>
        </div>
      </form>
    </>
  );
};
