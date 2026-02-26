"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, BrainCircuit, Type, GraduationCap, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { CRT_CATEGORIES, MOCK_TESTS } from "@/app/lib/mock-data"
import { cn } from "@/lib/utils"

export default function TestsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showResults, setShowResults] = useState(false)

  const activeQuestions = activeCategory ? (MOCK_TESTS as any)[activeCategory] : []

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isTesting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft === 0) {
      handleFinishTest()
    }
    return () => clearInterval(timer)
  }, [isTesting, timeLeft])

  const handleStartTest = (categoryId: string) => {
    setActiveCategory(categoryId)
    setIsTesting(true)
    setCurrentQuestionIdx(0)
    setAnswers({})
    setTimeLeft(300)
    setShowResults(false)
  }

  const handleFinishTest = () => {
    setIsTesting(false)
    setShowResults(true)
  }

  const handleAnswerSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const calculateScore = () => {
    let score = 0
    activeQuestions.forEach((q: any) => {
      if (answers[q.id] === q.answer) score++
    })
    return score
  }

  if (showResults) {
    const score = calculateScore()
    const total = activeQuestions.length
    const percentage = (score / total) * 100

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <Card className="text-center p-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline mb-2">Test Completed!</CardTitle>
          <CardDescription>Instant Result Analysis</CardDescription>
          <div className="mt-8 space-y-4">
            <div className="text-6xl font-bold text-primary">{score} / {total}</div>
            <p className="text-lg font-medium">You scored {percentage}%</p>
            <Progress value={percentage} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-green-700 font-semibold uppercase">Accuracy</p>
              <p className="text-xl font-bold text-green-700">{percentage}%</p>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-xs text-accent font-semibold uppercase">Weak Topics</p>
              <p className="text-xl font-bold text-accent">Analysis</p>
            </div>
          </div>
          <Button className="w-full mt-8" onClick={() => setShowResults(false)}>Return to Test Dashboard</Button>
        </Card>
      </div>
    )
  }

  if (isTesting) {
    const q = activeQuestions[currentQuestionIdx]
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/20">
              {CRT_CATEGORIES.find(c => c.id === activeCategory)?.name}
            </Badge>
            <span className="text-sm font-medium">Question {currentQuestionIdx + 1} of {activeQuestions.length}</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full font-mono font-bold",
            timeLeft < 60 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"
          )}>
            <Clock className="w-4 h-4" />
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </header>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed font-normal">
              {q.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-3">
            {q.options.map((option: string) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(q.id, option)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all",
                  answers[q.id] === option 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-transparent bg-muted/50 hover:bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answers[q.id] === option && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </div>
              </button>
            ))}
          </CardContent>
          <CardFooter className="justify-between border-t p-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIdx === 0}
            >
              Previous
            </Button>
            {currentQuestionIdx === activeQuestions.length - 1 ? (
              <Button onClick={handleFinishTest} className="bg-accent hover:bg-accent/90">Finish Test</Button>
            ) : (
              <Button onClick={() => setCurrentQuestionIdx(prev => prev + 1)}>Next Question</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-headline">CRT Training Modules</h1>
        <p className="text-muted-foreground">Select a category to start your placement preparation journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CRT_CATEGORIES.map(category => {
          const Icon = category.id === 'quant' ? Calculator : 
                      category.id === 'logical' ? BrainCircuit : 
                      category.id === 'verbal' ? Type : GraduationCap
          
          return (
            <Card key={category.id} className="relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={80} />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="font-headline">{category.name}</CardTitle>
                <CardDescription>
                  {category.id === 'mock' ? 'Full length 60 min tests' : 'Topic-wise practice questions'}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" onClick={() => handleStartTest(category.id)}>Start Module</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader className="flex flex-row items-center gap-4">
          <AlertCircle className="w-8 h-8 text-accent" />
          <div>
            <CardTitle className="text-lg">Pro Tip: Adaptive Testing</CardTitle>
            <CardDescription className="text-accent/80">Our AI monitors your accuracy and increases difficulty as you improve.</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}