"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  User,
  AlertCircle,
  Activity,
  Clock,
  Plus,
  Pill,
  FileText,
  CreditCard,
  Stethoscope,
  TestTube,
  Scissors,
  DollarSign,
  Video,
  ChevronLeft,
  ChevronRight,
  Building2,
  Truck,
  Droplets,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Heart,
  Thermometer,
  Zap,
  Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface IpdPatient {
  id: number
  ipdNo: string
  name: string
  age: number
  gender: string
  guardianName: string
  phone: string
  email: string
  address: string
  allergies: string
  consultant: string
  bed: string
  bloodGroup: string
  admissionDate: string
  status: string
  height: string
  weight: string
  bp: string
  pulse: string
  temperature: string
  respiration: string
  caseId: string
  creditLimit: number
}

interface IpdPatientDetailModalProps {
  isOpen: boolean
  onClose: () => void
  patient: IpdPatient | null
}

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "nurse-notes", label: "Nurse Notes", icon: FileText },
  { id: "medication", label: "Medication", icon: Pill },
  { id: "prescription", label: "Prescription", icon: FileText },
  { id: "consultant", label: "Consultant Register", icon: Stethoscope },
  { id: "lab", label: "Lab Investigation", icon: TestTube },
  { id: "operations", label: "Operations", icon: Scissors },
  { id: "charges", label: "Charges", icon: CreditCard },
  { id: "payments", label: "Payments", icon: DollarSign },
  { id: "live-consultation", label: "Live Consultation", icon: Video },
  { id: "bed-history", label: "Bed History", icon: Activity },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "treatment", label: "Treatment History", icon: Activity },
]

const sampleNurseNotes = [
  {
    id: 1,
    date: "2024-01-18",
    time: "08:00 AM",
    nurse: "Nurse Sarah Johnson",
    notes: "Patient vitals stable. Temperature normal. Patient comfortable and responsive.",
    vitals: { bp: "120/80", pulse: "72", temp: "98.6", resp: "16" },
  },
  {
    id: 2,
    date: "2024-01-17",
    time: "08:00 PM",
    nurse: "Nurse Maria Garcia",
    notes: "Administered evening medication. Patient reported mild discomfort, provided comfort measures.",
    vitals: { bp: "125/85", pulse: "75", temp: "99.1", resp: "18" },
  },
]

const sampleMedications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "Ongoing",
    status: "Active",
    startDate: "2024-01-15",
    prescribedBy: "Dr. Emma Shelton",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    status: "Active",
    startDate: "2024-01-16",
    prescribedBy: "Dr. Emma Shelton",
  },
]

const samplePrescriptions = [
  {
    id: 1,
    prescriptionNo: "RX001",
    date: "2024-01-18",
    finding: "Hypertension under control, continue current medication",
    doctor: "Dr. Emma Shelton",
    medicines: ["Lisinopril 10mg", "Aspirin 81mg"],
  },
  {
    id: 2,
    prescriptionNo: "RX002",
    date: "2024-01-16",
    finding: "Blood glucose levels elevated, started on Metformin",
    doctor: "Dr. Emma Shelton",
    medicines: ["Metformin 500mg"],
  },
]

const sampleLabTests = [
  {
    id: 1,
    testName: "Complete Blood Count",
    lab: "Central Lab",
    sampleCollected: "Yes",
    expectedDate: "2024-01-19",
    approvedBy: "Dr. Emma Shelton",
    status: "Pending",
  },
  {
    id: 2,
    testName: "Blood Glucose",
    lab: "Central Lab",
    sampleCollected: "Yes",
    expectedDate: "2024-01-18",
    approvedBy: "Dr. Emma Shelton",
    status: "Completed",
  },
]

const sampleConsultations = [
  {
    id: 1,
    date: "2024-01-18",
    time: "10:00 AM",
    consultant: "Dr. Emma Shelton",
    department: "Cardiology",
    notes: "Patient showing improvement. Continue current treatment plan.",
    followUp: "2024-01-20",
  },
  {
    id: 2,
    date: "2024-01-16",
    time: "02:00 PM",
    consultant: "Dr. Michael Brown",
    department: "Internal Medicine",
    notes: "Initial consultation. Started on medication for hypertension.",
    followUp: "2024-01-18",
  },
]

const sampleCharges = [
  {
    id: 1,
    service: "Room Charges",
    date: "2024-01-18",
    amount: 2500,
    status: "Pending",
    category: "Accommodation",
  },
  {
    id: 2,
    service: "Doctor Consultation",
    date: "2024-01-18",
    amount: 1000,
    status: "Paid",
    category: "Professional",
  },
  {
    id: 3,
    service: "Laboratory Tests",
    date: "2024-01-17",
    amount: 1500,
    status: "Pending",
    category: "Diagnostic",
  },
]

