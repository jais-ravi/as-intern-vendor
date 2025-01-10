"use client";

import { Home, Inbox } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SideBarFooter from "../headerFooter/SideBarFooter";
import React from "react";
import { Button } from "../ui/button";
import { AiOutlineProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";


// Define menu items
const items = [
  {
    title: "Home",
    url: "/dashboard/overview",
    icon: <GoHome size={20}/>,
    isActive: true,
    items: [],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: <AiOutlineProduct size={20} />,
    isActive: true,
    items: [],
  },
  {
    title: "Orders",
    url: "",
    icon: <FiShoppingCart size={18}/>,
    items: [
      { title: "New Orders", url: "" },
      { title: "Pending Orders", url: "" },
      { title: "Completed Orders", url: "" },
    ],
  },
];

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "",
    icon: <FaUserTie/>,
    items: [
      { title: "Home", url: "/admin-dashboard/home" },
      { title: "Users", url: "/admin-dashboard" },
      { title: "Vendors", url: "/admin-dashboard" },
      { title: "All Products", url: "/admin-dashboard" },
      { title: "Orders", url: "/admin-dashboard" },
      { title: "Completed Orders", url: "/admin-dashboard" },
    ],
  },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const SidebarContext = React.createContext(null);

  function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-2xl font-bold py-2">LOGO</h1>
          </SidebarGroupLabel>
          <SidebarMenu>
            {/* Regular menu items */}
            {items.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => {
                        if (!item.items?.length && item.url) {
                          router.push(item.url);
                        }
                      }}
                    >
                      <div>
                      {item.icon}
                      </div>
                      <span>{item.title}</span>
                      {item.items?.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton  asChild >
                              <Link 
                              
                                href={subItem.url}
                                onClick={(event) => {
                                  onClick?.(event);
                                  toggleSidebar();
                                }}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}

            {/* Admin menu (conditionally rendered) */}
            {session?.user?.role === "super-admin" &&
              adminItems.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => {
                          if (!item.items?.length && item.url) {
                            router.push(item.url);
                          }
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        {item.items?.length > 0 && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length > 0 && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
