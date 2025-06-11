import DashboardLayout from "@/components/layout/dashboard-layout"
import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import AppointmentRequests from "@/components/receptionist/appointment-request"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Download } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Appointment Requests"
        description="Manage and approve patient appointment requests"
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Appointment</span>
            </Button>
          </>
        }
      />

      <ContentWrapper>
        <AppointmentRequests />
      </ContentWrapper>
    </DashboardLayout>
  )
}
