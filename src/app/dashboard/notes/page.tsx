"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  FileDown, 
  Save, 
  BookOpenCheck, 
  Code2, 
  Lightbulb,
  CheckCircle2,
  Loader2,
  BrainCircuit
} from "lucide-react"
import { generateAIAssistedStudyNotes, type GenerateAIAssistedStudyNotesOutput } from "@/ai/flows/generate-ai-assisted-study-notes"
import { generateQuizFromAITopicNotes, type GenerateQuizFromAITopicNotesOutput } from "@/ai/flows/generate-quiz-from-ai-topic-notes"
import { jsPDF } from "jspdf"

export default function NotesPage() {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [notes, setNotes] = useState<GenerateAIAssistedStudyNotesOutput | null>(null)
  const [quiz, setQuiz] = useState<GenerateQuizFromAITopicNotesOutput | null>(null)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setIsGenerating(true)
    setNotes(null)
    setQuiz(null)
    
    try {
      const result = await generateAIAssistedStudyNotes({ topic })
      setNotes(result)
    } catch (error) {
      console.error("Generation failed", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!notes) return
    setIsGeneratingQuiz(true)
    try {
      const inputString = JSON.stringify(notes)
      const result = await generateQuizFromAITopicNotes(inputString)
      setQuiz(result)
    } catch (error) {
      console.error("Quiz generation failed", error)
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  const handleDownloadPDF = () => {
    if (!notes) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15
    const contentWidth = pageWidth - margin * 2
    let y = 20

    // Header
    doc.setFontSize(10)
    doc.setTextColor(150, 150, 150)
    doc.text("PLACE PRO - PROFESSIONAL STUDY GUIDE", margin, y)
    y += 10

    // Title
    doc.setFontSize(24)
    doc.setTextColor(37, 99, 235) // Primary color
    doc.text(notes.title, margin, y)
    y += 15

    // Definition
    doc.setFontSize(14)
    doc.setTextColor(30, 41, 59)
    doc.text("Executive Summary", margin, y)
    y += 8
    doc.setFontSize(11)
    doc.setTextColor(71, 85, 105)
    const defLines = doc.splitTextToSize(notes.definition, contentWidth)
    doc.text(defLines, margin, y)
    y += (defLines.length * 7) + 8

    // Key Concepts
    doc.setFontSize(14)
    doc.setTextColor(30, 41, 59)
    doc.text("Key Concepts", margin, y)
    y += 8
    doc.setFontSize(11)
    doc.setTextColor(71, 85, 105)
    notes.keyConcepts.forEach(concept => {
      const lines = doc.splitTextToSize(`• ${concept}`, contentWidth)
      doc.text(lines, margin, y)
      y += (lines.length * 6)
      if (y > 270) { doc.addPage(); y = 20; }
    })
    y += 8

    // Interview Questions
    doc.setFontSize(14)
    doc.setTextColor(30, 41, 59)
    doc.text("Interview Preparation", margin, y)
    y += 8
    doc.setFontSize(11)
    doc.setTextColor(71, 85, 105)
    notes.interviewQuestions.forEach(q => {
      const lines = doc.splitTextToSize(`Q: ${q}`, contentWidth)
      doc.text(lines, margin, y)
      y += (lines.length * 7)
      if (y > 270) { doc.addPage(); y = 20; }
    })

    // Code Snippet
    if (notes.codeSnippet) {
      if (y > 240) { doc.addPage(); y = 20; }
      y += 12
      doc.setFontSize(14)
      doc.setTextColor(30, 41, 59)
      doc.text("Technical Implementation", margin, y)
      y += 8
      doc.setFont("courier", "normal")
      doc.setFontSize(9)
      doc.setTextColor(30, 41, 59)
      const codeLines = doc.splitTextToSize(notes.codeSnippet, contentWidth)
      doc.text(codeLines, margin, y)
    }

    doc.save(`${notes.title.replace(/\s+/g, '_')}_StudyNotes.pdf`)
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <BrainCircuit className="w-3 h-3" />
          AI Resource Generation
        </div>
        <h1 className="text-5xl font-bold font-headline tracking-tight text-slate-900">Place Pro AI Intelligence</h1>
        <p className="text-slate-500 text-xl leading-relaxed">
          Generate structured, high-impact study guides for any engineering or technical concept in seconds.
        </p>
        
        <form onSubmit={handleGenerate} className="flex gap-2 p-2 bg-white rounded-2xl shadow-2xl border border-slate-100">
          <Input 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Search topic: e.g. Dijkstra's Algorithm, Load Balancing..." 
            className="border-none bg-transparent focus-visible:ring-0 text-lg h-14 placeholder:text-slate-300"
          />
          <Button 
            disabled={isGenerating || !topic.trim()} 
            className="h-14 px-10 rounded-xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            Process
          </Button>
        </form>
      </div>

      {isGenerating && (
        <div className="max-w-4xl mx-auto grid gap-6 animate-pulse">
          <Card className="min-h-[400px] border-slate-100">
            <CardHeader className="space-y-4">
              <div className="h-8 bg-slate-100 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-4/5" />
            </CardContent>
          </Card>
        </div>
      )}

      {notes && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl font-bold font-headline text-slate-900">{notes.title}</h2>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-semibold">Generated Resource Guide</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="rounded-xl border-slate-200" onClick={handleDownloadPDF}>
                <FileDown className="w-4 h-4 mr-2" /> Export PDF
              </Button>
              <Button size="lg" className="rounded-xl shadow-md">
                <Save className="w-4 h-4 mr-2" /> Save to Vault
              </Button>
            </div>
          </div>

          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="notes" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Resource Guide</TabsTrigger>
              <TabsTrigger value="quiz" onClick={() => !quiz && handleGenerateQuiz()} className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                {isGeneratingQuiz ? "Processing Quiz..." : "Practice Exam"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-6 mt-8">
              <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-slate-900">
                    <BookOpenCheck className="w-5 h-5 text-primary" />
                    Executive Summary & Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none space-y-8">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Context & Definition</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">{notes.definition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Foundational Pillars</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {notes.keyConcepts.map((concept, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {notes.codeSnippet && (
                <Card className="bg-slate-950 border-none shadow-2xl">
                  <CardHeader className="pb-2 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs text-slate-400 flex items-center gap-2 uppercase tracking-[0.2em] font-code">
                        <Code2 className="w-4 h-4" /> Technical Implementation
                      </CardTitle>
                      <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-800">C++ / JAVA / PYTHON</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <pre className="font-code text-slate-300 text-sm overflow-x-auto p-8 leading-relaxed">
                      <code>{notes.codeSnippet}</code>
                    </pre>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-slate-100">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-slate-900">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      Strategic Interview Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notes.interviewQuestions.map((q, i) => (
                        <div key={i} className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all">
                          <p className="text-slate-700 font-medium leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/10 h-fit sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Summary Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notes.quickRevisionPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                          <p className="text-sm text-slate-700 font-medium leading-tight">{point}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6 bg-primary font-bold shadow-md shadow-primary/10">Mark as Mastered</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="mt-8">
              {isGeneratingQuiz ? (
                <div className="text-center py-32 space-y-6">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto opacity-50" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Assembling Intelligence</h3>
                    <p className="text-slate-400">Our AI is drafting complex scenarios based on your resource guide...</p>
                  </div>
                </div>
              ) : quiz ? (
                <div className="space-y-8 max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold font-headline text-slate-900">{quiz.quizTitle}</h3>
                    <p className="text-slate-500 mt-2">Simulated placement examination module.</p>
                  </div>
                  {quiz.questions.map((q, i) => (
                    <Card key={i} className="border-slate-100 shadow-sm overflow-hidden group">
                      <div className="h-1 w-full bg-slate-50 group-hover:bg-primary/20 transition-colors" />
                      <CardHeader className="space-y-4">
                        <Badge variant="secondary" className="w-fit text-[10px] uppercase font-bold tracking-wider">Attempt {i + 1}</Badge>
                        <CardTitle className="text-lg font-medium text-slate-800 leading-relaxed">
                          {q.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {q.options && q.options.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((option, optIdx) => (
                              <Button key={optIdx} variant="outline" className="justify-start h-auto py-5 px-6 text-left whitespace-normal border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-slate-600 hover:text-primary">
                                {option}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 bg-slate-50 rounded-2xl text-slate-500 italic text-sm border border-dashed border-slate-200">
                            Construct a mental response based on the generated resource material before reveal.
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-6 flex justify-between items-center">
                        <details className="w-full">
                          <summary className="cursor-pointer text-sm font-bold text-primary hover:underline list-none">
                            Validate Logic Output
                          </summary>
                          <div className="mt-4 p-4 bg-primary text-white rounded-xl font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5" />
                            {q.correctAnswer}
                          </div>
                        </details>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 border-2 border-dashed border-slate-200 rounded-3xl">
                  <Button size="lg" onClick={handleGenerateQuiz} className="font-bold px-10">Generate Placement Exam</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!notes && !isGenerating && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
           <Card className="border-none shadow-sm bg-white/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Performance</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 leading-relaxed">
              Proprietary AI architecture optimized for technical placement readiness.
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Pedagogy</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 leading-relaxed">
              Active recall through automated assessment generation.
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Authority</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 leading-relaxed">
              Content curated from top-tier corporate interview databases.
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}