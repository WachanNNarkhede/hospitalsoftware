'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Search, ChevronUp, ChevronDown, Download, RefreshCw, Calendar, Phone } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import AppointmentBookingModal from '@/components/paitient/appoinment-booking-model';
import Header from '@/components/paitient/headers';
import mockData from '@/data/mock-data.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  consultationFee: number;
}

interface SortConfig {
  key: keyof Appointment;
  direction: 'asc' | 'desc';
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  patientId?: string;
}

const sampleAppointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Emma Shelton',
    date: '2024-10-15',
    time: '10:00 AM',
    status: 'completed',
    consultationFee: 500,
  },
  {
    id: 'A002',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorId: '2',
    doctorName: 'Dr. Michael Brown',
    date: '2024-11-01',
    time: '01:30 PM',
    status: 'upcoming',
    consultationFee: 600,
  },
];

const AppointmentHistoryPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const appointments: Appointment[] = useMemo(() => {
    const users = Array.isArray(mockData.users) ? mockData.users as User[] : [];
    const patient = users.find((u) => u.id === user?.id);
    if (!patient) return [];
    return sampleAppointments.filter((appointment) => appointment.patientId === patient.patientId);
  }, [user]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      upcoming: appointments.filter((appt) => appt.status === 'upcoming').length,
      completed: appointments.filter((appt) => appt.status === 'completed').length,
      cancelled: appointments.filter((appt) => appt.status === 'cancelled').length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    let filtered = appointments;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      if (dateFilter === 'last7') {
        const last7Days = subDays(today, 7);
        filtered = filtered.filter((appointment) => new Date(appointment.date) >= last7Days);
      } else if (dateFilter === 'last30') {
        const last30Days = subDays(today, 30);
        filtered = filtered.filter((appointment) => new Date(appointment.date) >= last30Days);
      }
    }

    filtered = filtered.filter(
      (appointment) =>
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const sortedAppointments = useMemo(() => {
    const sortable = [...filteredAppointments];
    sortable.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortable;
  }, [filteredAppointments, sortConfig]);

  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Appointment) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Appointment History', 20, 10);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).autoTable({
      head: [['ID', 'Doctor Name', 'Date', 'Time', 'Status', 'Fees']],
      body: sortedAppointments.map((appt) => [
        appt.id,
        appt.doctorName,
        appt.date,
        appt.time,
        appt.status,
        `₹${appt.consultationFee}`,
      ]),
      startY: 20,
    });
    doc.save(`appointment_history_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setSortConfig({ key: 'date', direction: 'desc' });
    setCurrentPage(1);
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
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-md text-white shadow-xl rounded-3xl p-6">
            <h1 className="text-3xl font-bold flex items-center">
              <Clock className="w-8 h-8 mr-3" />
              Appointment History
            </h1>
            <p className="mt-2 text-lg">Welcome, {user.name}! View your appointment history below.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-800">Total Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-800">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{stats.upcoming}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-800">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-800">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Card with Table */}
          <Card className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-3xl">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by doctor or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-100 text-gray-800 rounded-xl shadow-sm border-none"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40 bg-gray-100 text-gray-800 rounded-xl border-none">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-40 bg-gray-100 text-gray-800 rounded-xl border-none">
                      <SelectValue placeholder="Filter by Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="last7">Last 7 Days</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportPDF}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>

              {/* Table (Restored to Original State) */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 text-white border-b border-gray-200">
                      <TableHead className="text-white font-semibold">Appointment ID</TableHead>
                      <TableHead
                        className="text-white font-semibold cursor-pointer"
                        onClick={() => handleSort('doctorName')}
                      >
                        Doctor Name {sortConfig.key === 'doctorName' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </TableHead>
                      <TableHead
                        className="text-white font-semibold cursor-pointer"
                        onClick={() => handleSort('date')}
                      >
                        Date Time {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </TableHead>
                      <TableHead
                        className="text-white font-semibold cursor-pointer"
                        onClick={() => handleSort('status')}
                      >
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </TableHead>
                      <TableHead className="text-white font-semibold">Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedAppointments.map((appointment, index) => (
                        <TableRow
                          key={appointment.id}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors border-b border-gray-200`}
                        >
                          <TableCell className="text-gray-800">{appointment.id}</TableCell>
                          <TableCell className="text-gray-800">{appointment.doctorName}</TableCell>
                          <TableCell className="text-gray-800">
                            {format(new Date(appointment.date), 'MMM dd, yyyy')} {appointment.time}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === 'completed'
                                  ? 'default'
                                  : appointment.status === 'upcoming'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                              className={
                                appointment.status === 'completed'
                                  ? 'bg-green-600 text-white'
                                  : appointment.status === 'upcoming'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-red-600 text-white'
                              }
                            >
                              {appointment.status === 'completed'
                                ? 'Completed'
                                : appointment.status === 'upcoming'
                                ? 'Upcoming'
                                : 'Cancelled'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-800">₹{appointment.consultationFee}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="bg-blue-600 text-white hover:bg-blue-500 border-none"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="bg-blue-600 text-white hover:bg-blue-500 border-none"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Section */}
          <Card className="bg-white shadow-xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
                <Button
                  onClick={() => router.push('/contact')}
                  className="bg-gray-600 text-white hover:bg-gray-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
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

export default AppointmentHistoryPage;
