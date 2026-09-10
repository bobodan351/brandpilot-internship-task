"use client";

import { useState } from "react";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { BrandBrainModal } from "@/components/brand-brain-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Sparkles, ArrowRight, Camera } from "lucide-react";
type Step = "welcome" | "choose-path" | "website-input" | "preferences-input";
type Path = "website" | "no-website" | null;

export function OnboardingWizard() {
    const [step, setStep] = useState<Step>("welcome");
    const [path, setPath] = useState<Path>(null);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [brandName, setBrandName] = useState("");
    const [instagramHandle, setInstagramHandle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    // Mock functions (no real backend)
    async function runWebsiteFlow() {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { success: true };
    }

    async function runPreferencesFlow() {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { success: true };
    }

    if (isFinished) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <SpotlightCard className="max-w-md p-10 text-center">
                    <h1 className="text-2xl font-semibold">Onboarding Complete</h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        This is where the user would be redirected after finishing the flow.
                    </p>
                    <Button className="mt-6" onClick={() => window.location.reload()}>
                        Restart Flow
                    </Button>
                </SpotlightCard>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
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
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                        >
                            <SpotlightCard className="p-10 text-center">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    Get started
                                </p>
                                <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                                    Let's build your Brand Brain
                                </h1>
                                <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                                    A few quick steps, and BrandPilot will understand your
                                    business well enough to generate content in your actual voice.
                                </p>
                                <Button
                                    className="mt-8"
                                    size="lg"
                                    onClick={() => setStep("choose-path")}
                                >
                                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </SpotlightCard>
                        </motion.div>
                    )}

                    {step === "choose-path" && (
                        <motion.div
                            key="choose-path"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                        >
                            <div className="text-center">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    Step 1 of 2
                                </p>
                                <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                                    How do customers find you?
                                </h1>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={() => {
                                        setPath("website");
                                        setStep("website-input");
                                    }}
                                    className="text-left"
                                >
                                    <SpotlightCard className="h-full p-6 transition hover:-translate-y-1">
                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                        <p className="mt-4 font-medium">I have a website</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            We'll read it and build your brand profile automatically.
                                        </p>
                                    </SpotlightCard>
                                </button>

                                <button
                                    onClick={() => {
                                        setPath("no-website");
                                        setStep("preferences-input");
                                    }}
                                    className="text-left"
                                >
                                    <SpotlightCard className="h-full p-6 transition hover:-translate-y-1">
                                        <Camera className="h-5 w-5 text-muted-foreground" />                    <p className="mt-4 font-medium">I don't have a website</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Just Instagram or WhatsApp — that's fine too.
                                        </p>
                                    </SpotlightCard>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "website-input" && (
                        <motion.div
                            key="website-input"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                        >
                            <SpotlightCard className="p-8">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    Step 2 of 2
                                </p>
                                <h1 className="mt-3 text-xl font-semibold tracking-tight">
                                    What's your website?
                                </h1>

                                <input
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    placeholder="https://yourbusiness.com"
                                    className="mt-6 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
                                />
                                {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

                                <div className="mt-6 flex gap-3">
                                    <Button variant="outline" onClick={() => setStep("choose-path")}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        disabled={websiteUrl.trim().length < 4}
                                        onClick={() => {
                                            setError(null);
                                            setShowModal(true);
                                        }}
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" /> Analyze & Continue
                                    </Button>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    )}

                    {step === "preferences-input" && (
                        <motion.div
                            key="preferences-input"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                        >
                            <SpotlightCard className="p-8">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    Step 2 of 2
                                </p>
                                <h1 className="mt-3 text-xl font-semibold tracking-tight">
                                    Tell us about your brand
                                </h1>

                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">
                                            Brand name
                                        </label>
                                        <input
                                            value={brandName}
                                            onChange={(e) => setBrandName(e.target.value)}
                                            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">
                                            Instagram handle
                                        </label>
                                        <input
                                            value={instagramHandle}
                                            onChange={(e) => setInstagramHandle(e.target.value)}
                                            placeholder="@yourbrand"
                                            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
                                        />
                                    </div>
                                </div>
                                {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

                                <div className="mt-6 flex gap-3">
                                    <Button variant="outline" onClick={() => setStep("choose-path")}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        disabled={brandName.trim().length < 1}
                                        onClick={() => {
                                            setError(null);
                                            setShowModal(true);
                                        }}
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" /> Build Brand Brain
                                    </Button>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <BrandBrainModal
                isOpen={showModal}
                run={path === "website" ? runWebsiteFlow : runPreferencesFlow}
                onDone={(result) => {
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