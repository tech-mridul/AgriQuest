
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogIn, LogOut, Settings, User } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// This is a placeholder. In a real app, you'd get this from your auth state.
const isAuthenticated = true; 

export function UserNav() {
    const userAvatar = placeholderImages.placeholderImages.find(img => img.id === 'user-avatar-main');
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/login');
        } catch (error) {
             toast({
                variant: 'destructive',
                title: "Logout Failed",
                description: "Could not log you out. Please try again.",
            });
            console.error("Logout error:", error);
        }
    };

  if (!isAuthenticated) {
    return (
        <div className="p-2 w-full group-data-[collapsible=icon]:p-0">
             <Button asChild className="w-full justify-start group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
                <Link href="/login">
                    <LogIn className="mr-2"/>
                    <span className="group-data-[collapsible=icon]:hidden">Log In</span>
                </Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="group-data-[collapsible=icon]:p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-auto w-full justify-start p-2 text-left group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="ml-2 min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">John Smith</p>
              <p className="truncate text-xs text-sidebar-foreground/70">john.smith@example.com</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Smith</p>
              <p className="text-xs leading-none text-muted-foreground">
                john.smith@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
