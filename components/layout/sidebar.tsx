"use client"

import {
  Calendar,
  Home,
  Settings,
  Stethoscope,
  UserPlus,
  Building2,
  Pill,
  TestTube,
  Zap,
  DollarSign,
  BarChart3,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  onClose?: () => void
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/doctor", id: "dashboard" },
  { icon: UserPlus, label: "OPD", href: "/doctor/opd", id: "opd" },
  { icon: Building2, label: "IPD", href: "/doctor/ipd", id: "ipd" },
  { icon: Calendar, label: "Appointments", href: "/doctor/appointments", id: "appointments" },
  { icon: Pill, label: "Pharmacy", href: "/doctor/pharmacy", id: "pharmacy" },
  { icon: TestTube, label: "Pathology", href: "/doctor/pathology", id: "pathology" },
  { icon: Zap, label: "Radiology", href: "/doctor/radiology", id: "radiology" },
  { icon: DollarSign, label: "Finance", href: "/doctor/finance", id: "finance" },
  { icon: BarChart3, label: "Reports", href: "/doctor/reports", id: "reports" },
  { icon: Settings, label: "Settings", href: "/doctor/settings", id: "settings" },
]

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user, switchToPatientMode } = useAuth()

  const isActive = (href: string) => {
   
    return pathname.endsWith(href)
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">MediCare</h2>
            <p className="text-sm text-gray-500">Health Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Switch to Patient Mode */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full justify-start mb-4" onClick={switchToPatientMode}>
          <User className="w-4 h-4 mr-2" />
          Switch to Patient
        </Button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name || "Dr. Emma Shelton"}</p>
            <p className="text-xs text-gray-500">{user?.specialization || "Cardiologist"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
