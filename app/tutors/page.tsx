"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Video, Users, Calendar, Filter, Search } from "lucide-react"

interface Tutor {
  id: string
  name: string
  avatar?: string
  subjects: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  location: string
  availability: string[]
  sessionTypes: ("online" | "in-person")[]
  bio: string
  experience: string
  socialHours: number
  verified: boolean
}

const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "Maria Rodriguez",
    avatar: "/female-tutor.jpg",
    subjects: ["Mathematics", "Calculus", "Statistics"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 25,
    location: "Campus Library",
    availability: ["Monday 2-6 PM", "Wednesday 1-5 PM", "Friday 3-7 PM"],
    sessionTypes: ["online", "in-person"],
    bio: "Mathematics major with 3 years of tutoring experience. Specializes in making complex concepts easy to understand.",
    experience: "3 years",
    socialHours: 45,
    verified: true,
  },
  {
    id: "2",
    name: "David Chen",
    avatar: "/male-tutor.jpg",
    subjects: ["Physics", "Chemistry", "Engineering"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 30,
    location: "Science Building",
    availability: ["Tuesday 10-2 PM", "Thursday 11-3 PM", "Saturday 9-1 PM"],
    sessionTypes: ["online", "in-person"],
    bio: "PhD student in Physics with extensive experience in STEM subjects. Patient and methodical teaching approach.",
    experience: "4 years",
    socialHours: 62,
    verified: true,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar: "/diverse-female-student.png",
    subjects: ["English", "Literature", "Writing"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 20,
    location: "Online Only",
    availability: ["Monday 6-9 PM", "Wednesday 7-10 PM", "Sunday 2-6 PM"],
    sessionTypes: ["online"],
    bio: "English Literature major passionate about helping students improve their writing and analytical skills.",
    experience: "2 years",
    socialHours: 38,
    verified: true,
  },
  {
    id: "4",
    name: "Alex Thompson",
    avatar: "/male-student-studying.png",
    subjects: ["Computer Science", "Programming", "Web Development"],
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 35,
    location: "Computer Lab",
    availability: ["Tuesday 3-7 PM", "Thursday 2-6 PM", "Saturday 10-2 PM"],
    sessionTypes: ["online", "in-person"],
    bio: "Computer Science senior with internship experience at tech companies. Specializes in practical programming skills.",
    experience: "3 years",
    socialHours: 71,
    verified: true,
  },
]

export default function TutorsPage() {
  const [tutors] = useState<Tutor[]>(mockTutors)
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(mockTutors)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSessionType, setSelectedSessionType] = useState("all")
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    duration: "60",
    sessionType: "online" as "online" | "in-person",
    topic: "",
    notes: "",
  })

  // Get unique subjects for filter
  const allSubjects = Array.from(new Set(tutors.flatMap((tutor) => tutor.subjects)))

  // Filter tutors based on search and filters
  const filterTutors = () => {
    let filtered = tutors

    if (searchQuery) {
      filtered = filtered.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((tutor) => tutor.subjects.includes(selectedSubject))
    }

    if (selectedSessionType !== "all") {
      filtered = filtered.filter((tutor) => tutor.sessionTypes.includes(selectedSessionType as "online" | "in-person"))
    }

    setFilteredTutors(filtered)
  }

  // Apply filters when search or filter values change
  useState(() => {
    filterTutors()
  })

  const handleBookSession = () => {
    if (!selectedTutor || !bookingData.date || !bookingData.time) return

    // In a real app, this would make an API call
    console.log("Booking session:", {
      tutorId: selectedTutor.id,
      ...bookingData,
    })

    // Reset form and close dialog
    setBookingData({
      date: "",
      time: "",
      duration: "60",
      sessionType: "online",
      topic: "",
      notes: "",
    })
    setIsBookingOpen(false)
    setSelectedTutor(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Tutor</h1>
            <p className="text-muted-foreground">Connect with expert tutors for personalized learning sessions</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search tutors or subjects..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        filterTutors()
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Select
                    value={selectedSubject}
                    onValueChange={(value) => {
                      setSelectedSubject(value)
                      filterTutors()
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {allSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedSessionType}
                    onValueChange={(value) => {
                      setSelectedSessionType(value)
                      filterTutors()
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Session Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tutors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                      <AvatarFallback>
                        {tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{tutor.name}</h3>
                        {tutor.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tutor.rating}</span>
                        <span className="text-sm text-muted-foreground">({tutor.reviewCount} reviews)</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {tutor.location}
                      </div>

                      <div className="text-lg font-bold text-primary">${tutor.hourlyRate}/hour</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Session Types</h4>
                      <div className="flex gap-2">
                        {tutor.sessionTypes.includes("online") && (
                          <Badge variant="outline" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        )}
                        {tutor.sessionTypes.includes("in-person") && (
                          <Badge variant="outline" className="text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            In-Person
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{tutor.bio}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{tutor.experience} experience</span>
                      <span>{tutor.socialHours} social hours</span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedTutor(tutor)
                        setIsBookingOpen(true)
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No tutors found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>Schedule a tutoring session with {selectedTutor?.name}</DialogDescription>
          </DialogHeader>

          {selectedTutor && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar>
                  <AvatarImage src={selectedTutor.avatar || "/placeholder.svg"} alt={selectedTutor.name} />
                  <AvatarFallback>
                    {selectedTutor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedTutor.name}</h4>
                  <p className="text-sm text-muted-foreground">${selectedTutor.hourlyRate}/hour</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={bookingData.duration}
                    onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionType">Session Type</Label>
                  <Select
                    value={bookingData.sessionType}
                    onValueChange={(value: "online" | "in-person") =>
                      setBookingData({ ...bookingData, sessionType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTutor.sessionTypes.includes("online") && <SelectItem value="online">Online</SelectItem>}
                      {selectedTutor.sessionTypes.includes("in-person") && (
                        <SelectItem value="in-person">In-Person</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Subject</Label>
                <Input
                  id="topic"
                  placeholder="What would you like to focus on?"
                  value={bookingData.topic}
                  onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific questions or areas you'd like to cover?"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Total Cost:</span>
                <span className="text-lg font-bold text-primary">
                  ${(selectedTutor.hourlyRate * (Number.parseInt(bookingData.duration) / 60)).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleBookSession} className="flex-1">
                  Confirm Booking
                </Button>
                <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
