import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  ArrowRight,
  BrainCircuit
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Top 15% of users</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">8 modules completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Learning Progress</CardTitle>
            <CardDescription>Your activity across different engineering modules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Computer Science (DSA)</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Quantitative Aptitude</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Logical Reasoning</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Verbal Ability</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Weak Topic Analysis</CardTitle>
            <CardDescription>AI-driven insights for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <BrainCircuit className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Permutations & Combinations</p>
                  <p className="text-xs text-muted-foreground mt-1">Accuracy below 40% in recent tests. Recommend AI Notes generation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <BrainCircuit className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Critical Reasoning</p>
                  <p className="text-xs text-muted-foreground mt-1">Timed response is slow. Practice more mock tests.</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90" size="sm">
                <Link href="/dashboard/notes">
                  Generate Study Plan <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm group hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <BookOpen className="w-5 h-5" />
              CRT Test Ready
            </div>
            <CardTitle className="font-headline">Ready for a Mock Test?</CardTitle>
            <CardDescription>Simulate the real placement environment with timed tests.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
              <Link href="/dashboard/tests">Start Test</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-sm group hover:border-accent/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2 text-accent font-semibold mb-2">
              <BrainCircuit className="w-5 h-5" />
              AI Study Assistant
            </div>
            <CardTitle className="font-headline">Need instant notes?</CardTitle>
            <CardDescription>Enter any engineering topic and get structured study material.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="group-hover:bg-accent group-hover:text-accent-foreground">
              <Link href="/dashboard/notes">Generate Notes</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
