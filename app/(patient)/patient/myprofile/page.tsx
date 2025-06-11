
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AppointmentBookingModal from '@/components/paitient/appoinment-booking-model';
import Header from '@/components/paitient/headers';
import mockData from '@/data/mock-data.json';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  patientId?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  allergies?: string;
}

const mockUser: User = {
  id: 'U001',
  email: 'john.smith@example.com',
  name: 'John Smith',
  role: 'patient',
  patientId: 'PAT001',
  phone: '123-456-7890',
  address: '123 Main St, City, Country',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  emergencyContact: 'Jane Smith (987-654-3210)',
  bloodGroup: 'O+',
  allergies: 'Peanuts',
};

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<User>(mockUser);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      // Optionally fetch user profile from mockData or API
      const users = Array.isArray(mockData.users) ? mockData.users as User[] : [];
      const currentUser = users.find((u) => u.id === user.id);
      if (currentUser) {
        setProfile(currentUser);
      }
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would update the backend
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header
        user={user}
        logout={logout}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        setIsBookingModalOpen={setIsBookingModalOpen}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-md text-white shadow-xl rounded-3xl p-6">
            <h1 className="text-3xl font-bold flex items-center">
              <User className="w-8 h-8 mr-3" />
              My Profile
            </h1>
            <p className="mt-2 text-lg">Welcome, {user.name}! View and edit your profile below.</p>
          </div>

          <Card className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-3xl">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">Profile Details</h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.phone || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={profile.address || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.dateOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="gender"
                        value={profile.gender || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.gender || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContact"
                        value={profile.emergencyContact || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.emergencyContact || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="bloodGroup"
                        value={profile.bloodGroup || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bloodGroup || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Allergies</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="allergies"
                        value={profile.allergies || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full p-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.allergies || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AppointmentBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </div>
    </>
  );
};

export default ProfilePage;
