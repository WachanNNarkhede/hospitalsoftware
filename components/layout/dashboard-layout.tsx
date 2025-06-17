"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AuthProvider } from "@/lib/auth"
import AuthGuard from "@/components/auth/auth-guard"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import AppointmentPanel from "../opdComp/AppointmentPanel"
import StaffDashboardContent from "../staff/staff-dashbpard-content"
// import { AppointmentPanel } from "@/components/appointment-panel"
// import StaffDashboardContent from "@/components/staff/staff-dashboard-content"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAppointmentPanelOpen, setIsAppointmentPanelOpen] = useState(false) // Default to closed
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <AuthProvider>
      <AuthGuard>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar Overlay for Mobile */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
            fixed md:static inset-y-0 left-0 z-50 md:z-auto
            transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 transition-transform duration-300 ease-in-out
          `}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav
              onToggleAppointments={() => setIsAppointmentPanelOpen(!isAppointmentPanelOpen)}
              isAppointmentPanelOpen={isAppointmentPanelOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isSidebarOpen={isSidebarOpen}
              isMobile={isMobile}
            />

            <div className="flex-1 flex overflow-hidden">
              {/* Main Dashboard Content */}
              <main className="flex-1 overflow-y-auto">{children || <StaffDashboardContent />}</main>

              {/* Appointment Panel - Only visible when toggled */}
              <div
                className={`
                  transition-all duration-300 ease-in-out
                  ${isAppointmentPanelOpen ? "w-80" : "w-0"}
                  ${isMobile ? "hidden" : "block"}
                  overflow-hidden
                `}
              >
                <AppointmentPanel isOpen={isAppointmentPanelOpen} onClose={() => setIsAppointmentPanelOpen(false)} />
              </div>

              {/* Mobile Appointment Panel Overlay */}
              {isMobile && isAppointmentPanelOpen && (
                <div className="fixed inset-0 z-50">
                  <AppointmentPanel isOpen={isAppointmentPanelOpen} onClose={() => setIsAppointmentPanelOpen(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  )
}
