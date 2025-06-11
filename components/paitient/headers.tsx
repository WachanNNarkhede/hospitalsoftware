'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, ChevronDown, User as UserIcon, Calendar, Clock, FileText, Activity, LogOut } from 'lucide-react';
import mockData from '@/data/mock-data.json';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@/lib/auth';
import Image from 'next/image';

// Define HeaderProps interface with all required props
export interface HeaderProps {
  user: User | null; // Explicitly define user prop
  logout: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  setIsBookingModalOpen: Dispatch<SetStateAction<boolean>>;
}

// Use the interface directly in the component definition
export default function Header({
  user,
  logout,
  isDropdownOpen,
  setIsDropdownOpen,
  setIsBookingModalOpen,
}: HeaderProps) {
  const router = useRouter();
  const hospitalName = mockData.hospitalInfo?.name || 'Hospital Name';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white w-full shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex  items-center space-x-3">
            <div className="w-10 h-10 mr- bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6  text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{hospitalName}</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/patient" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              About Us
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50 hidden sm:flex"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 focus:outline-none"
                aria-label="Profile menu"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* Replaced <img> with Next.js <Image /> for optimization */}
                <Image
                  src={user?.name ? '/doctors/Doctor1.jpg' : '/placeholder-profile.jpg'}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-600"
                  priority
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-dropdown">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/patient/myprofile');
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsBookingModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/patient/appointmenthistory');
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Appointment History
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/patient/medicalreports');
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Reports
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/patient/visitshistory');
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Visits
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
