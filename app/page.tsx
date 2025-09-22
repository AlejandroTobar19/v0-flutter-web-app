import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BookOpen, Award, Clock, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />

      {/* Hero Section - Mobile Optimized */}
      <section className="px-4 py-12 lg:py-20 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-balance mb-4 lg:mb-6">
            Transform Your Academic Journey with <span className="text-primary">Mentu</span>
          </h1>
          <p className="text-base lg:text-xl text-muted-foreground text-balance mb-6 lg:mb-8 leading-relaxed px-2">
            Organize your studies with intelligent calendar management, connect with expert tutors, and track your
            academic progress all in one powerful platform.
          </p>
          <div className="flex flex-col gap-3 justify-center px-4">
            <Link href="/signup">
              <Button size="lg" className="w-full text-base lg:text-lg px-6 py-4 lg:px-8 lg:py-6">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base lg:text-lg px-6 py-4 lg:px-8 lg:py-6 bg-transparent"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Grid */}
      <section className="px-4 py-12 lg:py-20 pb-20 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Everything You Need to Excel</h2>
            <p className="text-base lg:text-xl text-muted-foreground text-balance px-2">
              Mentu combines smart organization tools with personalized tutoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <Calendar className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Smart Calendar</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Organize assignments, exams, and projects with adaptive reminders and priority suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <Users className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Expert Tutors</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Connect with qualified tutors based on subject, schedule, and ratings for personalized learning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <BookOpen className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Progress Tracking</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Visualize your academic progress with detailed analytics and performance insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <Award className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Social Hours</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Automatically track and validate tutoring hours for students providing peer support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Flexible Scheduling</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Book tutoring sessions that fit your schedule with both virtual and in-person options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <Target className="w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 lg:mb-4 mx-auto" />
                <CardTitle className="text-lg lg:text-xl">Goal Setting</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Set academic goals and receive personalized recommendations to achieve them.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="px-4 py-12 lg:py-20 bg-primary text-primary-foreground mb-16 lg:mb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 text-balance">
            Ready to Transform Your Academic Experience?
          </h2>
          <p className="text-base lg:text-xl mb-6 lg:mb-8 opacity-90 text-balance px-2">
            Join thousands of students who are already using Mentu to organize their studies and excel academically.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="w-full max-w-sm text-base lg:text-lg px-6 py-4 lg:px-8 lg:py-6"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="px-4 py-8 lg:py-12 bg-muted mb-16 lg:mb-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold">Mentu</span>
              </div>
              <p className="text-muted-foreground text-sm lg:text-base">
                Empowering students through intelligent academic management and personalized tutoring.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Product</h3>
              <ul className="space-y-2 text-muted-foreground text-sm lg:text-base">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-foreground transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Support</h3>
              <ul className="space-y-2 text-muted-foreground text-sm lg:text-base">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Company</h3>
              <ul className="space-y-2 text-muted-foreground text-sm lg:text-base">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 lg:mt-12 pt-6 lg:pt-8 text-center text-muted-foreground text-sm lg:text-base">
            <p>&copy; 2025 Mentu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
