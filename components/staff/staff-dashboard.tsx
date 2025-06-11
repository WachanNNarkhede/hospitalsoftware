"use client"

import { useAuth } from "@/lib/auth"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, FileText, Activity, Clock, User, Stethoscope, Building } from "lucide-react"
import mockData from "@/data/mock-data.json"
import StaffDashboardContent from "./staff-dashbpard-content"

export default function StaffDashboard() {
  const { user } = useAuth()

  // If user is not staff, redirect will be handled by DashboardLayout
  if (!user || user.role === "patient") {
    return null
  }

  // Get all appointments for staff view
  const allAppointments = mockData.appointments
  const todayAppointments = allAppointments.filter((apt) => {
    const today = new Date().toISOString().split("T")[0]
    return apt.date === today
  })
  const pendingAppointments = allAppointments.filter((apt) => apt.status === "pending")
  const completedAppointments = allAppointments.filter((apt) => apt.status === "completed")

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MediCare Staff Portal</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Good morning, <span className="text-green-100">{user?.name}</span>
                </h2>
                <p className="text-green-100 mb-4">
                  {user?.role === "doctor" ? "Ready to help patients today?" : "Managing appointments and patient care"}
                </p>
                <div className="flex space-x-14">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{todayAppointments.length}</div>
                    <div className="text-sm text-green-100">Today&apos;s Appointments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{pendingAppointments.length}</div>
                    <div className="text-sm text-green-100">Pending Requests</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold text-blue-600">1,482</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                    <p className="text-2xl font-bold text-green-600">{todayAppointments.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingAppointments.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Today</p>
                    <p className="text-2xl font-bold text-purple-600">{completedAppointments.length}</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Appointments</span>
              </CardTitle>
              <CardDescription>Manage and track patient appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Symptoms</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${appointment.status === "completed" && "bg-green-50 text-green-600 border-green-200"}
                              ${appointment.status === "upcoming" && "bg-blue-50 text-blue-600 border-blue-200"}
                              ${appointment.status === "pending" && "bg-yellow-50 text-yellow-600 border-yellow-200"}
                              ${appointment.status === "cancelled" && "bg-red-50 text-red-600 border-red-200"}
                            `}
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{appointment.symptoms}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" className="cursor-pointer p-2 rounded-md hover:bg-gray-200/40" size="sm">
                              View
                            </Button>
                            {appointment.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm" className="text-green-600">
                                  Approve
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600">
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start cursor-pointer hover:bg-gray-300/40">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start cursor-pointer hover:bg-gray-300/40">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start cursor-pointer hover:bg-gray-300/40">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start cursor-pointer hover:bg-gray-300/40">
                  <Activity className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Today&apos;s Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Appointments Scheduled</span>
                    <span className="font-medium">{todayAppointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patients Seen</span>
                    <span className="font-medium">{completedAppointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Approvals</span>
                    <span className="font-medium">{pendingAppointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue Today</span>
                    <span className="font-medium text-green-600">
                      ₹{completedAppointments.reduce((sum, apt) => sum + apt.consultationFee, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      <StaffDashboardContent />
      </div>
    </DashboardLayout>
  )
}
