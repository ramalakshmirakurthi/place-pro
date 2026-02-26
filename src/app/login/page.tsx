"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff, LogIn, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Admin Credentials
    const ADMIN_USER = "admin"
    const ADMIN_PASS = "lucky"

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials. Please use authorized access.",
        })
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-b from-blue-100 via-blue-50 to-white relative overflow-hidden">
      {/* Decorative Arched Lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-blue-300 rounded-full absolute -top-1/4" />
        <div className="w-[1000px] h-[1000px] border border-blue-200 rounded-full absolute -top-1/3" />
      </div>

      <div className="z-10 w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-700">
        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white/70 backdrop-blur-xl rounded-[40px] px-8 py-10">
          <CardHeader className="flex flex-col items-center space-y-6 pt-0">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <LogIn className="w-6 h-6 text-slate-800" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Sign in with email</CardTitle>
              <CardDescription className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                Make a new doc to bring your words, data, and teams together. For free
              </CardDescription>
            </div>
          </CardHeader>
          
          <form onSubmit={handleAuth} className="mt-8">
            <CardContent className="space-y-4 px-0">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  id="username"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl placeholder:text-slate-400 text-slate-900 focus-visible:ring-1 focus-visible:ring-slate-200 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-slate-100/50 border-none rounded-2xl placeholder:text-slate-400 text-slate-900 focus-visible:ring-1 focus-visible:ring-slate-200 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm font-medium text-slate-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col px-0 pt-6 space-y-6">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
              >
                {isLoading ? "Signing in..." : "Get Started"}
              </Button>

              <div className="w-full flex items-center gap-4">
                <div className="h-[1px] bg-slate-100 flex-1 border-t border-dotted" />
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Or sign in with</span>
                <div className="h-[1px] bg-slate-100 flex-1 border-t border-dotted" />
              </div>

              <div className="grid grid-cols-3 gap-4 w-full">
                <Button variant="outline" type="button" className="h-14 rounded-2xl border-slate-100 bg-white shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="h-14 rounded-2xl border-slate-100 bg-white shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-6 h-6 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="h-14 rounded-2xl border-slate-100 bg-white shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438
                         9.8 8.205 11.385.6.113.82-.258.82-.577
                         0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                         -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.083-.729.083-.729
                         1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998
                         .108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93
                         0-1.31.467-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176
                         0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138
                         3 .405 2.28-1.552 3.288-1.23 3.288-1.23 .656 1.653.244 2.874.12
                         3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48
                         5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293
                         0 .319.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63
                         -5.373-12-12-12z"
                    />
                  </svg>
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}