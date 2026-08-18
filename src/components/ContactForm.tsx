import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  botField: z.string().max(0).optional(),
});

interface LeadForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  botField?: string;
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

interface ContactFormProps {
  /** Analytics label for where the lead originated. */
  source: string;
  /** Compact hides the phone/budget row for tighter embeds. */
  compact?: boolean;
  defaultService?: string;
}

export const ContactForm = ({ source, compact = false, defaultService }: ContactFormProps) => {
  const [submitted, setSubmitted] = useState(false);
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
      setSubmitted(true);
      toast.success("Message sent! We'll reply within 24 hours.");
      reset();
    } catch {
      toast.error(
        `Something went wrong sending your message. Please email us directly at ${site.email}.`,
      );
    }
  };

  if (submitted) {
    return (
      <div className="p-10 rounded-3xl border-glow card-gradient text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Thank you — we're on it.</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your message is in our inbox. A real person (not a bot) will reply within one business
          day. Need us faster? Email{" "}
          <a href={`mailto:${site.email}`} className="text-primary hover:underline">
            {site.email}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-8 rounded-3xl border-glow card-gradient"
      noValidate
    >
      {/* Honeypot — hidden from humans, filled by naive bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("botField")}
      />

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
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
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
        <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="sm:w-auto w-full">
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
  );
};
