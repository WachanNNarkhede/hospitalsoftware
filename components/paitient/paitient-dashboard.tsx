/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Heart, User, FileText, Phone, MapPin, Droplets, AlertTriangle, LogOut, Building } from "lucide-react"
// import AppointmentBookingModal from "./appointment-booking-modal"
import mockData from "@/data/mock-data.json"
import AppointmentBookingModal from "./appoinment-booking-model"

export default function PatientDashboard() {
  const { user, logout, switchToStaffMode } = useAuth()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Get patient's appointments
  const patientAppointments = mockData.appointments.filter(
    (apt) => apt.patientName === user?.name || apt.patientId === user?.id,
  )

  const upcomingAppointments = patientAppointments.filter(
    (apt) => apt.status === "upcoming" || apt.status === "pending",
  )
  const pastAppointments = patientAppointments.filter((apt) => apt.status === "completed")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediCare Patient Portal</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={switchToStaffMode}>
                <Building className="w-4 h-4 mr-2" />
                Switch to Staff
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                <Badge variant="outline" className="text-xs">
                  Patient
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Hello, <span className="text-blue-100">{user?.name}</span>
              </h2>
              <p className="text-blue-100 mb-4">How are you feeling today? Let&apos;s take care of your health together.</p>
              <Button onClick={() => setIsBookingModalOpen(true)} className="bg-white text-blue-600 hover:bg-blue-50">
                Book Appointment
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                      <p className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Visits</p>
                      <p className="text-2xl font-bold text-green-600">{pastAppointments.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Health Score</p>
                      <p className="text-2xl font-bold text-purple-600">85%</p>
                    </div>
                    <Heart className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your latest health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">72</p>
                    <p className="text-sm text-gray-600">Heart Rate (bpm)</p>
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                      Normal
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 text-blue-500 mx-auto mb-2">🌡️</div>
                    <p className="text-2xl font-bold text-gray-900">98.6°F</p>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                      Normal
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 text-purple-500 mx-auto mb-2">📊</div>
                    <p className="text-2xl font-bold text-gray-900">120/80</p>
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                      Normal
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Droplets className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{user?.bloodGroup || "O+"}</p>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <Badge variant="outline" className="mt-2 text-blue-600 border-blue-600">
                      Type
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Your latest medical consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.doctorName}</p>
                          <p className="text-sm text-gray-600">{(appointment as any).department || "N/A"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`
                          ${appointment.status === "completed" && "bg-green-50 text-green-600 border-green-200"}
                          ${appointment.status === "upcoming" && "bg-blue-50 text-blue-600 border-blue-200"}
                          ${appointment.status === "pending" && "bg-yellow-50 text-yellow-600 border-yellow-200"}
                        `}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <Button onClick={() => setIsBookingModalOpen(true)}>
                <Calendar className="w-4 h-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <div className="grid gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{appointment.doctorName}</p>
                              <p className="text-sm text-gray-600">{(appointment as any).department || "N/A"}</p>
                              <p className="text-sm text-gray-500">{appointment.symptoms}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                            <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-600 border-blue-200">
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Past Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.doctorName}</p>
                            <p className="text-sm text-gray-600">{(appointment as any).department || "N/A"}</p>
                            <p className="text-sm text-gray-500">{appointment.symptoms}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                          <Badge variant="outline" className="mt-1 bg-green-50 text-green-600 border-green-200">
                            Completed
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Medical History</h2>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Blood Group</p>
                      <p className="text-lg">{user?.bloodGroup || "O+"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Allergies</p>
                      <p className="text-lg">{user?.allergies || "None reported"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
                      <p className="text-lg">{user?.emergencyContact || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                      <p className="text-lg">
                        {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not provided"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span>Allergies & Conditions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user?.allergies ? (
                      user.allergies.split(",").map((allergy, index) => (
                        <Badge key={index} variant="outline" className="mr-2 text-red-600 border-red-200">
                          {allergy.trim()}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">No known allergies</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-lg">{user?.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-lg capitalize">{user?.gender}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-lg">{user?.address}</p>
                  </div>
                </div>
                <Button className="mt-4">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  )
}
