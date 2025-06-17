"use client"

import { useState } from "react"
import { X, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Patient } from "@/app/(doctor)/doctor/opd/patient"


interface PatientDetailsProps {
  selectedPatient: Patient
  onClosePatientDetails: () => void
  onSaveNotes: (id: string, notes: { briefHistory: string; diagnosis: string; medication: string }) => void
  onDeleteNotes: (id: string) => void
}

export default function PatientDetails({
  selectedPatient,
  onClosePatientDetails,
  onSaveNotes,
  onDeleteNotes,
}: PatientDetailsProps) {
  const [briefHistory, setBriefHistory] = useState(selectedPatient.briefHistory || "")
  const [diagnosis, setDiagnosis] = useState(selectedPatient.diagnosis || "")
  const [medication, setMedication] = useState(selectedPatient.medication || "")

  const handleSave = () => {
    onSaveNotes(selectedPatient.id, {
      briefHistory,
      diagnosis,
      medication,
    })
  }

  const handleDelete = () => {
    setBriefHistory("")
    setDiagnosis("")
    setMedication("")
    onDeleteNotes(selectedPatient.id)
  }

  return (
    <Card className="mt-6 border-none shadow-lg rounded-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl text-white flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClosePatientDetails}
          className="text-white hover:bg-blue-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Patient ID</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.patientId}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Patient Name</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Age</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.age}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Gender</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.gender}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Mobile No.</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.phone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Blood Group</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.bloodGroup}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">City</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.city}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Referred By</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.referredBy}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Doctor Name</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.doctorName}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">OPD Date</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.opdDate}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">OPD No.</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.opdNo}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Temperature</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.temperature}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Weight</p>
            <p className="text-base font-semibold text-gray-900">{selectedPatient.weight}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="briefHistory" className="text-sm font-medium text-gray-700 mb-2 block">
              Brief History
            </Label>
            <Textarea
              id="briefHistory"
              value={briefHistory}
              onChange={(e) => setBriefHistory(e.target.value)}
              placeholder="Enter brief history..."
              className="w-full h-24 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700 mb-2 block">
              Diagnosis
            </Label>
            <Textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis..."
              className="w-full h-24 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="medication" className="text-sm font-medium text-gray-700 mb-2 block">
              Medication
            </Label>
            <Textarea
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Enter medication details..."
              className="w-full h-24 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleDelete}
              className="flex items-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Notes</span>
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
