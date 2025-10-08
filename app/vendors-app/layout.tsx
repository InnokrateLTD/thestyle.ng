import { SidebarProvider } from "@/app-components/ui/sidebar"
import { AppSidebar } from "@/app-components/sidebar"
import AdminHeader from "@/app-components/admin-header"
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
    <AdminHeader/>
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SidebarProvider defaultOpen={true} className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-4">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
    </div>
    
  )
}
