"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Pill, FileText, Printer, MoreHorizontal } from "lucide-react"
// import PatientDetailModal from "@/components/patient-detail/patient-detail-modal"
// import PrescriptionModal from "@/components/opd/prescription-modal"
// import SymptomsModal from "@/components/opd/symptoms-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PatientDetailModal from "../patientdetil/patientdetailsmodule"
import PrescriptionModal from "./prescription-model"
import SymptomsModal from "./symptoms-model"

const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    guardianName: "Robert Smith",
    phone: "9876543210",
    email: "john@example.com",
    address: "123 Main St, City",
    diagnosedBy: "Dr. Emma Shelton",
    prescription: "Lisinopril 10mg",
    symptoms: "Hypertension, Chest Pain",
    disease: "Cardiovascular Disease",
    status: "Active",
    lastVisit: "2024-01-15",
    allergies: "Penicillin",
    findings: "Elevated blood pressure, irregular heartbeat",
    consultantDoctor: "TANWEER ALAM (DOC1)",
    bloodGroup: "O+",
    maritalStatus: "Married",
    height: "175",
    weight: "80",
    bp: "140/90",
    pulse: "85",
    temperature: "98.6",
    respiration: "18",
    prescriptions: [
      {
        id: 1,
        date: "2024-01-15",
        medicines: [
          { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
          { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "30 days" },
        ],
        findings: "Hypertension under control",
        instructions: "Take with food, monitor blood pressure daily",
      },
    ],
    symptomsHistory: [
      {
        id: 1,
        date: "2024-01-15",
        symptoms: "Chest pain, shortness of breath",
        severity: "Moderate",
        duration: "2 hours",
        description: "Patient experienced chest discomfort during physical activity",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    guardianName: "Michael Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    address: "456 Oak Ave, Town",
    diagnosedBy: "Dr. Michael Brown",
    prescription: "Metformin 500mg",
    symptoms: "Frequent Urination, Fatigue",
    disease: "Type 2 Diabetes",
    status: "Monitoring",
    lastVisit: "2024-01-12",
    allergies: "None",
    findings: "High blood glucose levels",
    consultantDoctor: "DR. MICHAEL BROWN (DOC2)",
    bloodGroup: "A+",
    maritalStatus: "Single",
    height: "165",
    weight: "65",
    bp: "120/80",
    pulse: "72",
    temperature: "98.4",
    respiration: "16",
    prescriptions: [
      {
        id: 1,
        date: "2024-01-12",
        medicines: [{ name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }],
        findings: "Blood sugar levels elevated",
        instructions: "Take with meals, follow diabetic diet",
      },
    ],
    symptomsHistory: [
      {
        id: 1,
        date: "2024-01-12",
        symptoms: "Increased thirst, frequent urination",
        severity: "Mild",
        duration: "1 week",
        description: "Patient reports increased water intake and urination frequency",
      },
    ],
  },
]

export default function PatientTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(patients)
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [isSymptomsModalOpen, setIsSymptomsModalOpen] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.disease.toLowerCase().includes(term.toLowerCase()) ||
        patient.diagnosedBy.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "badge-green"
      case "critical":
        return "badge-red"
      case "monitoring":
        return "badge-yellow"
      case "stable":
        return "badge-blue"
      default:
        return "badge-gray"
    }
  }

  const handleAddNewPatient = () => {
    router.push("/patients")
  }

  const handleViewPatient = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsDetailModalOpen(true)
  }

  const handleViewPrescription = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsPrescriptionModalOpen(true)
  }

  const handleViewSymptoms = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsSymptomsModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePrintPrescription = (patient: (typeof patients)[0]) => {
    // Print functionality
    window.print()
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Table Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
            <Button onClick={handleAddNewPatient} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              Add New Patient
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 min-w-[200px]">Patient Name</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Age</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Diagnosed By</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Prescription</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Symptoms</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Disease</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Last Visit</TableHead>
                <TableHead className="font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt={patient.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <span className="block">{patient.name}</span>
                        <span className="text-sm text-gray-500 sm:hidden">{patient.age} years</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
                  <TableCell className="text-blue-600 font-medium hidden md:table-cell">
                    {patient.diagnosedBy}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                      {patient.prescription}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs hidden lg:table-cell">
                    <p className="text-sm text-gray-600 truncate" title={patient.symptoms}>
                      {patient.symptoms}
                    </p>
                  </TableCell>
                  <TableCell className="font-medium hidden md:table-cell">{patient.disease}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}
                    >
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 hidden sm:table-cell">{patient.lastVisit}</TableCell>
                  <TableCell>
                    {/* Desktop Actions */}
                    <div className="hidden sm:flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewPatient(patient)}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewPrescription(patient)}
                        title="View Prescription"
                      >
                        <Pill className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewSymptoms(patient)}
                        title="View Symptoms"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handlePrintPrescription(patient)}
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Mobile Actions Dropdown */}
                    <div className="sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewPatient(patient)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewPrescription(patient)}>
                            <Pill className="w-4 h-4 mr-2" />
                            View Prescription
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewSymptoms(patient)}>
                            <FileText className="w-4 h-4 mr-2" />
                            View Symptoms
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrintPrescription(patient)}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        patient={selectedPatient}
      />

      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patient={selectedPatient}
      />

      <SymptomsModal
        isOpen={isSymptomsModalOpen}
        onClose={() => setIsSymptomsModalOpen(false)}
        patient={selectedPatient}
      />
    </>
  )
}
