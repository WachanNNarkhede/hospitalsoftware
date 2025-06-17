/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts - Fixed version
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import mockData from "@/data/mock-data.json"

export interface User {
  patientId: any
  id: string
  email: string
  name: string
  role: "patient" | "doctor" | "receptionist" | "admin"
  phone?: string
  address?: string
  dateOfBirth?: string
  gender?: string
  emergencyContact?: string
  bloodGroup?: string
  allergies?: string
  specialization?: string
  experience?: string
  qualification?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
  switchToStaffMode: () => void
  switchToPatientMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Type assertion to handle the mock data structure
    const users = mockData.users as Array<any>
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Use object destructuring with rest operator to exclude password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword as User)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Invalid email or password" }
    }
  }

  const signup = async (userData: any) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Type assertion for mock data
    const users = mockData.users as Array<any>
    const existingUser = users.find((u) => u.email === userData.email)
    
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "User already exists with this email" }
    }

    const newUser = {
      id: String(users.length + 1),
      ...userData,
      role: "patient" as const,
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword as User)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    window.location.assign("/auth")
  }

  const switchToStaffMode = () => {
    const staffUser: User = {
      id: "2",
      email: "doctor@demo.com",
      name: "Dr. Emma Shelton",
      role: "doctor",
      specialization: "Cardiology",
      experience: "10 years",
      qualification: "MBBS, MD Cardiology",
      phone: "+91 98765 43212",
      patientId: undefined
    }
    setUser(staffUser)
    localStorage.setItem("user", JSON.stringify(staffUser))
  }

  const switchToPatientMode = () => {
    const patientUser: User = {
      id: "1",
      email: "patient@demo.com",
      name: "John Smith",
      role: "patient",
      phone: "+91 98765 43210",
      address: "123 Main Street, Mumbai, Maharashtra",
      dateOfBirth: "1990-05-15",
      gender: "male",
      emergencyContact: "+91 98765 43211",
      bloodGroup: "O+",
      allergies: "Penicillin, Peanuts",
      patientId: undefined
    }
    setUser(patientUser)
    localStorage.setItem("user", JSON.stringify(patientUser))
  }

  // Make sure to return the context provider with value
  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading, switchToStaffMode, switchToPatientMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}