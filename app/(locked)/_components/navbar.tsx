"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/app/auth/_components/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
   <nav className="bg-secondary flex flex-col md:flex-row md:justify-between justify-center gap-y-3 items-center p-4 w-full rounded-xl md:w-[600px] shadow-sm">
    <div className="flex gap-x-2">
     <Button
      asChild
      variant={pathname === '/server' ? 'default' : 'outline'}
     >
      <Link href="/server">Server</Link>
     </Button>
     <Button
      asChild
      variant={pathname === '/client' ? 'default' : 'outline'}
     >
      <Link href="/client">Client</Link>
     </Button>
     <Button
      asChild
      variant={pathname === '/admin' ? 'default' : 'outline'}
     >
      <Link href="/admin">Admin</Link>
     </Button>
     <Button
      asChild
      variant={pathname === '/settings' ? 'default' : 'outline'}
     >
      <Link href="/settings">Settings</Link>
     </Button>
    </div>
    <UserButton />
   </nav>
  );
};