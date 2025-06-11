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
import { Card, CardContent,  } from '@/components/ui/card';
import { FileText, Search, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import AppointmentBookingModal from '@/components/paitient/appoinment-booking-model';
import Header from '@/components/paitient/headers';
import mockData from '@/data/mock-data.json';

interface Report {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  reportType: string;
  description: string;
  fileUrl?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  patientId?: string;
}

interface SortConfig {
  key: keyof Report;
  direction: 'asc' | 'desc';
}

const sampleReports: Report[] = [
  {
    id: 'R001',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorName: 'Dr. Emma Shelton',
    date: '2024-10-15',
    reportType: 'Blood Test',
    description: 'Complete blood count results',
    fileUrl: '/mock-report1.pdf',
  },
  {
    id: 'R002',
    patientId: 'PAT001',
    patientName: 'John Smith',
    doctorName: 'Dr. Michael Brown',
    date: '2024-09-20',
    reportType: 'X-Ray',
    description: 'Chest X-Ray for back pain',
    fileUrl: '/mock-report2.pdf',
  },
];

const ReportsPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const reports: Report[] = useMemo(() => {
    const users = Array.isArray(mockData.users) ? mockData.users as User[] : [];
    const patient = users.find((u) => u.id === user?.id);
    if (!patient) return [];
    return sampleReports.filter((report) => report.patientId === patient.patientId);
  }, [user]);

  const filteredReports = useMemo(() => {
    let filtered = reports;

    filtered = filtered.filter(
      (report) =>
        report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  }, [reports, searchTerm]);

  const sortedReports = useMemo(() => {
    const sortable = [...filteredReports];
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
  }, [filteredReports, sortConfig]);

  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Report) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);

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
              <FileText className="w-8 h-8 mr-3" />
              Medical Reports
            </h1>
            <p className="mt-2 text-lg">Welcome, {user.name}! View your medical reports below.</p>
          </div>

          <Card className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-3xl">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by doctor or report type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-100 text-gray-800 rounded-xl shadow-sm border-none"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 text-white border-b border-gray-200">
                      <TableHead className="text-white font-semibold">Report ID</TableHead>
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
                        Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </TableHead>
                      <TableHead
                        className="text-white font-semibold cursor-pointer"
                        onClick={() => handleSort('reportType')}
                      >
                        Report Type {sortConfig.key === 'reportType' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </TableHead>
                      <TableHead className="text-white font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedReports.map((report, index) => (
                        <TableRow
                          key={report.id}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors border-b border-gray-200`}
                        >
                          <TableCell className="text-gray-800">{report.id}</TableCell>
                          <TableCell className="text-gray-800">{report.doctorName}</TableCell>
                          <TableCell className="text-gray-800">
                            {format(new Date(report.date), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell className="text-gray-800">{report.reportType}</TableCell>
                          <TableCell>
                            {report.fileUrl ? (
                              <a
                                href={report.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Report
                              </a>
                            ) : (
                              <span className="text-gray-500">No file available</span>
                            )}
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
      </div>
    </>
  );
};

export default ReportsPage;
