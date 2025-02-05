"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Mail } from "lucide-react"

export default function AuthForm() {
  const [isResetting, setIsResetting] = useState(false)

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        backgroundImage:
          "url('sign_in_bg.png?height=1080&width=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-md p-8 flex items-center"
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.85), transparent)",
        }}
      >
        <div className="w-full pl-8">
          <div className="p-6">
            {isResetting ? (
              <div className="space-y-4">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h1>
                  <p className="text-sm text-neutral-400">Enter your email to receive reset instructions</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-neutral-200">
                    Email
                  </Label>
                  <Input
                    id="reset-email"
                    placeholder="name@example.com"
                    type="email"
                    className="bg-black/30 border-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                  />
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Send Instructions</Button>
                  <Button
                    variant="ghost"
                    className="w-full text-neutral-400 hover:text-white hover:bg-neutral-800"
                    onClick={() => setIsResetting(false)}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="w-full bg-black/30">
                  <TabsTrigger
                    value="login"
                    className="w-full data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="w-full data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      className="bg-black/30 border-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-neutral-200">
                        Password
                      </Label>
                      <Button
                        variant="link"
                        className="text-amber-500 hover:text-amber-400"
                        onClick={() => setIsResetting(true)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input id="password" type="password" className="bg-black/30 border-neutral-800 text-neutral-200" />
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Login</Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-black/40 px-2 text-neutral-500">Or continue with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="bg-black/30 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-black/30 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-neutral-200">
                      Full Name
                    </Label>
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      className="bg-black/30 border-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-neutral-200">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      placeholder="name@example.com"
                      type="email"
                      className="bg-black/30 border-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-neutral-200">
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      className="bg-black/30 border-neutral-800 text-neutral-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-neutral-200">
                      Confirm Password
                    </Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      className="bg-black/30 border-neutral-800 text-neutral-200"
                    />
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Create Account</Button>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

