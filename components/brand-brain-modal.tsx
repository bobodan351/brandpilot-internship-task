// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, Loader2 } from "lucide-react";

// const STAGES = [
//   "Reading business information",
//   "Understanding your audience",
//   "Detecting your brand voice",
//   "Discovering content opportunities",
//   "Building marketing profile",
//   "Preparing AI assistant",
// ];

// const STAGE_DURATION_MS = 700;

// interface BrandBrainModalProps {
//   isOpen: boolean;
//   run: () => Promise<{ success: boolean; error?: string }>;
//   onDone: (result: { success: boolean; error?: string }) => void;
// }

// export function BrandBrainModal({ isOpen, run, onDone }: BrandBrainModalProps) {
//   const [activeStage, setActiveStage] = useState(0);

//   useEffect(() => {
//     if (!isOpen) {
//       setActiveStage(0);
//       return;
//     }

//     let cancelled = false;
//     const workPromise = run();

//     const stageTimer = setInterval(() => {
//       setActiveStage((s) => Math.min(s + 1, STAGES.length - 1));
//     }, STAGE_DURATION_MS);

//     const minDelay = new Promise((resolve) =>
//       setTimeout(resolve, STAGE_DURATION_MS * STAGES.length)
//     );

//     Promise.all([workPromise, minDelay]).then(([result]) => {
//       clearInterval(stageTimer);
//       if (!cancelled) onDone(result);
//     });

//     return () => {
//       cancelled = true;
//       clearInterval(stageTimer);
//     };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="w-full max-w-sm rounded-xl border border-border bg-card p-8 text-card-foreground shadow-2xl"
//           >
//             <h2 className="text-center text-lg font-semibold">
//               Building your Brand Brain...
//             </h2>

//             <div className="mt-6 space-y-3">
//               {STAGES.map((stage, i) => {
//                 const done = i < activeStage;
//                 const active = i === activeStage;
//                 return (
//                   <div key={stage} className="flex items-center gap-3 text-sm">
//                     <span
//                       className={
//                         done
//                           ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
//                           : active
//                           ? "flex h-5 w-5 items-center justify-center"
//                           : "flex h-5 w-5 items-center justify-center rounded-full border border-border"
//                       }
//                     >
//                       {done ? (
//                         <Check className="h-3 w-3" />
//                       ) : active ? (
//                         <Loader2 className="h-4 w-4 animate-spin text-primary" />
//                       ) : null}
//                     </span>
//                     <span
//                       className={
//                         done || active
//                           ? "text-foreground"
//                           : "text-muted-foreground"
//                       }
//                     >
//                       {stage}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>

//             <p className="mt-6 text-center text-xs text-muted-foreground">
//               Almost done...
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


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