const samplePayments = [
  {
    id: 1,
    date: "2024-01-17",
    amount: 5000,
    method: "Cash",
    reference: "PAY001",
    receivedBy: "Cashier John",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-01-15",
    amount: 10000,
    method: "Card",
    reference: "PAY002",
    receivedBy: "Cashier Sarah",
    status: "Completed",
  },
]

const sampleBedHistory = [
  {
    id: 1,
    bedNo: "110 - General Ward - Ground Floor",
    fromDate: "2024-01-15",
    toDate: "Current",
    duration: "4 days",
    reason: "Initial admission",
  },
  {
    id: 2,
    bedNo: "108 - General Ward - Ground Floor",
    fromDate: "2024-01-14",
    toDate: "2024-01-15",
    duration: "1 day",
    reason: "Temporary assignment",
  },
]

const sampleTimeline = [
  {
    id: 1,
    date: "2024-01-18",
    time: "10:00 AM",
    event: "Doctor Consultation",
    description: "Regular checkup with Dr. Emma Shelton",
    type: "consultation",
  },
  {
    id: 2,
    date: "2024-01-17",
    time: "08:00 AM",
    event: "Lab Test",
    description: "Blood samples collected for CBC and glucose test",
    type: "lab",
  },
  {
    id: 3,
    date: "2024-01-16",
    time: "02:00 PM",
    event: "Medication Started",
    description: "Started on Metformin 500mg twice daily",
    type: "medication",
  },
  {
    id: 4,
    date: "2024-01-15",
    time: "09:00 AM",
    event: "Admission",
    description: "Patient admitted to IPD",
    type: "admission",
  },
]

