"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  User,
} from "lucide-react";
import mockData from "@/data/mock-data.json";
import Image from "next/image";

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentBookingModal({
  isOpen,
  onClose,
}: AppointmentBookingModalProps) {
  const { user, isLoading } = useAuth();
  console.log("🚀 ~ user:", user, useAuth());
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [patientData, setPatientData] = useState({
    // Basic Information
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: "",
    age: "",
    gender: user?.gender || "",
    bloodGroup: user?.bloodGroup || "",
    maritalStatus: "",

    // Contact Information
    address: user?.address || "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",
    emergencyContactName: "",

    // Guardian Information (if minor)
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",

    // Medical Information
    symptoms: "",
    previousMedications: "",
    allergies: "",
    medicalHistory: "",
    familyMedicalHistory: "",

    // Physical Measurements
    height: "",
    weight: "",
    bp: "",
    pulse: "",
    temperature: "",
    respiration: "",

    // Additional Information
    referredBy: "",
    insuranceProvider: "",
    insuranceNumber: "",
    additionalNotes: "",
  });

  const departments = mockData.hospitalInfo.services;
  const doctors = mockData.doctors.filter(
    (doctor: { department: string }) => 
      selectedDepartment ? doctor.department === selectedDepartment : true
  );
  const selectedDoctorData = doctors.find((d: { id: string }) => d.id === selectedDoctor);

  const getAvailableTimes = () => {
    if (!selectedDoctorData || !selectedDate) return [];

    const date = new Date(selectedDate);
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    return (
      (selectedDoctorData as { availability: { [key: string]: string[] } })
        .availability[dayName] || []
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newAppointment = {
      id: String(Date.now()),
      patientName: patientData.name,
      patientEmail: patientData.email,
      patientPhone: patientData.phone,
      doctorId: selectedDoctor,
      doctorName: (selectedDoctorData as { name: string })?.name || "",
      department: selectedDepartment,
      date: selectedDate,
      time: selectedTime,
      status: "pending",
      symptoms: patientData.symptoms,
      consultationFee: (selectedDoctorData as { consultationFee: number })?.consultationFee || 0,
      createdAt: new Date().toISOString(),
      patientData: patientData,
    };

    console.log("New appointment:", newAppointment);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetModal = () => {
    setStep(1);
    setSelectedDepartment("");
    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoading) {
          console.log("Loading user...");
        }
        if (!isLoading && user) {
          setPatientData({
            // Basic Information
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            dateOfBirth: "",
            age: "",
            gender: user?.gender || "",
            bloodGroup: user?.bloodGroup || "",
            maritalStatus: "",

            // Contact Information
            address: user?.address || "",
            city: "",
            state: "",
            pincode: "",
            emergencyContact: "",
            emergencyContactName: "",

            // Guardian Information (if minor)
            guardianName: "",
            guardianRelation: "",
            guardianPhone: "",

            // Medical Information
            symptoms: "",
            previousMedications: "",
            allergies: "",
            medicalHistory: "",
            familyMedicalHistory: "",

            // Physical Measurements
            height: "",
            weight: "",
            bp: "",
            pulse: "",
            temperature: "",
            respiration: "",

            // Additional Information
            referredBy: "",
            insuranceProvider: "",
            insuranceNumber: "",
            additionalNotes: "",
          });
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    fetchUserData();
  }, [isLoading, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-blue-700">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Appointment Booked Successfully!
            </h3>
            <p className="text-white mb-6">
              Your appointment has been submitted and is pending confirmation.
              You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-medium text-gray-900 mb-2">
                Appointment Details:
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Department:</strong> {selectedDepartment}
                </p>
                <p>
                  <strong>Doctor:</strong> {(selectedDoctorData as { name: string })?.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Fee:</strong> ₹{(selectedDoctorData as { consultationFee: number })?.consultationFee}
                </p>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full cursor-pointer bg-blue-400">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto thin-scrollbar bg-blue-500">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Book Appointment</span>
          </DialogTitle>
          <DialogDescription>
            Step {step} of 5:{" "}
            {step === 1
              ? "Select Department"
              : step === 2
              ? "Select Doctor"
              : step === 3
              ? "Choose Date & Time"
              : step === 4
              ? "Patient Information"
              : "Review & Confirm"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i}
                </div>
                {i < 5 && (
                  <div
                    className={`w-12 h-1 ${
                      i < step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Department Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Select a Department
              </h3>
              <div className="space-y-4">
                {departments.map((dept: { title: string; description: string; icon: string }) => (
                  <Card
                    key={dept.title}
                    className={`cursor-pointer transition-all duration-300 ease-in-out ${
                      selectedDepartment === dept.title
                        ? "ring-4 ring-green-500 bg-green-500"
                        : "hover:bg-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedDepartment(dept.title)}
                  >
                    <CardContent className="p-4 rounded-lg shadow-md">
                      <div className="flex items-center space-x-6">
                        <span className="text-2xl">{dept.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-900">
                            {dept.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Doctor Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Select a Doctor
              </h3>
              <div className="space-y-4">
                {doctors.length > 0 ? (
                  doctors.map((doctor: { id: string; name: string; specialization: string; experience: string; qualification: string; consultationFee: number; image: string }) => (
                    <Card
                      key={doctor.id}
                      className={`cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedDoctor === doctor.id
                          ? "ring-4 ring-green-500 bg-green-500"
                          : "hover:bg-gray-200 bg-white"
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-4 rounded-lg shadow-md">
                        <div className="flex items-center space-x-6">
                          <Image
                            src={"/doctors/Doctor1.jpg"}
                            alt={doctor.name}
                            height={64}
                            width={64}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900">
                              {doctor.name}
                            </h4>
                            <p className="text-blue-600 text-sm">
                              {doctor.specialization}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {doctor.experience} years • {doctor.qualification}
                            </p>
                            <p className="text-green-600 font-medium text-sm">
                              ₹{doctor.consultationFee} consultation fee
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-600">No doctors available for the selected department.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Choose Date & Time</h3>

              {selectedDoctorData && (
                <Card className="bg-white border-green-400">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/doctors/Doctor1.jpg"}
                        alt={(selectedDoctorData as { name: string }).name}
                        width={100}
                        height={100}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">
                          {(selectedDoctorData as { name: string }).name}
                        </h4>
                        <p className="text-sm text-blue-600">
                          {(selectedDoctorData as { specialization: string }).specialization}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {(selectedDoctorData as { experience: string }).experience} •{" "}
                          {(selectedDoctorData as { qualification: string }).qualification}
                        </p>
                        <p className="text-green-600 font-medium text-sm">
                          ₹{(selectedDoctorData as { consultationFee: number }).consultationFee} consultation fee
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="appointmentDate"
                    className="block text-gray-700"
                  >
                    Select Date
                  </label>
                  <input
                    id="appointmentDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 bg-white cursor-pointer py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="appointmentTime"
                    className="block text-gray-700"
                  >
                    Select Time
                  </label>
                  <select
                    id="appointmentTime"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedDate}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      !selectedDate
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-white"
                    }`}
                  >
                    <option value="" disabled>
                      Select a time (available slots)
                    </option>
                    {getAvailableTimes().map((time: string) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete Patient Information */}
          {step === 4 && (
            <div className="space-y-6 overflow-hidden">
              <h3 className="text-lg font-medium">
                Complete Patient Information
              </h3>

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        className="bg-white"
                        value={patientData.name}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        className="bg-white"
                        id="email"
                        type="email"
                        value={patientData.email}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        className="bg-white"
                        id="phone"
                        value={patientData.phone}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        className="bg-white"
                        id="dateOfBirth"
                        type="date"
                        value={patientData.dateOfBirth}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        className="bg-white"
                        value={patientData.age}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            age: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={patientData.gender}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            gender: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <select
                        value={patientData.bloodGroup}
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            bloodGroup: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select blood group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <select
                        value={patientData.maritalStatus}
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            maritalStatus: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select marital status
                        </option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={patientData.address}
                      className="bg-white"
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        className="bg-white"
                        value={patientData.city}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        className="bg-white"
                        value={patientData.state}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        className="bg-white"
                        value={patientData.pincode}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">
                        Emergency Contact Name
                      </Label>
                      <Input
                        id="emergencyContactName"
                        className="bg-white"
                        value={patientData.emergencyContactName}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            emergencyContactName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">
                        Emergency Contact Number
                      </Label>
                      <Input
                        className="bg-white"
                        id="emergencyContact"
                        value={patientData.emergencyContact}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            emergencyContact: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guardian Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Guardian Information (if applicable)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Guardian Name</Label>
                      <Input
                        className="bg-white"
                        id="guardianName"
                        value={patientData.guardianName}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            guardianName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianRelation">Relation</Label>
                      <Input
                        className="bg-white"
                        id="guardianRelation"
                        value={patientData.guardianRelation}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            guardianRelation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone">Guardian Phone</Label>
                      <Input
                        className="bg-white"
                        id="guardianPhone"
                        value={patientData.guardianPhone}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            guardianPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">
                      Symptoms / Reason for Visit *
                    </Label>
                    <Textarea
                      id="symptoms"
                      className="bg-white"
                      placeholder="Describe your symptoms or reason for the appointment"
                      value={patientData.symptoms}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          symptoms: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Input
                      className="bg-white"
                      id="allergies"
                      placeholder="Any known allergies"
                      value={patientData.allergies}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          allergies: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousMedications">
                      Current Medications
                    </Label>
                    <Textarea
                      className="bg-white"
                      id="previousMedications"
                      placeholder="List any medications you are currently taking"
                      value={patientData.previousMedications}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          previousMedications: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      className="bg-white"
                      id="medicalHistory"
                      placeholder="Previous medical conditions, surgeries, etc."
                      value={patientData.medicalHistory}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          medicalHistory: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="familyMedicalHistory">
                      Family Medical History
                    </Label>
                    <Textarea
                      className="bg-white"
                      id="familyMedicalHistory"
                      placeholder="Family history of diseases"
                      value={patientData.familyMedicalHistory}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          familyMedicalHistory: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Physical Measurements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Physical Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        className="bg-white"
                        value={patientData.height}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            height: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        className="bg-white"
                        id="weight"
                        value={patientData.weight}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            weight: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bp">Blood Pressure</Label>
                      <Input
                        id="bp"
                        className="bg-white"
                        placeholder="120/80"
                        value={patientData.bp}
                        onChange={(e) =>
                          setPatientData({ ...patientData, bp: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulse">Pulse (bpm)</Label>
                      <Input
                        id="pulse"
                        className="bg-white"
                        value={patientData.pulse}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            pulse: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        className="bg-white"
                        id="temperature"
                        value={patientData.temperature}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            temperature: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="respiration">Respiration Rate</Label>
                      <Input
                        className="bg-white"
                        id="respiration"
                        value={patientData.respiration}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            respiration: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="referredBy">Referred By</Label>
                      <Input
                        className="bg-white"
                        id="referredBy"
                        value={patientData.referredBy}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            referredBy: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">
                        Insurance Provider
                      </Label>
                      <Input
                        id="insuranceProvider"
                        className="bg-white"
                        value={patientData.insuranceProvider}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            insuranceProvider: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Insurance Number</Label>
                    <Input
                      className="bg-white"
                      id="insuranceNumber"
                      value={patientData.insuranceNumber}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          insuranceNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      className="bg-white"
                      id="additionalNotes"
                      placeholder="Any additional information"
                      value={patientData.additionalNotes}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          additionalNotes: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review & Confirm</h3>

              {/* Appointment Summary */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">{selectedDepartment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doctor:</span>
                      <span className="font-medium">
                        {(selectedDoctorData as { name: string })?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consultation Fee:</span>
                      <span className="font-medium text-green-600">
                        ₹{(selectedDoctorData as { consultationFee: number })?.consultationFee}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Summary */}
              <Card className="bg-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Patient Information Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Name:</strong> {patientData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {patientData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {patientData.phone}
                      </p>
                      <p>
                        <strong>Age:</strong> {patientData.age}
                      </p>
                      <p>
                        <strong>Gender:</strong> {patientData.gender}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Blood Group:</strong> {patientData.bloodGroup}
                      </p>
                      <p>
                        <strong>Allergies:</strong>{" "}
                        {patientData.allergies || "None"}
                      </p>
                      <p>
                        <strong>Emergency Contact:</strong>{" "}
                        {patientData.emergencyContact}
                      </p>
                      <p>
                        <strong>Symptoms:</strong> {patientData.symptoms}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              className="bg-red-500 cursor-pointer"
              onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step > 1 ? "Previous" : "Cancel"}
            </Button>

            {step < 5 ? (
              <Button
                className="cursor-pointer bg-blue-600"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedDepartment) ||
                  (step === 2 && !selectedDoctor) ||
                  (step === 3 && (!selectedDate || !selectedTime)) ||
                  (step === 4 &&
                    (!patientData.name ||
                      !patientData.email ||
                      !patientData.phone ||
                      !patientData.symptoms))
                }
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}