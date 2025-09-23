import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'AgriQuest',
  description: 'Sustainable farming through gamified missions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 text-sidebar-foreground">
                <Icons.logo className="size-8" />
                <span className="text-lg font-bold group-data-[collapsible=icon]:hidden">AgriQuest</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
            <SidebarFooter>
              <UserNav />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-col">
            {children}
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
