"use client";

import { useState } from "react";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { BrandBrainModal } from "@/components/brand-brain-modal";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Globe, Sparkles, ArrowRight, Camera } from "lucide-react";

type Step = "welcome" | "choose-path" | "website-input" | "preferences-input";
type Path = "website" | "no-website" | null;


const EYEBROW =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";
const HEADLINE =
  "text-[28px] sm:text-3xl font-semibold tracking-tight leading-tight";
const BODY = "text-sm leading-relaxed text-muted-foreground";
const INPUT =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function StepProgress({ step }: { step: Step }) {
  if (step === "welcome") return null;
  const active = step === "choose-path" ? 0 : 1;
  return (
    <div className="lg:mt-10 mt-6 flex items-center justify-center gap-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i <= active ? "w-8 bg-foreground" : "w-4 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function FieldError({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-xs text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function OnboardingWizard() {
  const [step, setStep] = useState<Step>("welcome");
  const [path, setPath] = useState<Path>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  async function runWebsiteFlow() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: true };
  }

  async function runPreferencesFlow() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: true };
  }

  function isValidUrl(value: string) {
    const v = value.trim();
    if (v.length < 4 || !v.includes(".")) return false;
    try {
      new URL(v.startsWith("http") ? v : `https://${v}`);
      return true;
    } catch {
      return false;
    }
  }

  const websiteValid = isValidUrl(websiteUrl);
  const brandValid = brandName.trim().length > 0;

  if (isFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SpotlightCard className="max-w-md p-8 text-center sm:p-10">
            <h1 className={HEADLINE}>Onboarding complete</h1>
            <p className={`mx-auto mt-3 max-w-xs ${BODY}`}>
              This is where the user would be redirected after finishing the
              flow.
            </p>
            <Button
              className="mt-8 w-full transition-transform active:scale-[0.98] sm:w-auto"
              onClick={() => window.location.reload()}
            >
              Restart flow
            </Button>
          </SpotlightCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent_60%)]"
      />

      <div className="relative w-full max-w-lg">
        <AnimatePresence mode="wait">
    {step === "welcome" && (
  <motion.div
    key="welcome"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
  >
    <SpotlightCard className="group relative overflow-hidden p-[2px] rounded-xl bg-muted-foreground/20">
      
      {/* Sir this is the Animated Chase Layer */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 chase-border-active" />
      
      
      <div className="relative z-10 h-full w-full rounded-[10px] bg-background p-6 text-center sm:p-10">
        
        <motion.p variants={childVariants} className={EYEBROW}>
          Get started
        </motion.p>
        
        <motion.h1
          variants={childVariants}
          className={`mt-4 ${HEADLINE}`}
        >
          Let's build your Brand Brain
        </motion.h1>
        
        <motion.p
          variants={childVariants}
          className={`mx-auto mt-3 max-w-[280px] ${BODY}`}
        >
          BrandPilot learns your voice from your site or socials, then
          writes content that actually sounds like you.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-left text-xs"
        >
          <p className="text-muted-foreground">Generic AI:</p>
          <p className="mt-1">"Check out our new product! 🎉"</p>
          <p className="text-muted-foreground mt-3">
            Your Brand Brain:
          </p>
          <p className="mt-1 font-medium">
            "okay this one's actually our best seller — the reviews
            don't lie 👀"
          </p>
        </motion.div>

        <motion.div variants={childVariants}>
          <Button
            className="mt-8 h-12 w-full transition-transform active:scale-[0.98] sm:w-auto"
            size="lg"
            onClick={() => setStep("choose-path")}
          >
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        
      </div>
    </SpotlightCard>
  </motion.div>
)}

{step === "choose-path" && (
  <motion.div
    key="choose-path"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
  >
    <motion.div variants={childVariants} className="text-center">
      <p className={EYEBROW}>Step 1 of 2</p>
      <h1 className={`mt-3 ${HEADLINE}`}>
        How do customers find you?
      </h1>
    </motion.div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      
      
      <motion.button
        variants={childVariants}
        onClick={() => {
          setPath("website");
          setError(null);
          setStep("website-input");
        }}
        className="text-left group outline-none" 
      >
        <SpotlightCard className="relative h-full overflow-hidden p-[2px] transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] rounded-xl bg-muted-foreground/20">
        
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 chase-border-active" />
          
          
          <div className="relative z-10 h-full w-full rounded-[10px] bg-background p-5 sm:p-6">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <p className="mt-4 font-medium">I have a website</p>
            <p className={`mt-1 ${BODY} text-xs`}>
              We'll read it and build your brand profile automatically.
            </p>
          </div>
        </SpotlightCard>
      </motion.button>

      
      <motion.button
        variants={childVariants}
        onClick={() => {
          setPath("no-website");
          setError(null);
          setStep("preferences-input");
        }}
        className="text-left group" 
      >
        <SpotlightCard className="relative h-full overflow-hidden p-[2px] transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] rounded-xl bg-muted-foreground/20">
        
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 chase-border-active" />
          
          
          <div className="relative z-10 h-full w-full rounded-[10px] bg-background p-5 sm:p-6">
            <Camera className="h-5 w-5 text-muted-foreground" />
            <p className="mt-4 font-medium">I don't have a website</p>
            <p className={`mt-1 ${BODY} text-xs`}>
              Just Instagram or WhatsApp — that's fine too.
            </p>
          </div>
        </SpotlightCard>
      </motion.button>
      
    </div>
  </motion.div>
)}


         {step === "website-input" && (
  <motion.div
    key="website-input"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
  >
    
    <SpotlightCard className="group relative overflow-hidden p-[2px] rounded-xl bg-muted-foreground/20">
      
      
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 chase-border-active" />
      
      
      <div className="relative z-10 h-full w-full rounded-[10px] bg-background p-6 sm:p-8">
        
        <motion.p variants={childVariants} className={EYEBROW}>
          Step 2 of 2
        </motion.p>
        
        <motion.h1
          variants={childVariants}
          className={`mt-3 ${HEADLINE}`}
        >
          What's your website?
        </motion.h1>

        <motion.div variants={childVariants}>
          <input
            value={websiteUrl}
            onChange={(e) => {
              setWebsiteUrl(e.target.value);
              if (error) setError(null);
            }}
            placeholder="https://yourbusiness.com"
                      className={`mt-6 ${INPUT}`}
                      id="website-url"
                      type="url"
                      aria-label="Website URL input"
          />
          <FieldError message={error} />
        </motion.div>

        <motion.div
          variants={childVariants}
          className="mt-6 flex gap-3"
        >
          <Button
            variant="outline"
            className="h-12 transition-transform active:scale-[0.98]"
            onClick={() => setStep("choose-path")}
          >
            Back
          </Button>
          <Button
            className="h-12 flex-1 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            disabled={!websiteValid}
            onClick={() => {
              if (!websiteValid) {
                setError("Enter a valid URL, e.g. yourbusiness.com");
                return;
              }
              setError(null);
              setShowModal(true);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Analyze & continue
          </Button>
        </motion.div>
        
      </div>
    </SpotlightCard>
  </motion.div>
)}


       {step === "preferences-input" && (
  <motion.div
    key="preferences-input"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
  >
   
    <SpotlightCard className="group relative overflow-hidden p-[2px] rounded-xl bg-muted-foreground/20">
      
      {/* Animated Chase Layer */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 chase-border-active" />
      

      <div className="relative z-10 h-full w-full rounded-[10px] bg-background p-6 sm:p-8">
        
        <motion.p variants={childVariants} className={EYEBROW}>
          Step 2 of 2
        </motion.p>
        
        <motion.h1
          variants={childVariants}
          className={`mt-3 ${HEADLINE}`}
        >
          Tell us about your brand
        </motion.h1>

        <div className="mt-6 space-y-4">
          <motion.div variants={childVariants}>
            <label className="text-xs font-medium text-muted-foreground">
              Brand name
            </label>
            <input
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
                if (error) setError(null);
              }}
                        className={`mt-1.5 ${INPUT}`}
                        type="text"
            />
          </motion.div>
          
          <motion.div variants={childVariants}>
            <label className="text-xs font-medium text-muted-foreground">
              Instagram handle
            </label>
            <input
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              placeholder="@yourbrand"
                        className={`mt-1.5 ${INPUT}`}
                        id="instagram-handle"
                        type="text"
            />
          </motion.div>
        </div>
        
        <FieldError message={error} />

        <motion.div
          variants={childVariants}
          className="mt-6 flex gap-3"
        >
          <Button
            variant="outline"
            className="h-12 transition-transform active:scale-[0.98]"
            onClick={() => setStep("choose-path")}
          >
            Back
          </Button>
          <Button
            className="h-12 flex-1 transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
            disabled={!brandValid}
            onClick={() => {
              if (!brandValid) {
                setError("Give your brand a name to continue");
                return;
              }
              setError(null);
              setShowModal(true);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Build Brand Brain
          </Button>
        </motion.div>
        
      </div>
    </SpotlightCard>
  </motion.div>
)}

        </AnimatePresence>
        <StepProgress step={step} />
      </div>

      <BrandBrainModal
        isOpen={showModal}
        run={path === "website" ? runWebsiteFlow : runPreferencesFlow}
        onDone={(result: { success: boolean; error?: string }) => {
          setShowModal(false);
          if (!result.success) {
            setError(result.error ?? "Something went wrong");
            return;
          }
          setIsFinished(true);
        }}
      />
    </div>
  );
}
