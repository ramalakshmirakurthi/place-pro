"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Play, CheckCircle2, Filter } from "lucide-react"
import { VIDEO_MODULES, BRANCHES } from "@/app/lib/mock-data"
import { cn } from "@/lib/utils"

export default function VideosPage() {
  const [search, setSearch] = useState("")
  const [activeBranch, setActiveBranch] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEO_MODULES[0] | null>(null)

  const filteredVideos = VIDEO_MODULES.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase())
    const matchesBranch = activeBranch ? video.branch === activeBranch : true
    return matchesSearch && matchesBranch
  })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Core Engineering Videos</h1>
          <p className="text-muted-foreground">Expert-led video modules for all major engineering branches.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search topics..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button 
          variant={activeBranch === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveBranch(null)}
          className="rounded-full"
        >
          All Branches
        </Button>
        {BRANCHES.map(branch => (
          <Button 
            key={branch} 
            variant={activeBranch === branch ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveBranch(branch)}
            className="rounded-full"
          >
            {branch}
          </Button>
        ))}
      </div>

      {selectedVideo && (
        <Card className="overflow-hidden border-2 border-primary/20 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="aspect-video bg-black relative">
            <iframe 
              src={selectedVideo.videoUrl} 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">{selectedVideo.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{selectedVideo.branch}</Badge>
                <span className="text-xs text-muted-foreground">{selectedVideo.duration}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedVideo(null)}>
              Close Player
            </Button>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-all border-none bg-card/50">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  className="rounded-full bg-accent hover:bg-accent/90"
                  onClick={() => setSelectedVideo(video)}
                >
                  <Play className="fill-current" />
                </Button>
              </div>
              {video.watched && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            <CardHeader className="p-4">
              <Badge variant="outline" className="w-fit mb-2 text-[10px] border-primary/20 text-primary">
                {video.branch}
              </Badge>
              <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                {video.title}
              </CardTitle>
            </CardHeader>
            <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
              <span>{video.duration}</span>
              <button className="hover:text-primary underline">Mark as watched</button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No videos found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearch(""); setActiveBranch(null); }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}