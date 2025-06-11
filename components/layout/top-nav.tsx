"use client"

import { Bell, Calendar, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"
import Image from "next/image"

interface TopNavProps {
  onToggleAppointments: () => void
  isAppointmentPanelOpen: boolean
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  isMobile: boolean
}

export default function TopNav({
  onToggleAppointments,
  isAppointmentPanelOpen,
  onToggleSidebar,
  isMobile,
}: TopNavProps) {
  const { user, switchToPatientMode } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu + Search */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button variant="ghost" className="cursor-pointer" size="icon" onClick={onToggleSidebar}>
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search patients, appointments..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Center - Stats */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-xs text-gray-500">Today&apos;s Patients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-xs text-gray-500">Critical</div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Appointments Toggle */}
          <Button
            onClick={onToggleAppointments}
            variant={isAppointmentPanelOpen ? "default" : "outline"}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Appointments</span>
          </Button>

          {/* Switch to Patient Mode - Mobile */}
          <Button variant="ghost" size="icon"  className="sm:hidden" onClick={switchToPatientMode}>
            <User className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <div className="hidden sm:flex items-center space-x-3">
            <Image src="/doctors/Doctor1.jpg" alt="Profile" width={100} height={100} className="w-8 h-8 rounded-full" />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || "Dr. Emma Shelton"}</p>
              <p className="text-xs text-gray-500">{user?.specialization || "Cardiologist"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
