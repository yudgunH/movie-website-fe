import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardLayout } from "@/components/admin/layout"
import type React from "react" // Added import for React

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <SidebarProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
        </body>
        </html>
    )
}

