"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import mockData from "@/data/mock-paitents.json"

interface Patient {
  id: string
  patientId: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  bloodGroup: string
  allergies: string
  address: string
  emergencyContact: string
  guardianName: string
  maritalStatus: string
  height: string
  weight: string
  medicalHistory: string
}

interface PatientSearchProps {
  onAddNewClick: () => void
  onSearch: (term: string) => void
  setSelectedPatient: (patient: Patient | null) => void
}

export default function PatientSearch({ onAddNewClick, onSearch, setSelectedPatient }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Transform mockData.patients to ensure type safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patients: Patient[] = mockData.patients.map((p: any) => ({
    id: p.id || "",
    patientId: p.patientId || "",
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
  }))

  // Handle search
  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const results = patients.filter(
        (patient: Patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)
      onSearch(searchTerm)
      setIsSearching(false)
    }, 300)
  }

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowResults(false)
    setSearchTerm("")
    onSearch("")
  }

  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Sync search term with parent
  useEffect(() => {
    if (!isSearching) {
      const results = patients.filter(
        (patient: Patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(searchTerm.length > 0)
      onSearch(searchTerm)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, isSearching, onSearch])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Patient Management</h2>
        <Button onClick={onAddNewClick} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Patient
        </Button>
      </div>

      {/* Search Bar */}
      <div ref={searchRef} className="relative mb-6">
        <div className="flex">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter Patient Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="ml-2 rounded-r-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-600">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.patientId}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No patients found. Try a different search or add a new patient.
                <Button onClick={onAddNewClick} variant="outline" className="mt-2">
                  Add New Patient
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}