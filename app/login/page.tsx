// "use client";

// import { motion, type Variants } from "framer-motion";
// import Link from "next/link";
// import { LoginForm } from "@/components/login-form";
// import { ArrowLeft, Sparkles } from "lucide-react";

// export default function LoginPage() {
//   const containerVariants: Variants = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
// };
// const childVariants: Variants = {
//     hidden: { opacity: 0, y: 10 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
// };
//   return (
//     <div className="relative flex min-h-screen items-center justify-center  px-4 py-6 sm:px-6 sm:py-12 ">
//       {/* Background decoration */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-foreground/5 blur-3xl" />
//         <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-foreground/5 lg:blur-3xl" />
//       </div>
//       <main className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row lg:gap-16 p-6 sm:p-8 lg:p-10 shadow-lg rounded-lg border border-border/50 bg-background/50 backdrop-blur-md lg:items-stretch">
//       <motion.div
//   variants={containerVariants}
//   initial="hidden"
//   animate="show"
//   className="flex w-full max-w-sm flex-col lg:max-w-md"
// >
//   {/* Back button */}
//   <motion.div variants={childVariants}>
//     <Link
//       href="/"
//       className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
//     >
//       <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
//       Back to home
//     </Link>
//   </motion.div>

//   {/* Logo */}
//   <motion.div variants={childVariants} className="mt-8">
//     <Link
//       href="/"
//       className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-4 py-2 transition-colors hover:border-border hover:bg-foreground/5"
//     >
//       <span className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
//         BP
//       </span>
//       <span className="text-sm font-medium">BrandPilot</span>
//     </Link>
//   </motion.div>

//   {/* Header */}
//   <motion.div variants={childVariants} className="mt-8">
//     <h1 className="text-2xl font-semibold tracking-tight">
//       Sign in to BrandPilot
//     </h1>
//     <p className="mt-1.5 text-sm text-muted-foreground">
//       Log in to your account to continue
//     </p>
//   </motion.div>

//   {/* Form */}
//   <motion.div variants={childVariants} className="mt-6">
//     <LoginForm />
//   </motion.div>

//   {/* Footer */}
//   <motion.div variants={childVariants} className="mt-6 space-y-3 text-center">
//     <p className="text-sm text-muted-foreground">
//       Don&apos;t have an account?{" "}
//       <Link
//         href="/register"
//         className="font-medium text-foreground underline-offset-4 transition-all hover:underline"
//       >
//         Sign up
//       </Link>
//     </p>

//     <div className="flex items-center justify-center gap-3">
//       <span className="h-px w-8 bg-border" />
//       <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
//         <Sparkles className="h-3 w-3" />
//         Secure login
//       </span>
//       <span className="h-px w-8 bg-border" />
//     </div>
//   </motion.div>
// </motion.div>
//         <span className="hidden w-px self-stretch rounded-full bg-border lg:block" />
//         {/* Right side skeleton */}
//         <div className="relative hidden overflow-hidden p-1 lg:flex lg:flex-col items-center">
//           <div className="mx-auto my-auto grid w-full max-w-sm grid-cols-3 gap-3">
//             {Array.from({ length: 9 }).map((_, index) => (
//               <motion.div
//                 key={index}
//                 animate={{
//                   opacity: [0.25, 1, 0.25],
//                   boxShadow: [
//                     "0 1px 2px rgba(17, 24, 39, 0.05)",
//                     "0 12px 28px rgba(17, 24, 39, 0.16)",
//                     "0 1px 2px rgba(17, 24, 39, 0.05)",
//                   ],
//                 }}
//                 transition={{
//                   duration: 5,
//                   delay: index * 0.4,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 className={`aspect-square rounded-2xl border border-border shadow-sm ${
//                   index === 4 ? "bg-foreground" : "bg-foreground/70"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="max-w-sm ">
//             <p className="text-2xl font-semibold tracking-tight">Welcome back</p>
//             <h2 className="mt-2 text-sm text-muted-foreground">
//               Ready to make your brand impossible to ignore?
//             </h2>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { ArrowLeft, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-foreground/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
        <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-foreground/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
      </div>
      <main className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row lg:gap-16 p-6 sm:p-8 lg:p-10 shadow-lg rounded-lg border border-border/50 bg-background/50 backdrop-blur-md lg:items-stretch">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex w-full max-w-sm flex-col lg:max-w-md"
        >
          {/* Back button */}
          <motion.div variants={childVariants}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to onboarding
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div variants={childVariants} className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-4 py-2 transition-colors hover:border-border hover:bg-foreground/5"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
                BP
              </span>
              <span className="text-sm font-medium">BrandPilot</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={childVariants} className="mt-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to BrandPilot
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Log in to your account to continue
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={childVariants} className="mt-6">
            <LoginForm />
          </motion.div>

          {/* Footer */}
          <motion.div variants={childVariants} className="mt-6 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-foreground underline-offset-4 transition-all hover:underline"
              >
                Sign up
              </Link>
            </p>

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-border" />
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                <Sparkles className="h-3 w-3" />
                Secure login
              </span>
              <span className="h-px w-8 bg-border" />
            </div>
          </motion.div>
        </motion.div>

          <span className="hidden w-px self-stretch rounded-full bg-border xl:block" />
        {/* Right side brand graphics */}
       <div className="relative hidden overflow-hidden p-1 xl:flex xl:flex-col items-center justify-center">
          <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  opacity: [0.25, 1, 0.25],
                  boxShadow: [
                    "0 1px 2px rgba(17, 24, 39, 0.05)",
                    "0 12px 28px rgba(17, 24, 39, 0.16)",
                    "0 1px 2px rgba(17, 24, 39, 0.05)",
                  ],
                }}
                transition={{
                  duration: 5,
                  delay: index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`aspect-square rounded-2xl border border-border shadow-sm ${
                  index === 4 ? "bg-foreground" : "bg-foreground/70"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 max-w-sm">
            <p className="text-2xl font-semibold">Welcome  back to BrandPilot hub</p>
            <h2 className="mt-2 text-sm text-muted-foreground">
              Ready to make your brand impossible to ignore?
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}