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
  symptomsHistory: {
    id: number
    date: string
    symptoms: string
    severity: string
    duration: string
    description: string
  }[]
}

interface SymptomsModalProps {
  isOpen: boolean
  onClose: () => void
  patient: Patient | null
}

export default function SymptomsModal({ isOpen, onClose, patient }: SymptomsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSymptoms, setFilteredSymptoms] = useState<Patient["symptomsHistory"]>([])
  const [selectedSymptom, setSelectedSymptom] = useState<Patient["symptomsHistory"][0] | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (patient) {
      setFilteredSymptoms(patient.symptomsHistory)
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
      setFilteredSymptoms(patient.symptomsHistory)
    } else {
      const filtered = patient.symptomsHistory.filter(
        (symptom) =>
          symptom.date.toLowerCase().includes(term.toLowerCase()) ||
          symptom.symptoms.toLowerCase().includes(term.toLowerCase()) ||
          symptom.description.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredSymptoms(filtered)
    }
  }

  const handleViewSymptom = (symptom: Patient["symptomsHistory"][0]) => {
    setSelectedSymptom(symptom)
    setIsViewMode(true)
  }

  const handlePrint = () => {
    window.print()
  }

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "severe":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <h2 className="text-xl font-bold text-gray-900">{isViewMode ? "Symptom Details" : "Symptoms History"}</h2>
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
          {isViewMode && selectedSymptom ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Symptom Details</h3>
                  <p className="text-sm text-gray-600">Date: {selectedSymptom.date}</p>
                </div>
                <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Report
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                  <p className="text-gray-700">{selectedSymptom.symptoms}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Severity</h4>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-semibold ${getSeverityBadgeClass(selectedSymptom.severity)}`}
                  >
                    {selectedSymptom.severity}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                  <p className="text-gray-700">{selectedSymptom.duration}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedSymptom.description}</p>
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
                    placeholder="Search symptoms..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 w-full"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Symptom
                </Button>
              </div>

              {filteredSymptoms.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Date</TableHead>
                        <TableHead className="font-semibold text-gray-900">Symptoms</TableHead>
                        <TableHead className="font-semibold text-gray-900">Severity</TableHead>
                        <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Duration</TableHead>
                        <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSymptoms.map((symptom) => (
                        <TableRow key={symptom.id}>
                          <TableCell className="font-medium">{symptom.date}</TableCell>
                          <TableCell className="max-w-xs truncate">{symptom.symptoms}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getSeverityBadgeClass(symptom.severity)}`}
                            >
                              {symptom.severity}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{symptom.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewSymptom(symptom)}
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
                  <p className="text-gray-500">No symptoms history found for this patient.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
