"use client"

import { useState, useRef, useEffect } from "react"
import { X, Plus, Printer, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Patient {
  id: number
  name: string
  age: number
  gender: string
  prescriptions: {
    id: number
    date: string
    medicines: {
      name: string
      dosage: string
      frequency: string
      duration: string
    }[]
    findings: string
    instructions: string
  }[]
}

interface PrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  patient: Patient | null
}

export default function PrescriptionModal({ isOpen, onClose, patient }: PrescriptionModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Patient["prescriptions"]>([])
  const [selectedPrescription, setSelectedPrescription] = useState<Patient["prescriptions"][0] | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (patient) {
      setFilteredPrescriptions(patient.prescriptions)
    }
  }, [patient])

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

  if (!isOpen || !patient) return null

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      setFilteredPrescriptions(patient.prescriptions)
    } else {
      const filtered = patient.prescriptions.filter(
        (prescription) =>
          prescription.date.toLowerCase().includes(term.toLowerCase()) ||
          prescription.findings.toLowerCase().includes(term.toLowerCase()) ||
          prescription.medicines.some((med) => med.name.toLowerCase().includes(term.toLowerCase())),
      )
      setFilteredPrescriptions(filtered)
    }
  }

  const handleViewPrescription = (prescription: Patient["prescriptions"][0]) => {
    setSelectedPrescription(prescription)
    setIsViewMode(true)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isViewMode ? "Prescription Details" : "Prescriptions History"}
            </h2>
            <p className="text-sm text-gray-600">
              {patient.name} ({patient.age}, {patient.gender})
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isViewMode && selectedPrescription ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Prescription Details</h3>
                  <p className="text-sm text-gray-600">Date: {selectedPrescription.date}</p>
                </div>
                <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Prescription
                </Button>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">Findings</h4>
                <p className="text-gray-700">{selectedPrescription.findings}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Medicines</h4>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Medicine</TableHead>
                        <TableHead className="font-semibold text-gray-900">Dosage</TableHead>
                        <TableHead className="font-semibold text-gray-900">Frequency</TableHead>
                        <TableHead className="font-semibold text-gray-900">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPrescription.medicines.map((medicine, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{medicine.name}</TableCell>
                          <TableCell>{medicine.dosage}</TableCell>
                          <TableCell>{medicine.frequency}</TableCell>
                          <TableCell>{medicine.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                <p className="text-gray-700">{selectedPrescription.instructions}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsViewMode(false)}
                  className="border-blue-200 text-blue-600"
                >
                  Back to List
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search prescriptions..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 w-full"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Prescription
                </Button>
              </div>

              {filteredPrescriptions.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Date</TableHead>
                        <TableHead className="font-semibold text-gray-900">Medicines</TableHead>
                        <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Findings</TableHead>
                        <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrescriptions.map((prescription) => (
                        <TableRow key={prescription.id}>
                          <TableCell className="font-medium">{prescription.date}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {prescription.medicines.map((medicine, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs whitespace-nowrap"
                                >
                                  {medicine.name}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate hidden md:table-cell">
                            {prescription.findings}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewPrescription(prescription)}
                                className="text-blue-600"
                              >
                                View
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No prescriptions found for this patient.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
