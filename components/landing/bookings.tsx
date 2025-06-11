'use client';

import React, { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: number | '';
  gender: string;
  date: string;
  time: string;
  symptoms: string;
}

interface AppointmentFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    date: '',
    time: '',
    symptoms: '',
  });
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  // Generate time slots when date changes
  useEffect(() => {
    if (formData.date) {
      const slots = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
      ];
      setTimeSlots(slots);
      setFormData((prev) => ({ ...prev, time: '' }));
    }
  }, [formData.date]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle time slot selection
  const handleTimeSlot = (slot: string) => {
    setFormData((prev) => ({ ...prev, time: slot }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time) {
      setError('Please select a time slot.');
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.age ||
      !formData.gender ||
      !formData.date ||
      !formData.symptoms
    ) {
      setError('Please fill out all fields.');
      return;
    }

    console.log('Appointment Data:', formData);
    alert('Appointment booked successfully!');
    handleClose();
  };

  // Close popup
  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      date: '',
      time: '',
      symptoms: '',
    });
    setError('');
  };

  // Get today's date
  const today = format(startOfToday(), 'yyyy-MM-dd');

  return (
    <>
      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0  flex  items-center justify-center z-50 px-3 transition-opacity duration-300">
          <div
            className="bg-gradient-to-b from-blue-500/90 to-blue-800/90 backdrop-blur-md text-white p-5 rounded-3xl w-full max-w-[280px] relative shadow-2xl transform transition-all duration-300 translate-y-0 sm:max-w-sm animate-slide-in"
            style={{ backgroundBlendMode: 'overlay' }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-xl text-white/80 hover:text-white focus:outline-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-lg font-bold text-center mb-4 sm:text-xl tracking-tight">
              Book Appointment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 animate-fade-in">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold mb-1 text-white/90">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold mb-1 text-white/90">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold mb-1 text-white/90">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-xs font-semibold mb-1 text-white/90">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="150"
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-xs font-semibold mb-1 text-white/90">
                  Gender
                </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-xs font-semibold mb-1 text-white/90">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-white/90">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 gap-1.5 mt-1 sm:grid-cols-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSlot(slot)}
                      className={`p-1.5 rounded-xl text-xs font-medium transition-transform transform hover:scale-105 active:scale-95 ${
                        formData.time === slot
                          ? 'bg-teal-500 text-white shadow-md'
                          : 'bg-white/90 text-blue-800 hover:bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="symptoms"
                  className="block text-xs font-semibold mb-1 text-white/90"
                >
                  Symptoms/Disease
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-white/90 text-blue-800 text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                  rows={3}
                  required
                />
              </div>

              {error && <p className="text-red-300 text-xs text-center font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-500 active:scale-95 transition-transform shadow-md focus:ring-2 focus:ring-teal-400"
              >
                Submit Appointment
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-in;
        }
      `}</style>
    </>
  );
};

export default AppointmentForm;