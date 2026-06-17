"use client"

import * as React from "react"
import { Eye, EyeOff, Lock, Mail, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type LoginDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "signup"
  onModeChange: (mode: "login" | "signup") => void
}

export function LoginDialog({
  open,
  onOpenChange,
  mode,
  onModeChange,
}: LoginDialogProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[12px] border border-[#ececf1] p-0 shadow-2xl overflow-hidden" data-lenis-prevent>
        <div className="p-8 bg-white">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-black text-[#101322] tracking-tight">
              {mode === "login" ? "Sign In" : "Sign Up"}
            </DialogTitle>
            <DialogDescription className="mt-2 text-slate-500 text-sm">
              {mode === "login" 
                ? "Access live chat, order tracking and pickup details." 
                : "Create an account to track orders and save your details."}
            </DialogDescription>
          </DialogHeader>

          {mode === "login" ? (
            <div className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 focus-visible:border-[#5531d4] focus-visible:ring-[#5531d4]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-bold text-[#5531d4] hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 pr-10 focus-visible:border-[#5531d4] focus-visible:ring-[#5531d4]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </div>
              </div>

              <Button className="h-11 w-full rounded-[8px] bg-[#5531d4] text-white hover:bg-[#4323b0] transition font-bold mt-2">
                Login
              </Button>

              <div className="text-center text-sm font-semibold text-slate-600 mt-4">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("signup")}
                  className="text-[#5531d4] hover:underline font-bold"
                >
                  Create Account
                </button>
              </div>

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-[#ececf1]"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
                <div className="flex-grow border-t border-[#ececf1]"></div>
              </div>

              <Button
                variant="outline"
                className="h-11 w-full rounded-[8px] border-[#e3e3e7] bg-white text-slate-700 hover:bg-slate-50 transition font-bold flex items-center justify-center gap-2.5"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.18 4.114-3.518 0-6.372-2.854-6.372-6.372s2.854-6.372 6.372-6.372c1.616 0 3.086.611 4.21 1.705l3.076-3.076C18.91 1.942 15.82 1 12.24 1 6.032 1 1 6.032 1 12.24s5.032 11.24 11.24 11.24c6.342 0 11.24-4.516 11.24-11.24 0-.756-.076-1.503-.21-2.24H12.24z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                  <Input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="h-11 rounded-[8px] border-[#e3e3e7] pl-10 focus-visible:border-[#5531d4] focus-visible:ring-[#5531d4]/20"
                  />
                </div>
              </div>

              <Button className="h-11 w-full rounded-[8px] bg-[#5531d4] text-white hover:bg-[#4323b0] transition font-bold mt-2">
                Continue
              </Button>

              <div className="text-center text-sm font-semibold text-slate-600 mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="text-[#5531d4] hover:underline font-bold"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

