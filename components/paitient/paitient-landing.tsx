'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Heart,
  Calendar,
  Phone,
  MapPin,
  Mail,
  Clock,
  Star,
  Truck,
  Brain,
  Bone,
} from 'lucide-react';
import mockData from '@/data/mock-data.json';
import Image from 'next/image';
import AppointmentBookingModal from './appoinment-booking-model';
import Header from '@/components/paitient/headers';

export default function PatientLanding() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const hospitalInfo = mockData.hospitalInfo;

  const serviceIcons = {
    '🚑': Truck,
    '❤️': Heart,
    '🧠': Brain,
    '🦴': Bone,
  };

  return (
    <>
      <Header
        user={user}
        logout={logout}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        setIsBookingModalOpen={setIsBookingModalOpen}
      />
    <div className="min-h-screen bg-gray-50">
      {/* Use the Header component */}
    

      {/* Hero Section */}
   <section
  id="home"
  className="relative text-white"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.8), rgba(30, 64, 175, 0.8)), url('/photo2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{hospitalInfo.tagline}</h1>
        <p className="text-xl text-blue-100 mb-8">{hospitalInfo.description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white cursor-pointer hover:bg-white hover:text-blue-600"
          >
            <Phone className="w-5 h-5 mr-2" />
            Emergency: +91-911
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Image
              src="/doctors/Doctor1.jpg"
              alt="Doctor 1"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <Image
              src="/doctors/Doctor1.jpg"
              alt="Doctor 2"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <Image
              src="/doctors/Doctor1.jpg"
              alt="Doctor 3"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full mx-auto"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Expert Medical Team</h3>
          <p className="text-blue-100">Dedicated to your health and wellbeing</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {hospitalInfo.stats.totalPatients}+
                </div>
                <p className="text-gray-600">Happy Patients</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {hospitalInfo.stats.totalAppointments}+
                </div>
                <p className="text-gray-600">Appointments Completed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                <p className="text-gray-600">Years of Excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Specialties</h2>
            <p className="text-xl text-gray-600">
              Comprehensive healthcare services for all your medical needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hospitalInfo.services.map((service, index) => {
              const IconComponent =
                serviceIcons[service.icon as keyof typeof serviceIcons] || Heart;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Doctors</h2>
            <p className="text-xl text-gray-600">Meet our experienced medical professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Image
                    src="/doctors/Doctor1.jpg"
                    alt={doctor.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {doctor.specialization}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Experience:</strong> {doctor.experience}
                    </p>
                    <p>
                      <strong>Qualification:</strong> {doctor.qualification}
                    </p>
                    <p>
                      <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>123 Medical Center Drive, Healthcare City, HC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>info@alphahospital.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>24/7 Emergency Services Available</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start cursor-pointer"
                  variant="outline"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book an Appointment
                </Button>
                <Button
                  className="w-full justify-start cursor-pointer"
                  variant="outline"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Contact
                </Button>
                <Button
                  className="w-full justify-start cursor-pointer"
                  variant="outline"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{hospitalInfo.name}</span>
            </div>
            <p className="text-sm">© 2024 Alpha Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Appointment Form */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
    </>
  );
}
