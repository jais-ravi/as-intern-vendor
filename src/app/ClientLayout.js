"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar/app-sidebar";
import Header from "@/components/headerFooter/Header";
import { Separator } from "@/components/ui/separator";

export default function ClientLayout({ children }) {
  const pathname = usePathname();


  const includedRoutes = [
    "/dashboard/add-product",
    "/dashboard/edit-product",
    "/dashboard/overview",
    "/dashboard/products",
    "/dashboard/orders",
    "/admin-dashboard"
  ];


  const isIncludedRoute = includedRoutes.includes(pathname) ||
    includedRoutes.some(route => pathname.startsWith(route));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {isIncludedRoute ? (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <Separator />
              <div className="w-full ">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        ) : (
          <div className="w-full">{children}</div>
        )}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
