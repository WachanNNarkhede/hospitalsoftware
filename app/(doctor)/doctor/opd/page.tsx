"use client"

import { useState,   } from "react"
import { User, Calendar, Clock, Check, FileText, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/layout/dashboard-layout"
import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import PatientManagement from "@/components/patient-management/patient-management"
import PatientDetails from "@/app/(doctor)/doctor/opd/paitient-details"
import mockData from "@/data/mock-paitents.json"
import { Patient } from "@/app/(doctor)/doctor/opd/patient"

interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "completed" | "upcoming" | "pending" | "cancelled"
  symptoms: string
  diagnosis?: string
  prescription?: string
  consultationFee: number
}

interface PatientRecord extends Patient {
  consultant?: string
  prescription?: string
  symptoms?: string
  disease?: string
  status?: string
  lastVisit?: string
}

// interface PatientManagementProps {
//   onSearch: (term: string) => void
//   setSelectedPatient: Dispatch<SetStateAction<Patient | null>>
//   onAddNewClick: () => void
// }

export default function OpdPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)
  const [patientNotes, setPatientNotes] = useState<{
    [key: string]: { briefHistory: string; diagnosis: string; medication: string }
  }>({})

  // Transform patients to ensure type safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patients: Patient[] = (mockData.patients as any[]).map((p: any) => ({
    id: p.id?.toString() || "",
    patientId: p.patientId?.toString() || "",
    name: p.name || "",
    age: Number(p.age) || 0,
    gender: p.gender || "",
    phone: p.phone || "",
    email: p.email || "",
    bloodGroup: p.bloodGroup || "",
    allergies: p.allergies || "",
    address: p.address || "",
    emergencyContact: p.emergencyContact || "",
    guardianName: p.guardianName || "N/A",
    maritalStatus: p.maritalStatus || "",
    height: p.height || "",
    weight: p.weight || "",
    medicalHistory: p.medicalHistory || "",
    city: p.city || "Unknown",
    referredBy: p.referredBy || "Self",
    doctorName: p.doctorName || "N/A",
    temperature: p.temperature || "N/A",
    opdDate: p.opdDate || new Date().toISOString().split("T")[0],
    opdNo: p.opdNo || "N/A",
    briefHistory: patientNotes[p.id]?.briefHistory || p.briefHistory || "",
    diagnosis: patientNotes[p.id]?.diagnosis || p.diagnosis || "",
    medication: patientNotes[p.id]?.medication || p.medication || "",
  }))

  // Transform appointments to ensure type safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appointments: Appointment[] = (mockData.appointments as any[]).map((a: any) => ({
    id: a.id?.toString() || "",
    patientId: a.patientId?.toString() || "",
    patientName: a.patientName || "",
    doctorId: a.doctorId?.toString() || "",
    doctorName: a.doctorName || "",
    date: a.date || "",
    time: a.time || "",
    status: a.status || "pending",
    symptoms: a.symptoms || "",
    diagnosis: a.diagnosis || "",
    prescription: a.prescription || "",
    consultationFee: Number(a.consultationFee) || 0,
  }))

  // Calculate status cards
  const today = new Date().toISOString().split("T")[0]
  const totalPatients = patients.length
  const registeredPatients = new Set(appointments.map((apt) => apt.patientId)).size
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed" && apt.date === today
  ).length
  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending" || apt.status === "upcoming"
  ).length

  // Enrich patient data
  const patientRecords: PatientRecord[] = patients.map((patient) => {
    const patientAppointments = appointments.filter((apt) => apt.patientId === patient.patientId)
    const latestAppointment = patientAppointments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0]
    return {
      ...patient,
      consultant: latestAppointment?.doctorName || patient.doctorName,
      prescription: latestAppointment?.prescription,
      symptoms: latestAppointment?.symptoms,
      disease: latestAppointment?.diagnosis,
      status: latestAppointment?.status,
      lastVisit: latestAppointment
        ? new Date(latestAppointment.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : undefined,
    }
  })

  // Filter patients
  const filteredPatients = patientRecords.filter((patient: PatientRecord) =>
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleViewPatient = (patient: PatientRecord) => {
    setSelectedPatient(patient)
  }

  const handleViewPrescription = (patient: PatientRecord) => {
    console.log("Viewing prescription for:", patient)
  }

  const handleClosePatientDetails = () => {
    setSelectedPatient(null)
  }

  const handleAddNewPatient = () => {
    setIsAddPatientModalOpen(true)
  }

  const handleSaveNotes = (
    id: string,
    notes: { briefHistory: string; diagnosis: string; medication: string }
  ) => {
    setPatientNotes((prev) => ({
      ...prev,
      [id]: notes,
    }))
  }

  const handleDeleteNotes = (id: string) => {
    setPatientNotes((prev) => {
      const newNotes = { ...prev }
      delete newNotes[id]
      return newNotes
    })
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="OPD - Management"
        description="Manage outpatient department patients and their records"
        actions={
          <Button
            onClick={handleAddNewPatient}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        }
      />

      <ContentWrapper>
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-600">{totalPatients}</p>
                </div>
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Registered Patients</p>
                  <p className="text-2xl font-bold text-green-600">{registeredPatients}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{pendingAppointments}</p>
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
                  <p className="text-2xl font-bold text-purple-600">{completedAppointments}</p>
                </div>
                <Check className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Management */}
        <PatientManagement
          onSearch={handleSearch}
          setSelectedPatient={setSelectedPatient}
          onAddNewClick={handleAddNewPatient}
        />

        {/* Patient Details */}
        {selectedPatient && (
          <PatientDetails
            selectedPatient={selectedPatient}
            onClosePatientDetails={handleClosePatientDetails}
            onSaveNotes={handleSaveNotes}
            onDeleteNotes={handleDeleteNotes}
          />
        )}

        {/* Patient Records Table */}
        <div className="bg-white rounded-2xl shadow-sm mt-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
            </div>
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredPatients.length} patient(s) matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosed By
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-gray-500 uppercase tracking-wider">
                    Prescription
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symptoms
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disease
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.patientId}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.consultant || "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.prescription || "None"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.symptoms || "None"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.disease || "None"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.status || "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.lastVisit || "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPatient(patient)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPrescription(patient)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Prescription
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ContentWrapper>
    </DashboardLayout>
  )
}
