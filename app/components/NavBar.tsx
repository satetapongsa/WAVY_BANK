// app/components/NavBar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, ArrowLeftRight, Settings, Waves, LogOut, User } from "lucide-react";

const links = [
  { href: "/overview", label: "ภาพรวมระบบ", icon: LayoutDashboard },
  { href: "/clients", label: "จัดการบัญชีลูกค้า", icon: Users },
  { href: "/transactions", label: "บันทึกธุรกรรม", icon: ArrowLeftRight },
  { href: "/settings", label: "ตั้งค่าระบบ", icon: Settings },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, do not render navigation bar at all
  if (pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/overview"
              className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            >
              <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center shadow-sm">
                <Waves size={20} className="text-white" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                WAVY <span className="text-sky-600">BANK</span>
              </span>
            </Link>

            {/* Middle: Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 h-full pt-1">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname?.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex items-center gap-2 px-4 h-12 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-slate-100/80 text-sky-700 border-b-2 border-sky-600 rounded-b-none"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-700 leading-none">ผู้ดูแลระบบ (Admin)</p>
                <span className="text-[10px] text-slate-400 font-medium">ระบบกำลังทำงานปกติ</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200/50"
              title="ออกจากระบบ"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation bottom drawer/pill for absolute responsive convenience */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 shadow-lg px-2 py-1 flex justify-around z-40">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-semibold ${
                isActive ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
