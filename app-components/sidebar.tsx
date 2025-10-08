import { Store, Star, FileChartColumn, ShoppingBag, LayoutDashboard, ChartNoAxesCombined, ChevronRight} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem, 
  SidebarMenuSubButton
} from "@/app-components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app-components/ui/collapsible"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/vendors-app",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/vendors-app/product",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    url: "/vendors-app/order",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Store",
    url: "/vendors-app/store-info",
    icon: Store,
  },
  {
    title: "Reviews",
    url: "/vendors-app/review",
    icon: Star,
  },
  {
    title: "Reports",
    url: "/vendors-app/report",
    icon: FileChartColumn,
    items: [
      {
        title: "Product Viewed",
        url: "/vendors-app/report/product-viewed",
      },
      {
        title: "Sales",
        url: "/vendors-app/report/sales",
      },
      {
        title: "Returns",
        url: "/vendors-app/report/returns",
      },
      {
        title: "Product Performance",
        url: "/vendors-app/report/product-performance",
      },
      {
        title: "Refund",
        url: "/vendors-app/report/refunds",
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <div className="flex items-center justify-end">
        <SidebarTrigger />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}