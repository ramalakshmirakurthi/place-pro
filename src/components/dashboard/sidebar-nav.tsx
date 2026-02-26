"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  LineChart, 
  Settings,
  LogOut,
  ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Placement Tests", href: "/dashboard/tests", icon: BookOpen },
  { name: "Core Learning", href: "/dashboard/videos", icon: Video },
  { name: "AI Resources", href: "/dashboard/notes", icon: FileText },
  { name: "Intelligence", href: "/dashboard/analytics", icon: LineChart },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold font-headline tracking-tight text-slate-900">
            Place Pro
          </h1>
        </Link>
      </div>
      
      <div className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
              pathname === item.href
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-slate-100 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </nav>
  )
}