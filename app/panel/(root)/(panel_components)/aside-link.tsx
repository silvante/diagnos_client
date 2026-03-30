"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface AsideLinkProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}

export default function AsideLink({ href, icon, children }: AsideLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-md font-medium transition-all duration-200",
        "hover:bg-sidebar-accent",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
      )}
    >
      <span
        className={cn(
          "transition-colors duration-200",
          isActive ? "text-violet-700" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      {children}
    </Link>
  )
}
