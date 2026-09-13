"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

type RunResult = { success: boolean; error?: string };

interface BrandBrainModalProps {
    isOpen: boolean;
    run: () => Promise<RunResult>;
    onDone: (result: RunResult) => void;
}

const STAGES = [
    "Reading business information",
    "Understanding your audience",
    "Detecting your brand voice",
    "Discovering content opportunities",
    "Building marketing profile",
    "Preparing AI assistant",
];
export function BrandBrainModal({ isOpen, run, onDone }: BrandBrainModalProps) {
    const [stageIndex, setStageIndex] = useState(0);
    const runningRef = useRef(false);

 useEffect(() => {
    if (!isOpen || runningRef.current) return;
    runningRef.current = true;
    setStageIndex(0);

    const STAGE_DURATION = 700;
    const totalStageTime = STAGE_DURATION * STAGES.length;

    const stageTimer = setInterval(() => {
        setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, STAGE_DURATION);

    const runPromise = run();
    const minDisplayTime = new Promise((resolve) =>
        setTimeout(resolve, totalStageTime)
    );

    Promise.all([runPromise, minDisplayTime])
        .then(([result]) => {
            clearInterval(stageTimer);
            onDone(result as RunResult);
        })
        .catch(() => {
            clearInterval(stageTimer);
            onDone({ success: false, error: "Something went wrong" });
        })
        .finally(() => {
            runningRef.current = false;
        });

    return () => clearInterval(stageTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.25 }}
                        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5"
                        >
                            <Sparkles className="h-5 w-5" />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={stageIndex}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="mt-5 text-sm font-medium"
                            >
                                {STAGES[stageIndex]}
                            </motion.p>
                        </AnimatePresence>

                        <div className="mx-auto mt-6 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-border">
                            <motion.div
                                className="h-full bg-foreground"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: `${((stageIndex + 1) / STAGES.length) * 100}%`,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}