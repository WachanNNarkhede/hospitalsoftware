// components/auth/auth-guard.tsx - Fixed version
"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
// import LoginPage from "./login-page"
// import PatientDashboard from "../patient/patient-dashboard"
import { Loader2 } from 'lucide-react'
import LoginPage from "./login-page"
import PatientDashboard from "../paitient/paitient-dashboard"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (user.role === "patient") {
    return <PatientDashboard />
  }

  // For staff roles (doctor, receptionist, admin)
  return <>{children}</>
}