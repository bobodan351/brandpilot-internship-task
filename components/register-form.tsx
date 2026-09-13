// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Loader2,
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Globe,
//   ArrowRight,
//   AlertCircle,
//   Check,
// } from "lucide-react";

// export function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const passwordChecks = [
//     { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
//     { label: "Lowercase letter", passed: /[a-z]/.test(password) },
//     { label: "Number", passed: /\d/.test(password) },
//     { label: "Symbol", passed: /[^A-Za-z0-9]/.test(password) },
//   ];
//   const isPasswordValid = passwordChecks.every((check) => check.passed);
//   const isFormComplete = Boolean(name && email && isPasswordValid);
//   const inputBorderClass = isFormComplete
//     ? "border-emerald-500 focus:border-emerald-500"
//     : "border-border focus:border-foreground/30";

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);

//     if (!name || !email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (!isPasswordValid) {
//       setError("Your password does not meet all requirements");
//       return;
//     }

//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1200));
//     setIsLoading(false);
//     alert("Account created successfully (this is just a demo for the intern task)");
//   }

//   return (
//     <div className="space-y-4">
//       <form onSubmit={handleSubmit} className="space-y-3.5">
//         {/* Name */}
//         <div className="space-y-1.5">
//           <label htmlFor="name" className="text-sm font-medium">
//             Full name
//           </label>
//           <div className="relative">
//             <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <input
//               id="name"
//               type="text"
//               placeholder="John Doe"
//               value={name}
//               autoComplete="name"
//               required
//               onChange={(e) => setName(e.target.value)}
//               disabled={isLoading}
//               className={`h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none ${inputBorderClass}`}
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="space-y-1.5">
//           <label htmlFor="email" className="text-sm font-medium">
//             Email address
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <input
//               id="email"
//               type="email"
//               autoComplete="email"
//               required
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={isLoading}
//               className={`h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none ${inputBorderClass}`}
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="space-y-1.5">
//           <label htmlFor="password" className="text-sm font-medium">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
//               value={password}
//               autoComplete="new-password"
//               onChange={(e) => setPassword(e.target.value)}
//               onFocus={() => setIsPasswordFocused(true)}
//               onBlur={() => setIsPasswordFocused(false)}
//               minLength={8}
//               disabled={isLoading}
//               className={`h-11 w-full rounded-xl border bg-background pl-10 pr-10 text-sm outline-none ${inputBorderClass}`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//             </button>
//           </div>
//           {isPasswordFocused && password && !isPasswordValid && (
//             <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
//               {passwordChecks.map((check) => (
//                 <div
//                   key={check.label}
//                   className={`flex items-center gap-1.5 text-xs transition-colors ${
//                     check.passed ? "text-emerald-600" : "text-muted-foreground"
//                   }`}
//                 >
//                   <span
//                     className={`flex size-4 items-center justify-center rounded-full border ${
//                       check.passed
//                         ? "border-emerald-600 bg-emerald-600 text-white"
//                         : "border-border"
//                     }`}
//                   >
//                     {check.passed && <Check className="size-2.5" strokeWidth={3} />}
//                   </span>
//                   {check.label}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Error */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600"
//             >
//               <AlertCircle className="h-3.5 w-3.5" />
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Creating account...
//             </>
//           ) : (
//             <>
//               Create account
//               <ArrowRight className="h-4 w-4" />
//             </>
//           )}
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="flex items-center gap-3">
//         <div className="h-px flex-1 bg-border" />
//         <span className="text-[10px] uppercase tracking-wider text-muted-foreground">or</span>
//         <div className="h-px flex-1 bg-border" />
//       </div>

//       {/* Google */}
//       <button
//         type="button"
//         className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition hover:bg-secondary"
//       >
//         <Globe className="h-4 w-4" />
//         Continue with Google
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Globe,
  ArrowRight,
  AlertCircle,
  Check,
  Sparkles,
} from "lucide-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const passwordChecks = [
    { label: "8+ characters", passed: password.length >= 8 },
    { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Number", passed: /\d/.test(password) },
    { label: "Symbol", passed: /[^A-Za-z0-9]/.test(password) },
  ];

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = passwordChecks.every((check) => check.passed);
  const isFormComplete = isNameValid && isEmailValid && isPasswordValid;

  function getBorderClass(hasValue: boolean, isValid: boolean) {
    if (!hasValue) return "border-border focus:border-foreground/40";
    return isValid
      ? "border-emerald-500 focus:border-emerald-500"
      : "border-border focus:border-foreground/40";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isEmailValid) {
      setError("Enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Your password does not meet all requirements");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setSuccess(true);
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setGoogleLoading(false);
    setSuccess(true);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              autoComplete="name"
              required
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
                setSuccess(false);
              }}
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-foreground/5 ${getBorderClass(
                name.length > 0,
                isNameValid
              )}`}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
                setSuccess(false);
              }}
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-foreground/5 ${getBorderClass(
                email.length > 0,
                isEmailValid
              )}`}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
                setSuccess(false);
              }}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              minLength={8}
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-background pl-10 pr-10 text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-foreground/5 ${getBorderClass(
                password.length > 0,
                isPasswordValid
              )}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {isPasswordFocused && password && !isPasswordValid && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
              {passwordChecks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    check.passed ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded-full border transition-colors ${
                      check.passed
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-border"
                    }`}
                  >
                    {check.passed && <Check className="size-2.5" strokeWidth={3} />}
                  </span>
                  {check.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-xs text-green-700"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Account created successfully (demo)
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !isFormComplete || !isNameValid || !isEmailValid || !isPasswordValid}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition-all active:scale-[0.98] hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={googleLoading}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition-all active:scale-[0.98] hover:bg-secondary disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        Continue with Google
      </button>
    </div>
  );
}