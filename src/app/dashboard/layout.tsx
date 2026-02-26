import { SidebarNav } from "@/components/dashboard/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 h-full shrink-0">
        <SidebarNav />
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8 sticky top-0 z-10">
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Authorized Access • Portal</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Admin User</p>
              <p className="text-[10px] text-slate-500">Premium Tier</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-primary text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <div className="p-8 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}