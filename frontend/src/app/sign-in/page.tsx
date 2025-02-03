"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý logic đăng nhập ở đây
    console.log("Đăng nhập với:", { email, password })
    // Sau khi đăng nhập thành công, chuyển hướng người dùng
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Đăng nhập vào tài khoản MovieStream của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              Đăng nhập
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/quen-mat-khau" className="text-sm text-muted-foreground hover:underline">
            Quên mật khẩu?
          </Link>
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Đăng ký
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