export default function IpdPatientDetailModal({ isOpen, onClose, patient }: IpdPatientDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [scrollPosition, setScrollPosition] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      tabsRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  if (!isOpen || !patient) return null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const creditUsedPercentage = 0
  const creditUsed = 0
  const creditBalance = patient.creditLimit

  const renderTabIcon = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId)
    if (!tab) return null

    const IconComponent = tab.icon
    return <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {patient.name.toUpperCase()} ({patient.age})
            </h2>
            <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {patient.ipdNo}
            </span>
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                patient.status === "Critical"
                  ? "bg-red-100 text-red-800"
                  : patient.status === "Stable"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {patient.status}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 px-4 sm:px-6 py-2 border-b border-gray-200 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollTabs("left")}
            className="mr-2 h-8 w-8 flex-shrink-0 sm:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div
            ref={tabsRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 font-medium rounded-t-lg transition-colors whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 border-t-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {renderTabIcon(tab.id)}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollTabs("right")}
            className="ml-2 h-8 w-8 flex-shrink-0 sm:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Patient Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Patient Photo and Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                      <div className="text-center">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">NO IMAGE</p>
                        <p className="text-xs text-gray-500">AVAILABLE</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Gender</p>
                          <p className="text-gray-900">{patient.gender}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Age</p>
                          <p className="text-gray-900">{patient.age} Year</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Guardian Name</p>
                        <p className="text-gray-900">{patient.guardianName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900">{patient.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">Case ID</p>
                    <p className="text-xl font-bold text-gray-900">{patient.caseId || "45"}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">IPD No</p>
                    <p className="text-xl font-bold text-blue-600">{patient.ipdNo}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">Admission Date</p>
                    <p className="text-lg font-medium text-gray-900">{patient.admissionDate}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">Bed</p>
                    <p className="text-lg font-medium text-gray-900">{patient.bed}</p>
                  </div>
                </div>

                {/* Known Allergies */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <h3 className="font-medium text-gray-900">Known Allergies</h3>
                  </div>
                  <p className="text-gray-700">{patient.allergies || "No known allergies"}</p>
                </div>

                {/* Findings */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <h3 className="font-medium text-gray-900">Finding</h3>
                  </div>
                  <p className="text-gray-700">
                    Patient showing stable vital signs with gradual improvement in overall condition. Blood pressure
                    within normal range.
                  </p>
                </div>

                {/* Symptoms */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <h3 className="font-medium text-gray-900">Symptoms</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-800">• Thirst</p>
                      <p className="text-sm text-gray-600 ml-4">
                        Thirst is the feeling of needing to drink something. It occurs whenever the body is dehydrated
                        for any reason. Any condition that can result in a loss of body water can lead to thirst or
                        excess.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Credit Limit & Payment Info */}
              <div className="space-y-4">
                {/* Credit Limit Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">100.00%</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">Credit Limit: Rs. {patient.creditLimit.toLocaleString()}</p>
                      <p className="text-gray-600">Used Credit Limit: Rs. {creditUsed}</p>
                      <p className="font-medium text-green-600">
                        Balance Credit Limit: Rs. {creditBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment/Billing Sections */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <h4 className="text-xs font-medium text-gray-900">IPD PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Pill className="w-4 h-4 text-purple-500" />
                      <h4 className="text-xs font-medium text-gray-900">PHARMACY PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <TestTube className="w-4 h-4 text-green-500" />
                      <h4 className="text-xs font-medium text-gray-900">PATHOLOGY PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-yellow-500" />
                      <h4 className="text-xs font-medium text-gray-900">RADIOLOGY PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplets className="w-4 h-4 text-red-500" />
                      <h4 className="text-xs font-medium text-gray-900">BLOOD BANK PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-4 h-4 text-gray-500" />
                      <h4 className="text-xs font-medium text-gray-900">AMBULANCE PAYMENT/BILLING</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">0%</p>
                    <p className="text-xs font-medium">Rs.0/Rs.0</p>
                  </div>
                </div>

                {/* Quick Sections */}
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">MEDICATION</h4>
                    <p className="text-xs text-gray-500">Current medications: {sampleMedications.length} active</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">PRESCRIPTION</h4>
                    <p className="text-xs text-gray-500">Total prescriptions: {samplePrescriptions.length}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">CONSULTANT REGISTER</h4>
                    <p className="text-xs text-gray-500">Recent consultations: {sampleConsultations.length}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">LAB INVESTIGATION</h4>
                    <p className="text-xs text-gray-500">Pending tests: {sampleLabTests.length}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">OPERATION</h4>
                    <p className="text-xs text-gray-500">No operations scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nurse Notes Tab */}
          {activeTab === "nurse-notes" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Nurse Notes</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Nurse Note
                </Button>
              </div>

              <div className="space-y-4">
                {sampleNurseNotes.map((note) => (
                  <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {note.date} - {note.time}
                        </h4>
                        <p className="text-sm text-blue-600">{note.nurse}</p>
                      </div>
                      <div className="flex space-x-4 text-xs">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>BP: {note.vitals.bp}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-blue-500" />
                          <span>Pulse: {note.vitals.pulse}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Thermometer className="w-3 h-3 text-orange-500" />
                          <span>Temp: {note.vitals.temp}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Wind className="w-3 h-3 text-green-500" />
                          <span>Resp: {note.vitals.resp}</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{note.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medication Tab */}
          {activeTab === "medication" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Medication</TableHead>
                      <TableHead className="font-semibold text-gray-900">Dosage</TableHead>
                      <TableHead className="font-semibold text-gray-900">Frequency</TableHead>
                      <TableHead className="font-semibold text-gray-900">Duration</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Prescribed By</TableHead>
                      <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleMedications.map((medication) => (
                      <TableRow key={medication.id}>
                        <TableCell className="font-medium">{medication.name}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                        <TableCell>{medication.duration}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{medication.status}</Badge>
                        </TableCell>
                        <TableCell className="text-blue-600">{medication.prescribedBy}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Prescription Tab */}
          {activeTab === "prescription" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Prescription</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prescription
                </Button>
              </div>

              <div className="mb-4">
                <Input placeholder="Search..." className="max-w-md" />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Prescription No</TableHead>
                      <TableHead className="font-semibold text-gray-900">Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Finding</TableHead>
                      <TableHead className="font-semibold text-gray-900">Doctor</TableHead>
                      <TableHead className="font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samplePrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.prescriptionNo}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell className="max-w-xs truncate">{prescription.finding}</TableCell>
                        <TableCell className="text-blue-600">{prescription.doctor}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
                  Records: {samplePrescriptions.length} prescriptions
                </div>
              </div>
            </div>
          )}

          {/* Consultant Register Tab */}
          {activeTab === "consultant" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Consultant Register</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Consultation
                </Button>
              </div>

              <div className="space-y-4">
                {sampleConsultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {consultation.date} - {consultation.time}
                        </h4>
                        <p className="text-sm text-blue-600">
                          {consultation.consultant} - {consultation.department}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 w-fit">Follow-up: {consultation.followUp}</Badge>
                    </div>
                    <p className="text-gray-700">{consultation.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Investigation Tab */}
          {activeTab === "lab" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Lab Investigation</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Investigation
                </Button>
              </div>

              <div className="mb-4">
                <Input placeholder="Search..." className="max-w-md" />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Test Name</TableHead>
                      <TableHead className="font-semibold text-gray-900">Lab</TableHead>
                      <TableHead className="font-semibold text-gray-900">Sample Collected</TableHead>
                      <TableHead className="font-semibold text-gray-900">Expected Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Approved By</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleLabTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.testName}</TableCell>
                        <TableCell>{test.lab}</TableCell>
                        <TableCell>{test.sampleCollected}</TableCell>
                        <TableCell>{test.expectedDate}</TableCell>
                        <TableCell className="text-blue-600">{test.approvedBy}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              test.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {test.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
                  Records: {sampleLabTests.length} tests
                </div>
              </div>
            </div>
          )}

          {/* Operations Tab */}
          {activeTab === "operations" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Operations</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Operation
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <Scissors className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-600 font-medium">No operations scheduled</p>
                <p className="text-sm text-blue-500 mt-2">Operations and surgical procedures will appear here</p>
              </div>
            </div>
          )}

          {/* Charges Tab */}
          {activeTab === "charges" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Charges</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Charge
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Service</TableHead>
                      <TableHead className="font-semibold text-gray-900">Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Amount</TableHead>
                      <TableHead className="font-semibold text-gray-900">Category</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleCharges.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell className="font-medium">{charge.service}</TableCell>
                        <TableCell>{charge.date}</TableCell>
                        <TableCell className="font-medium">Rs. {charge.amount.toLocaleString()}</TableCell>
                        <TableCell>{charge.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              charge.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {charge.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
                  Total Charges: Rs. {sampleCharges.reduce((sum, charge) => sum + charge.amount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Payments</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Amount</TableHead>
                      <TableHead className="font-semibold text-gray-900">Method</TableHead>
                      <TableHead className="font-semibold text-gray-900">Reference</TableHead>
                      <TableHead className="font-semibold text-gray-900">Received By</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samplePayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">Rs. {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell>{payment.receivedBy}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
                  Total Payments: Rs.{" "}
                  {samplePayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Live Consultation Tab */}
          {activeTab === "live-consultation" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Live Consultation</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Video className="w-4 h-4 mr-2" />
                  Start Consultation
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <Video className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-600 font-medium">No active consultations</p>
                <p className="text-sm text-blue-500 mt-2">
                  Video consultations and telemedicine sessions will appear here
                </p>
              </div>
            </div>
          )}

          {/* Bed History Tab */}
          {activeTab === "bed-history" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Bed History</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Transfer Bed
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Bed No</TableHead>
                      <TableHead className="font-semibold text-gray-900">From Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">To Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Duration</TableHead>
                      <TableHead className="font-semibold text-gray-900">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleBedHistory.map((bed) => (
                      <TableRow key={bed.id}>
                        <TableCell className="font-medium">{bed.bedNo}</TableCell>
                        <TableCell>{bed.fromDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              bed.toDate === "Current" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {bed.toDate}
                          </Badge>
                        </TableCell>
                        <TableCell>{bed.duration}</TableCell>
                        <TableCell>{bed.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Patient Timeline</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Timeline Entry
                </Button>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-6">
                  {sampleTimeline.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                        {event.type === "consultation" && <Stethoscope className="w-4 h-4 text-white" />}
                        {event.type === "lab" && <TestTube className="w-4 h-4 text-white" />}
                        {event.type === "medication" && <Pill className="w-4 h-4 text-white" />}
                        {event.type === "admission" && <Calendar className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{event.event}</h4>
                          <span className="text-sm text-gray-500">
                            {event.date} - {event.time}
                          </span>
                        </div>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Treatment History Tab */}
          {activeTab === "treatment" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">Treatment History</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Treatment Note
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Treatment Progress</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Day 4 - Significant Improvement</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Patient showing excellent response to treatment</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-800">Day 3 - Vitals Stabilized</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">Blood pressure and heart rate within normal range</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-800">Day 2 - Medication Adjusted</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">Dosage modified based on patient response</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">Day 1 - Treatment Started</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        Initial assessment completed, treatment plan initiated
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Current Vitals Trend</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-700">Blood Pressure</p>
                      <p className="text-xl font-bold text-blue-900">{patient.bp} mmHg</p>
                      <p className="text-xs text-blue-600">↓ Improving</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-700">Pulse</p>
                      <p className="text-xl font-bold text-green-900">{patient.pulse} bpm</p>
                      <p className="text-xs text-green-600">→ Stable</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-700">Temperature</p>
                      <p className="text-xl font-bold text-yellow-900">{patient.temperature}°F</p>
                      <p className="text-xs text-yellow-600">→ Normal</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-purple-700">Respiration</p>
                      <p className="text-xl font-bold text-purple-900">{patient.respiration} bpm</p>
                      <p className="text-xs text-purple-600">→ Normal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
