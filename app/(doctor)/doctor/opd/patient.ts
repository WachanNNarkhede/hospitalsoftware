export interface Patient {
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
  city: string
  referredBy: string
  doctorName: string
  temperature: string
  opdDate: string
  opdNo: string
  briefHistory?: string
  diagnosis?: string
  medication?: string
}