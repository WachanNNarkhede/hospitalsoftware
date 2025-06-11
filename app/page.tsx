'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import AppointmentForm from '@/components/landing/bookings';

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const links = [
    { name: 'Home', route: '/' },
    { name: 'Login', route: '/auth' },
  ];

  return (
    <div className="font-sans bg-gray-50">
      {/* Navbar */}
      <Header links={links} />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-cover bg-center h-[60vh] relative text-white"
        style={{ backgroundImage: "url('/hospital-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-800 opacity-50"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center z-10 p-6">
            <h2 className="text-4xl font-semibold mb-4">Welcome to Hospital Name</h2>
            <p className="text-lg mb-6">Your health is our priority.</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-green-600 cursor-pointer px-6 py-3 rounded-lg text-white hover:bg-green-500 transition"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <AppointmentForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Emergency Care</h3>
              <p>24/7 emergency services to help you in critical situations.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Specialist Care</h3>
              <p>Experienced doctors offering specialized treatments for various conditions.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Surgical Procedures</h3>
              <p>Advanced technology for performing safe and effective surgeries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-blue-100">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-lg mb-8">
            We have been providing exceptional healthcare services for over 30 years. Our dedicated
            team ensures the best possible care for you and your loved ones.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
              <p>123 Main Street, City, Country</p>
            </div>
            <div className="p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p>+123 456 789</p>
            </div>
            <div className="p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Email Us</h3>
              <p>contact@hospital.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>© 2025 Hospital Name. All rights reserved.</p>
      </footer>
    </div>
  );
}