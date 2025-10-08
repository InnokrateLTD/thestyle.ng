import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import AdminHeader from "@/components/admin-header"
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
