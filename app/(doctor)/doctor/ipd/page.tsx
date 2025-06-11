import DashboardLayout from "@/components/layout/dashboard-layout"
import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import { Button } from "@/components/ui/button"
import { Plus, UserMinus, Building2, BarChart3 } from "lucide-react"
import IpdManagement from "@/components/ipdcomp/ipd-managment"

export default function IpdPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="IPD - Inpatient Department"
        description="Manage admitted patients, bed allocation, and inpatient care"
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200/40">
              <Building2 className="w-4 h-4" />
              <span>Bed Status</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200/40">
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200/40">
              <UserMinus className="w-4 h-4" />
              <span>Discharged</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center cursor-pointer  space-x-2">
              <Plus className="w-4 h-4" />
              <span>Admit Patient</span>
            </Button>
          </>
        }
      />

      <ContentWrapper>
        <IpdManagement />
      </ContentWrapper>
    </DashboardLayout>
  )
}
