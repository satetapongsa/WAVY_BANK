// app/components/NavBar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ArrowLeftRight, Settings, Waves } from "lucide-react";

const links = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="nav-pill">
      {/* Logo */}
      <Link
        href="/overview"
        className="flex items-center gap-1.5 px-3 py-1.5 mr-2"
      >
        <Waves size={18} className="text-[var(--color-primary)]" />
        <span className="text-sm font-bold text-gradient hidden sm:inline">WAVY</span>
      </Link>

      {/* Divider */}
      <div className="w-px h-5 bg-[rgba(255,255,255,0.1)] mr-1" />

      {/* Nav Links */}
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname?.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
