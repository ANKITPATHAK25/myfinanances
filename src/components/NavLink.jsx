"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(({ className, activeClassName, pendingClassName, to, href, ...props }, ref) => {
    const pathname = usePathname();
    const dest = to || href || "#";
    const isActive = pathname === dest;
    return (<Link ref={ref} href={dest} className={cn(className, isActive && activeClassName)} {...props}/>);
});
NavLink.displayName = "NavLink";
export { NavLink };
