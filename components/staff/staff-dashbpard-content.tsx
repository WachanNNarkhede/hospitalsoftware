"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Pill, FileText, Printer } from "lucide-react"
// import { Heart, Thermometer, Activity, Droplets } from "lucide-react"
import PatientDetailModal from "../patientdetil/patientdetailsmodule"
import PrescriptionModal from "../opdComp/prescription-model"
// import PatientDetailModal from "@/components/patient-detail/patient-detail-modal"
// import PrescriptionModal from "@/components/opd/prescription-modal"

// Mock patient data with unique Patient IDs
const mockPatients = [
  {
    id: 1,
    patientId: "PAT001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    guardianName: "Robert Smith",
    phone: "9876543210",
    email: "john.smith@email.com",
    address: "123 Main St, City",
    allergies: "Penicillin",
    findings: "Elevated blood pressure, irregular heartbeat",
    symptoms: "Atopic Dermatitis (Eczema)",
    consultantDoctor: "TANWEER ALAM (DOC1)",
    bloodGroup: "O+",
    maritalStatus: "Married",
    height: "175 cm",
    weight: "70 kg",
    bp: "140/90",
    pulse: "85",
    temperature: "98.6°F",
    respiration: "16",
    status: "Active",
    lastVisit: "2024-01-15",
    prescription: "Lisinopril 10mg",
    disease: "Cardiovascular Disease",
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
  },
  {
    id: 2,
    patientId: "PAT002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    guardianName: "Michael Johnson",
    phone: "9876543211",
    email: "sarah.johnson@email.com",
    address: "456 Oak Ave, City",
    allergies: "None",
    findings: "Normal examination",
    symptoms: "Routine checkup",
    consultantDoctor: "Dr. Emma Shelton",
    bloodGroup: "A+",
    maritalStatus: "Single",
    height: "165 cm",
    weight: "60 kg",
    bp: "120/80",
    pulse: "72",
    temperature: "98.4°F",
    respiration: "14",
    status: "Active",
    lastVisit: "2024-01-14",
    prescription: "Multivitamins",
    disease: "Healthy",
    prescriptions: [
      {
        id: 1,
        date: "2024-01-14",
        medicines: [{ name: "Multivitamins", dosage: "1 tablet", frequency: "Once daily", duration: "30 days" }],
        findings: "Routine checkup - all normal",
        instructions: "Continue healthy lifestyle",
      },
    ],
  },
  {
    id: 3,
    patientId: "PAT003",
    name: "Robert Davis",
    age: 28,
    gender: "Male",
    guardianName: "William Davis",
    phone: "9876543212",
    email: "robert.davis@email.com",
    address: "789 Pine St, City",
    allergies: "Shellfish",
    findings: "Minor respiratory infection",
    symptoms: "Cough, mild fever",
    consultantDoctor: "Dr. Michael Brown",
    bloodGroup: "B+",
    maritalStatus: "Single",
    height: "180 cm",
    weight: "75 kg",
    bp: "125/82",
    pulse: "78",
    temperature: "99.2°F",
    respiration: "18",
    status: "Under Treatment",
    lastVisit: "2024-01-16",
    prescription: "Amoxicillin 500mg",
    disease: "Respiratory Infection",
    prescriptions: [
      {
        id: 1,
        date: "2024-01-16",
        medicines: [
          { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" },
          { name: "Cough Syrup", dosage: "10ml", frequency: "Twice daily", duration: "5 days" },
        ],
        findings: "Mild respiratory infection",
        instructions: "Complete the full course of antibiotics, rest, and stay hydrated",
      },
    ],
  },
  {
    id: 4,
    patientId: "PAT004",
    name: "Emily Wilson",
    age: 55,
    gender: "Female",
    guardianName: "James Wilson",
    phone: "9876543213",
    email: "emily.wilson@email.com",
    address: "321 Elm St, City",
    allergies: "Latex, Aspirin",
    findings: "Diabetes management",
    symptoms: "Fatigue, increased thirst",
    consultantDoctor: "Dr. Lisa Anderson",
    bloodGroup: "AB+",
    maritalStatus: "Married",
    height: "162 cm",
    weight: "68 kg",
    bp: "135/88",
    pulse: "82",
    temperature: "98.4°F",
    respiration: "16",
    status: "Monitoring",
    lastVisit: "2024-01-13",
    prescription: "Metformin 850mg",
    disease: "Type 2 Diabetes",
    prescriptions: [
      {
        id: 1,
        date: "2024-01-13",
        medicines: [
          { name: "Metformin", dosage: "850mg", frequency: "Twice daily", duration: "30 days" },
          { name: "Glimepiride", dosage: "2mg", frequency: "Once daily", duration: "30 days" },
        ],
        findings: "Blood sugar levels need monitoring",
        instructions: "Follow diabetic diet, regular exercise, monitor blood sugar daily",
      },
    ],
  },
]

export default function StaffDashboardContent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isPatientDetailOpen, setIsPatientDetailOpen] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(mockPatients)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setFilteredPatients(mockPatients)
      return
    }

    const filtered = mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(term.toLowerCase()) ||
        patient.phone.includes(term) ||
        patient.email.toLowerCase().includes(term.toLowerCase()) ||
        patient.disease.toLowerCase().includes(term.toLowerCase()) ||
        patient.consultantDoctor.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsPatientDetailOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewPrescription = (patient: any) => {
    setSelectedPatient(patient)
    setIsPrescriptionModalOpen(true)
  }

  const closePatientDetail = () => {
    setIsPatientDetailOpen(false)
    setSelectedPatient(null)
  }

  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false)
    setSelectedPatient(null)
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Dr. Emma Shelton. Here&#39;s what&#39;s happening today.</p>
      </div> */}

      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Good morning, Dr. Emma Shelton</h2>
            <p className="text-blue-100 mb-4">Have a nice day and don&apos;t forget to take care of your health!</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Schedule →
            </button>
          </div>
          <div className="hidden lg:block ml-6">
            <img src="/images/doctor-hero.png" alt="Doctor" className="w-32 h-32 rounded-lg object-cover" />
          </div>
        </div>
      </div> */}

      {/* Health Metrics - Using proper Lucide icons */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">normal</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              102<span className="text-sm font-normal text-gray-500 ml-1">bpm</span>
            </p>
            <p className="text-sm text-gray-600">Heart Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">normal</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              36.6<span className="text-sm font-normal text-gray-500 ml-1">°C</span>
            </p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">normal</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              120/80<span className="text-sm font-normal text-gray-500 ml-1">mmHg</span>
            </p>
            <p className="text-sm text-gray-600">Blood Pressure</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">normal</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              90<span className="text-sm font-normal text-gray-500 ml-1">mg/dL</span>
            </p>
            <p className="text-sm text-gray-600">Glucose</p>
          </div>
        </div>
      </div> */}

      {/* Patient Records Section */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </div>
          <div className="relative max-w-md">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Patient ID, Name, Phone, Email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Found {filteredPatients.length} patient(s) matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symptoms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disease
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-blue-600">{patient.patientId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">{patient.consultantDoctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                      {patient.prescription}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{patient.symptoms}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{patient.disease}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : patient.status === "Under Treatment"
                            ? "bg-yellow-100 text-yellow-800"
                            : patient.status === "Monitoring"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPatient(patient)}
                        className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPrescription(patient)}
                        className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
                        title="View Prescription"
                      >
                        <Pill className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
                        title="View Reports"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredPatients.length} of {mockPatients.length} patients
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientDetailModal isOpen={isPatientDetailOpen} onClose={closePatientDetail} patient={selectedPatient} />
      <PrescriptionModal isOpen={isPrescriptionModalOpen} onClose={closePrescriptionModal} patient={selectedPatient} />
    </div>
  )
}
