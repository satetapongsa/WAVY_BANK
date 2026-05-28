// app/components/AuthGuard.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if we are on client side
    if (typeof window === "undefined") return;

    const isAdmin = localStorage.getItem("isAdmin");
    const isLoginPage = pathname === "/";

    if (isLoginPage) {
      if (isAdmin === "true") {
        router.push("/overview");
      } else {
        setAuthorized(true);
      }
    } else {
      if (isAdmin !== "true") {
        setAuthorized(false);
        router.push("/");
      } else {
        setAuthorized(true);
      }
    }
  }, [pathname, router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">กำลังตรวจสอบสิทธิ์เข้าใช้งาน...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
