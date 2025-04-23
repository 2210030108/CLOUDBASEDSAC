import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  BookOpen, 
  Bell, 
  Award, 
  Clock, 
  ChevronRight,
  BarChart4,
  ExternalLink,
  MessageSquare
} from "lucide-react";

// Mock data - In a real application, this would come from your API
const courses = [
  { 
    id: 1, 
    title: "Introduction to Computer Science", 
    code: "CS101",
    instructor: "Dr. Sarah Johnson",
    progress: 72,
    nextDeadline: "Apr 14 - Quiz",
    unread: 2
  },
  { 
    id: 2, 
    title: "Calculus II", 
    code: "MATH202",
    instructor: "Prof. Michael Chang",
    progress: 45,
    nextDeadline: "Apr 12 - Assignment",
    unread: 0
  },
  { 
    id: 3, 
    title: "Modern World History", 
    code: "HIST105",
    instructor: "Dr. Emily Brooks",
    progress: 89,
    nextDeadline: "Apr 18 - Essay",
    unread: 1
  },
  { 
    id: 4, 
    title: "Introduction to Psychology", 
    code: "PSYC101",
    instructor: "Prof. James Wilson",
    progress: 60,
    nextDeadline: "Apr 15 - Midterm",
    unread: 0
  }
];

const deadlines = [
  { 
    id: 1, 
    title: "Assignment: Algorithm Design", 
    course: "CS101", 
    dueDate: new Date("2025-04-12"), 
    type: "assignment"
  },
  { 
    id: 2, 
    title: "Quiz: Derivatives and Integrals", 
    course: "MATH202", 
    dueDate: new Date("2025-04-14"), 
    type: "quiz"
  },
  { 
    id: 3, 
    title: "World War II Essay", 
    course: "HIST105", 
    dueDate: new Date("2025-04-18"), 
    type: "essay"
  },
  { 
    id: 4, 
    title: "Psychology Midterm Exam", 
    course: "PSYC101", 
    dueDate: new Date("2025-04-15"), 
    type: "exam"
  }
];

const announcements = [
  {
    id: 1,
    title: "Campus Network Maintenance",
    content: "Campus WiFi will be down for maintenance on Sunday from 2-4am.",
    date: "April 10, 2025",
    type: "admin"
  },
  {
    id: 2,
    title: "CS101 Class Canceled",
    content: "Tomorrow's CS101 class is canceled due to instructor illness.",
    date: "April 11, 2025",
    type: "course"
  },
  {
    id: 3,
    title: "Library Extended Hours",
    content: "The library will extend hours during finals week, open until 2am.",
    date: "April 9, 2025",
    type: "admin"
  }
];

const recentGrades = [
  { 
    id: 1, 
    assignment: "Algorithm Quiz", 
    course: "CS101", 
    grade: "92%", 
    feedback: true 
  },
  { 
    id: 2, 
    assignment: "Integral Homework", 
    course: "MATH202", 
    grade: "78%", 
    feedback: true
  },
  { 
    id: 3, 
    assignment: "Historical Analysis", 
    course: "HIST105", 
    grade: "95%", 
    feedback: false
  }
];

// Format date to show day and month
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

