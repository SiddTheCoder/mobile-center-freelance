"use client"

import * as React from "react"
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { signIn, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PLATFORM_NAME } from "@/lib/platform"

type LoginDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "signup"
  onModeChange: (mode: "login" | "signup") => void
}

function authErrorMessage(error?: string | null) {
  if (!error) return ""
  if (error === "CredentialsSignin") return "Invalid email or password."
  if (error === "Configuration") return "Auth is not configured correctly."

  return decodeURIComponent(error.replace(/\+/g, " "))
}

export function LoginDialog({
  open,
  onOpenChange,
  mode,
  onModeChange,
}: LoginDialogProps) {
  const { status, update } = useSession()
  const [showPassword, setShowPassword] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const isLoading = status === "loading" || isSubmitting

  React.useEffect(() => {
    if (status !== "authenticated") return

    const timer = window.setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [onOpenChange, status])

  React.useEffect(() => {
    if (!open) return

    const timer = window.setTimeout(() => {
      setMessage("")
      setShowPassword(false)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [mode, open])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (mode === "signup" && !trimmedName) {
      setMessage("Enter your full name to create an account.")
      return
    }

    if (!trimmedEmail || !trimmedPassword) {
      setMessage("Enter your email and password.")
      return
    }

    if (trimmedEmail.toLowerCase() !== "admin@admin.com" && trimmedPassword.length < 6) {
      setMessage("Password must be at least 6 characters.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    const response = await signIn("credentials", {
      redirect: false,
      mode,
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
    })

    if (response?.error) {
      setIsSubmitting(false)
      setMessage(authErrorMessage(response.error))
      return
    }

    await update()
    setIsSubmitting(false)
    onOpenChange(false)

    if (trimmedEmail.toLowerCase() === "admin@admin.com") {
      window.location.href = "/admin"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md overflow-hidden rounded-[12px] border border-[#ececf1] p-0 shadow-2xl"
        data-lenis-prevent
      >
        <div className="bg-white p-8">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-3 grid size-14 place-items-center rounded-[12px] bg-[#fff6ed] text-[#f97316]">
              <UserRound className="size-7" />
            </div>
            <DialogTitle className="text-3xl font-black tracking-tight text-[#101322]">
              {mode === "login" ? "Sign In" : "Create Account"}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-slate-500">
              {mode === "login"
                ? `Login to your ${PLATFORM_NAME} customer account.`
                : `Create a ${PLATFORM_NAME} account with email and password.`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 rounded-[10px] border border-[#ececf1] bg-[#fbfbfa] p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#f97316]" />
              <div>
                <p className="text-sm font-black text-[#101322]">
                  Credentials login for now
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Accounts are stored in MongoDB and passwords are saved as
                  salted hashes, not plain text.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {message && (
              <div className="rounded-[8px] border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                {message}
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Full Name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="Minimum 6 characters"
                  className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 pr-10 focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4.5" />
                  ) : (
                    <Eye className="size-4.5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-[8px] bg-[#101322] text-sm font-black text-white transition hover:bg-[#f97316] disabled:cursor-wait disabled:bg-slate-300"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm font-semibold text-slate-600">
            {mode === "login" ? "New to Lotus?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
              className="font-bold text-[#f97316] hover:underline"
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
