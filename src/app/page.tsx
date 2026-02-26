
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, BarChart3, Sparkles } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">Placement Pro</span>
        </div>
        <Button 
          onClick={() => router.push("/login")}
          variant="ghost"
          className="text-slate-700 hover:text-slate-900"
        >
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              🚀 Welcome to Placement Pro
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Placements</span> Journey
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Prepare smarter, practice harder, and ace your placement exams. Get interactive study materials, practice quizzes, 
            video tutorials, and analytics to track your progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              onClick={() => router.push("/login")}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 border-slate-300 text-slate-900 font-semibold rounded-2xl hover:bg-slate-50"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 pt-16 border-t border-slate-200">
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mx-auto">
              <Zap className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Interactive Learning</h3>
            <p className="text-slate-600">
              Engage with interactive study materials, notes, and practice problems designed by experts.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mx-auto">
              <BarChart3 className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Track Progress</h3>
            <p className="text-slate-600">
              Monitor your performance with detailed analytics and identify areas for improvement.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Comprehensive Resources</h3>
            <p className="text-slate-600">
              Access video tutorials, practice tests, and AI-generated study notes all in one place.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 pt-16 border-t border-slate-200">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1000+</p>
            <p className="text-slate-600">Study Materials</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">500+</p>
            <p className="text-slate-600">Practice Questions</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-pink-600 mb-2">100+</p>
            <p className="text-slate-600">Video Tutorials</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-8 py-12 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to ace your placements?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their placement preparation with Placement Pro.
          </p>
          <Button 
            onClick={() => router.push("/login")}
            className="h-14 px-8 bg-white hover:bg-blue-50 text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
          <p>&copy; 2026 Placement Pro. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-slate-900 transition-colors">Privacy</button>
            <button className="hover:text-slate-900 transition-colors">Terms</button>
            <button className="hover:text-slate-900 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
