"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, BookOpen, FileText, GraduationCap, AlertCircle } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  type: "assignment" | "exam" | "project" | "class"
  subject: string
  date: string
  time: string
  priority: "high" | "medium" | "low"
  description?: string
  completed?: boolean
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Mathematics Quiz",
    type: "exam",
    subject: "Calculus I",
    date: "2025-01-22",
    time: "10:00",
    priority: "high",
    description: "Chapter 3-4 derivatives and limits",
  },
  {
    id: "2",
    title: "History Essay",
    type: "assignment",
    subject: "World History",
    date: "2025-01-24",
    time: "23:59",
    priority: "medium",
    description: "Write 1500 words on Industrial Revolution",
    completed: false,
  },
  {
    id: "3",
    title: "Physics Lab Report",
    type: "assignment",
    subject: "Physics II",
    date: "2025-01-25",
    time: "14:00",
    priority: "high",
    description: "Submit lab report on electromagnetic induction",
  },
  {
    id: "4",
    title: "Group Project Presentation",
    type: "project",
    subject: "Computer Science",
    date: "2025-01-28",
    time: "09:00",
    priority: "high",
    description: "Present web application project to class",
  },
]

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "assignment" as CalendarEvent["type"],
    subject: "",
    date: "",
    time: "",
    priority: "medium" as CalendarEvent["priority"],
    description: "",
  })

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "assignment":
        return <FileText className="w-4 h-4" />
      case "exam":
        return <GraduationCap className="w-4 h-4" />
      case "project":
        return <BookOpen className="w-4 h-4" />
      case "class":
        return <Calendar className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: CalendarEvent["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    return events
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }

  const getTodayEvents = () => {
    const today = new Date().toISOString().split("T")[0]
    return events.filter((event) => event.date === today)
  }

  const getOverdueEvents = () => {
    const today = new Date()
    return events.filter((event) => new Date(event.date) < today && !event.completed)
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.subject || !newEvent.date) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      ...newEvent,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      type: "assignment",
      subject: "",
      date: "",
      time: "",
      priority: "medium",
      description: "",
    })
    setIsAddEventOpen(false)
  }

  const toggleEventComplete = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, completed: !event.completed } : event)))
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      <div className="px-4 py-6 lg:px-6 lg:py-8 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">Academic Calendar</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Organize your assignments, exams, and projects
              </p>
            </div>

            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-4 sm:mx-0 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new academic event with details and priority</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="h-12 lg:h-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: CalendarEvent["type"]) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger className="h-12 lg:h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="class">Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value: CalendarEvent["priority"]) =>
                          setNewEvent({ ...newEvent, priority: value })
                        }
                      >
                        <SelectTrigger className="h-12 lg:h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Subject name"
                      value={newEvent.subject}
                      onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })}
                      className="h-12 lg:h-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="h-12 lg:h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="h-12 lg:h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Event description (optional)"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="min-h-20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button onClick={handleAddEvent} className="flex-1 h-12 lg:h-10">
                      Add Event
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)} className="h-12 lg:h-10">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Calendar View */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              {/* Today's Events */}
              <Card>
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    <Calendar className="w-5 h-5 text-primary" />
                    Today's Events
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {getTodayEvents().length === 0 ? (
                    <p className="text-muted-foreground text-center py-6 lg:py-8 text-sm lg:text-base">
                      No events scheduled for today
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {getTodayEvents().map((event) => (
                        <div
                          key={event.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {getEventIcon(event.type)}
                            <div>
                              <h4 className="font-medium text-sm lg:text-base">{event.title}</h4>
                              <p className="text-xs lg:text-sm text-muted-foreground">{event.subject}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(event.priority)}`}>
                              {event.priority}
                            </Badge>
                            <span className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className="text-lg lg:text-xl">Upcoming Events</CardTitle>
                  <CardDescription className="text-sm lg:text-base">Your next assignments and exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getUpcomingEvents().map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={event.completed || false}
                          onChange={() => toggleEventComplete(event.id)}
                          className="rounded border-gray-300 mt-1"
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                          <div className="flex items-center gap-2 flex-1">
                            {getEventIcon(event.type)}
                            <div className={event.completed ? "opacity-50" : ""}>
                              <h4
                                className={`font-medium text-sm lg:text-base ${event.completed ? "line-through" : ""}`}
                              >
                                {event.title}
                              </h4>
                              <p className="text-xs lg:text-sm text-muted-foreground">{event.subject}</p>
                              {event.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:flex-col sm:items-end">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(event.priority)}`}>
                              {event.priority}
                            </Badge>
                            <div className="text-right">
                              <p className="text-xs lg:text-sm font-medium">
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Shows below main content on mobile */}
            <div className="space-y-4 lg:space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className="text-lg lg:text-xl">Quick Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Events</span>
                    <span className="font-semibold">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="font-semibold text-green-600">{events.filter((e) => e.completed).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming</span>
                    <span className="font-semibold text-blue-600">{getUpcomingEvents().length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overdue</span>
                    <span className="font-semibold text-red-600">{getOverdueEvents().length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Overdue Items */}
              {getOverdueEvents().length > 0 && (
                <Card className="border-red-200">
                  <CardHeader className="pb-3 lg:pb-6">
                    <CardTitle className="flex items-center gap-2 text-red-600 text-lg lg:text-xl">
                      <AlertCircle className="w-5 h-5" />
                      Overdue Items
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-base">
                      Items that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getOverdueEvents().map((event) => (
                        <div key={event.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <div>
                              <h4 className="font-medium text-red-800 text-sm lg:text-base">{event.title}</h4>
                              <p className="text-xs lg:text-sm text-red-600">{event.subject}</p>
                              <p className="text-xs text-red-500">Due: {new Date(event.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Priority Distribution */}
              <Card>
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className="text-lg lg:text-xl">Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">High Priority</span>
                      </div>
                      <span className="font-semibold">{events.filter((e) => e.priority === "high").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Medium Priority</span>
                      </div>
                      <span className="font-semibold">{events.filter((e) => e.priority === "medium").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Low Priority</span>
                      </div>
                      <span className="font-semibold">{events.filter((e) => e.priority === "low").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
