"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Bar,
  BarChart
} from "recharts"
import { 
  BrainCircuit, 
  TrendingUp, 
  Target, 
  Zap, 
  ArrowUpRight, 
  History 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const performanceData = [
  { month: "Jan", score: 65, avg: 60 },
  { month: "Feb", score: 68, avg: 62 },
  { month: "Mar", score: 75, avg: 65 },
  { month: "Apr", score: 72, avg: 68 },
  { month: "May", score: 84, avg: 70 },
  { month: "Jun", score: 88, avg: 72 },
]

const skillData = [
  { subject: 'Quant', A: 120, B: 110, fullMark: 150 },
  { subject: 'Logical', A: 98, B: 130, fullMark: 150 },
  { subject: 'Verbal', A: 86, B: 130, fullMark: 150 },
  { subject: 'Coding', A: 99, B: 100, fullMark: 150 },
  { subject: 'Core', A: 85, B: 90, fullMark: 150 },
  { subject: 'Soft Skills', A: 65, B: 85, fullMark: 150 },
]

const recentTests = [
  { id: 1, name: "Full Mock Test #4", score: "88/100", status: "Passed", date: "2 hours ago", improvement: "+5%" },
  { id: 2, name: "Dijkstra's Algorithm Quiz", score: "10/10", status: "Perfect", date: "Yesterday", improvement: "+12%" },
  { id: 3, name: "Quantitative Aptitude - II", score: "45/60", status: "Passed", date: "3 days ago", improvement: "-2%" },
]

const chartConfig = {
  score: {
    label: "Your Performance",
    color: "hsl(var(--primary))",
  },
  avg: {
    label: "Global Average",
    color: "hsl(var(--muted-foreground))",
  },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Intelligence Dashboard</h1>
          <p className="text-muted-foreground">AI-driven performance metrics and growth analysis.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-4 border-primary/20 text-primary bg-primary/5">
            Updated: Just Now
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/70 uppercase text-[10px] font-bold tracking-widest">Readiness Score</CardDescription>
            <CardTitle className="text-4xl font-bold">84%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRight className="h-3 w-3" />
              </div>
              <span>Highly Prepared for Tier-1 Companies</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Weakest Link</CardDescription>
            <CardTitle className="text-2xl font-bold text-slate-900">Soft Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <Zap className="h-4 w-4 fill-current" />
              <span>Recommended: Verbal Mock Tests</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Global Rank</CardDescription>
            <CardTitle className="text-2xl font-bold text-slate-900">#452</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>Top 2.4% this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Performance Growth
            </CardTitle>
            <CardDescription>Monthly accuracy vs. global average</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={performanceData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--color-score)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "var(--color-score)" }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="var(--color-avg)" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Skill Spectrum
            </CardTitle>
            <CardDescription>Subject-wise mastery level</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid strokeOpacity={0.1} />
                <PolarAngleAxis dataKey="subject" tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Evaluation Logs
            </CardTitle>
            <Badge variant="secondary" className="bg-white">Last 30 Days</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">{test.name}</p>
                  <p className="text-xs text-slate-400">{test.date}</p>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{test.score}</p>
                    <p className="text-[10px] text-green-600 font-bold uppercase">{test.improvement}</p>
                  </div>
                  <Badge className={test.status === "Perfect" ? "bg-amber-500" : "bg-primary"}>
                    {test.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
