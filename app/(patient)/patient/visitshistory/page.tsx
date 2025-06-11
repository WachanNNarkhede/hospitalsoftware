'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAuth, User } from '@/lib/auth';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Activity, Search, ChevronUp, ChevronDown, Eye, File, Edit } from 'lucide-react';
import { format, subDays } from 'date-fns';
import mockData from '@/data/mock-data.json';
import { useRouter } from 'next/navigation';
import AppointmentBookingModal from '@/components/paitient/appoinment-booking-model';
import Header from '@/components/paitient/headers';

interface Visit {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'rejected';
  symptoms: string;
  diagnosis: string;
  prescription: string;
  prescriptionFile?: string;
  consultationFee: number;
  notes?: string;
}

interface SortConfig {
  key: keyof Visit;
  direction: 'asc' | 'desc';
}

const sampleVisits: Visit[] = [
  {
    id: 'V001',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Emma Shelton',
    date: '2024-10-15',
    time: '10:00 AM',
    status: 'completed',
    symptoms: 'Fever and cough',
    diagnosis: 'Common cold',
    prescription: 'Paracetamol 500mg, rest',
    prescriptionFile: '/mock-prescription.pdf',
    consultationFee: 500,
    notes: 'Follow up in 5 days if symptoms persist',
  },
  {
    id: 'V002',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorId: '2',
    doctorName: 'Dr. James Wilson',
    date: '2024-09-20',
    time: '01:30 PM',
    status: 'completed',
    symptoms: 'Back pain',
    diagnosis: 'Muscle strain',
    prescription: 'Ibuprofen 400mg, physiotherapy',
    prescriptionFile: '/mock-prescription2.jpg',
    consultationFee: 600,
    notes: 'Avoid heavy lifting',
  },
];

const VisitsPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isEditingPrescription, setIsEditingPrescription] = useState(false);
  const [editedPrescription, setEditedPrescription] = useState<string>('');
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  const visits: Visit[] = useMemo(() => {
    const users = Array.isArray(mockData.users) ? mockData.users as unknown as User[] : [];
    const patient = users.find((u) => u.id === user?.id);
    if (!patient || patient.role !== 'patient' || !patient.patientId) return [];
    return sampleVisits.filter((visit) => visit.patientId === patient.patientId);
  }, [user]);

  const stats = useMemo(() => {
    return {
      total: visits.length,
      upcoming: visits.filter((visit) => visit.status === 'upcoming').length,
      completed: visits.filter((visit) => visit.status === 'completed').length,
      rejected: visits.filter((visit) => visit.status === 'rejected').length,
    };
  }, [visits]);

  const filteredVisits = useMemo(() => {
    let filtered = visits;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((visit) => visit.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      if (dateFilter === 'last7') {
        const last7Days = subDays(today, 7);
        filtered = filtered.filter((visit) => new Date(visit.date) >= last7Days);
      } else if (dateFilter === 'last30') {
        const last30Days = subDays(today, 30);
        filtered = filtered.filter((visit) => new Date(visit.date) >= last30Days);
      }
    }

    filtered = filtered.filter(
      (visit) =>
        visit.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visit.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  }, [visits, searchTerm, statusFilter, dateFilter]);

  const sortedVisits = useMemo(() => {
    const sortable = [...filteredVisits];
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
  }, [filteredVisits, sortConfig]);

  const paginatedVisits = sortedVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Visit) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(sortedVisits.length / itemsPerPage);

  const handleEditPrescription = (visit: Visit) => {
    setIsEditingPrescription(true);
    setEditedPrescription(visit.prescription);
  };

  const handleSavePrescription = (visitId: string) => {
    const updatedVisits = visits.map((visit) =>
      visit.id === visitId ? { ...visit, prescription: editedPrescription } : visit
    );
    sampleVisits.splice(0, sampleVisits.length, ...updatedVisits);
    setIsEditingPrescription(false);
  };

  if (!user) {
    return null;
  }

  const isDoctor = user.role === 'doctor';

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
              <Activity className="w-8 h-8 mr-3" />
              Visits
            </h1>
            <p className="mt-2 text-lg">Welcome, {user.name}! View your visit history below.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-800">Total Visits</CardTitle>
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
                <CardTitle className="text-lg font-semibold text-blue-800">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </CardContent>
            </Card>
          </div>

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
                      <SelectItem value="upcoming">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
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
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 text-white border-b border-gray-200">
                      <TableHead className="text-white font-semibold">Patient ID</TableHead>
                      <TableHead className="text-white font-semibold">ID</TableHead>
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
                      <TableHead className="text-white font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedVisits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">
                          No visits found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedVisits.map((visit, index) => (
                        <TableRow
                          key={visit.id}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors border-b border-gray-200`}
                        >
                          <TableCell className="text-gray-800">{visit.patientId}</TableCell>
                          <TableCell className="text-gray-800">{visit.id}</TableCell>
                          <TableCell className="text-gray-800">{visit.doctorName}</TableCell>
                          <TableCell className="text-gray-800">
                            {format(new Date(visit.date), 'MMM dd, yyyy')} {visit.time}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                visit.status === 'completed'
                                  ? 'default'
                                  : visit.status === 'upcoming'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                              className={
                                visit.status === 'completed'
                                  ? 'bg-green-600 text-white'
                                  : visit.status === 'upcoming'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-red-600 text-white'
                              }
                            >
                              {visit.status === 'completed' ? 'Completed' : visit.status === 'upcoming' ? 'Pending' : 'Rejected'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-800">₹{visit.consultationFee}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedVisit(visit)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </TableCell>
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
        </div>

        <AppointmentBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />

        {selectedVisit && (
          <Dialog open={!!selectedVisit} onOpenChange={() => {
            setSelectedVisit(null);
            setIsEditingPrescription(false);
          }}>
            <DialogContent className="sm:max-w-xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-0">
              <div className="p-4">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-blue-600" />
                    Visit Report - {selectedVisit.id}
                  </DialogTitle>
                  <p className="text-xs text-gray-500">Generated on {format(new Date(), 'MMM dd, yyyy, hh:mm a')}</p>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">Patient Info</h3>
                      <div className="text-xs space-y-1">
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Patient ID:</p>
                          <p className="text-gray-900">{selectedVisit.patientId}</p>
                        </div>
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Name:</p>
                          <p className="text-gray-900">{selectedVisit.patientName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">Medical Details</h3>
                      <div className="text-xs space-y-1">
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Symptoms:</p>
                          <p className="text-gray-900">{selectedVisit.symptoms}</p>
                        </div>
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Diagnosis:</p>
                          <p className="text-gray-900">{selectedVisit.diagnosis}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">Visit Details</h3>
                      <div className="text-xs space-y-1">
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Doctor:</p>
                          <p className="text-gray-900">{selectedVisit.doctorName}</p>
                        </div>
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Date & Time:</p>
                          <p className="text-gray-900">
                            {format(new Date(selectedVisit.date), 'MMM dd, yyyy')} {selectedVisit.time}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Status:</p>
                          <p className="text-gray-900 capitalize">{selectedVisit.status}</p>
                        </div>
                        <div className="flex">
                          <p className="w-28 text-gray-600 font-medium">Fee:</p>
                          <p className="text-gray-900">₹{selectedVisit.consultationFee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">Notes</h3>
                      <p className="text-xs text-gray-900">{selectedVisit.notes || 'No additional notes.'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 shadow-sm mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-blue-800">Prescription</h3>
                    {isDoctor && !isEditingPrescription && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPrescription(selectedVisit)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                  {isEditingPrescription && isDoctor ? (
                    <div className="space-y-2">
                      <textarea
                        value={editedPrescription}
                        onChange={(e) => setEditedPrescription(e.target.value)}
                        className="w-full p-2 border rounded-lg text-xs text-gray-900 focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter prescription details..."
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingPrescription(false)}
                          className="text-gray-600 border-gray-300 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSavePrescription(selectedVisit.id)}
                          className="bg-blue-600 text-white hover:bg-blue-700 text-xs"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Tabs defaultValue="text" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
                        <TabsTrigger value="text" className="rounded-md text-xs">Text</TabsTrigger>
                        <TabsTrigger value="file" className="rounded-md text-xs">PDF/Photo</TabsTrigger>
                      </TabsList>
                      <TabsContent value="text" className="mt-2">
                        <p className="text-xs text-gray-900">{selectedVisit.prescription}</p>
                      </TabsContent>
                      <TabsContent value="file" className="mt-2">
                        {selectedVisit.prescriptionFile ? (
                          <div className="flex items-center space-x-2">
                            <File className="w-4 h-4 text-blue-600" />
                            <a
                              href={selectedVisit.prescriptionFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View Prescription File
                            </a>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">No file attached.</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <DialogClose asChild>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 text-sm">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default VisitsPage;
