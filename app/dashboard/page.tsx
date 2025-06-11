import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to main page since we handle routing in layout
  redirect("/")
}