// Calculate days remaining until deadline
const getDaysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your courses today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
            <Badge className="ml-1 bg-blue-500" variant="secondary">3</Badge>
          </Button>
          <Button size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Resume Learning</span>
          </Button>
        </div>
      </div>

      {/* Overall progress card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            Spring semester 2025 - Overall completion: 68%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1 text-sm font-medium">
                <span>Semester Completion</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center p-3 bg-slate-100 rounded-lg dark:bg-slate-800">
                <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">5 Active Courses</div>
                  <div className="text-xs text-muted-foreground">4 In Progress</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-slate-100 rounded-lg dark:bg-slate-800">
                <Clock className="h-5 w-5 text-amber-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">4 Upcoming Deadlines</div>
                  <div className="text-xs text-muted-foreground">Next: Apr 12</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-slate-100 rounded-lg dark:bg-slate-800">
                <Award className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">Current GPA: 3.8</div>
                  <div className="text-xs text-muted-foreground">Last Term: 3.7</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Course cards */}
        <Card className="col-span-full md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Your active courses this semester</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.code} - {course.instructor}</p>
                    </div>
                    {course.unread > 0 && (
                      <Badge className="bg-blue-500">{course.unread} new</Badge>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Next: {course.nextDeadline}
                    </span>
                    <Button variant="outline" size="sm">Resume</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming deadlines card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Your next assignments and exams</CardDescription>
            </div>
            <Button variant="ghost" size="icon" size="sm" title="View Calendar">
              <Calendar className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deadlines.map((item) => {
                const daysLeft = getDaysRemaining(item.dueDate);
                const isUrgent = daysLeft <= 2;
                
                return (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className={`mt-0.5 p-1.5 rounded-full ${
                      isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type === 'assignment' && <BookOpen className="h-4 w-4" />}
                      {item.type === 'quiz' || item.type === 'exam' && <Clock className="h-4 w-4" />}
                      {item.type === 'essay' && <MessageSquare className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.title}</p>
                        <Badge variant={isUrgent ? "destructive" : "outline"} className="text-xs">
                          {daysLeft === 0 ? "Today" : 
                           daysLeft === 1 ? "Tomorrow" : 
                           `${daysLeft} days`}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.course} - Due {formatDate(item.dueDate)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <Button className="w-full mt-2" variant="outline" size="sm">
                View All Deadlines
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent grades and announcements tabs */}
        <Tabs defaultValue="grades" className="col-span-full md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Latest Updates</CardTitle>
                <TabsList>
                  <TabsTrigger value="grades">Grades</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="grades" className="space-y-4 mt-0">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div>
                      <div className="font-medium text-sm">{grade.assignment}</div>
                      <div className="text-xs text-muted-foreground">{grade.course}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        parseFloat(grade.grade) >= 90 ? 'text-green-500' : 
                        parseFloat(grade.grade) >= 70 ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {grade.grade}
                      </span>
                      {grade.feedback && (
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" size="sm">
                  View All Grades
                </Button>
              </TabsContent>
              
              <TabsContent value="announcements" className="space-y-4 mt-0">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-2 border-b last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">{announcement.title}</div>
                      <Badge variant="outline" className="text-xs">
                        {announcement.type === 'admin' ? 'Campus' : 'Course'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                  </div>
                ))}
                <Button className="w-full" variant="outline" size="sm">
                  View All Announcements
                </Button>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {/* Learning analytics */}
        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Learning Analytics</CardTitle>
              <CardDescription>Your study patterns this week</CardDescription>
            </div>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Study Time This Week</span>
                  <span className="font-medium">14.5 hours</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
                </div>
                <div className="mt-1 flex text-xs text-muted-foreground justify-between">
                  <span>Goal: 20 hours</span>
                  <span>73% of goal</span>
                </div>
              </div>
              
              <div className="flex space-x-2 text-center">
                <div className="flex-1 p-2 bg-slate-100 rounded-lg">
                  <div className="text-2xl font-semibold">4</div>
                  <div className="text-xs text-muted-foreground">Days Active</div>
                </div>
                <div className="flex-1 p-2 bg-slate-100 rounded-lg">
                  <div className="text-2xl font-semibold">85%</div>
                  <div className="text-xs text-muted-foreground">Assignment Completion</div>
                </div>
                <div className="flex-1 p-2 bg-slate-100 rounded-lg">
                  <div className="text-2xl font-semibold">3.8</div>
                  <div className="text-xs text-muted-foreground">GPA</div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Subject Distribution</p>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-500 w-3/12"></div>
                  <div className="bg-green-500 w-4/12"></div>
                  <div className="bg-purple-500 w-2/12"></div>
                  <div className="bg-amber-500 w-3/12"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>CS101</span>
                  <span>MATH202</span>
                  <span>HIST105</span>
                  <span>PSYC101</span>
                </div>
              </div>
              
              <Button className="w-full" variant="outline" size="sm">
                Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;