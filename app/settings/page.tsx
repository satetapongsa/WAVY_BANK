// app/settings/page.tsx
"use client";
import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { Settings, Shield, RotateCcw, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const toggleAdmin = () => {
    const newVal = !isAdmin;
    setIsAdmin(newVal);
    if (newVal) localStorage.setItem("isAdmin", "true");
    else localStorage.removeItem("isAdmin");
  };

  const resetData = () => {
    if (confirm("⚠️ ลบข้อมูลทั้งหมดและรีเซ็ตระบบ? การกระทำนี้ไม่สามารถย้อนกลับได้")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">ตั้งค่าระบบและการจัดการข้อมูล</p>
      </div>

      {/* Admin Mode */}
      <Card elevated className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-start gap-4">
          <div className="stat-icon" style={{ background: "rgba(163,113,247,0.08)", color: "var(--color-accent)" }}>
            <Shield size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Admin Mode</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              เปิดใช้งานโหมดผู้ดูแลระบบเพื่อเข้าถึงฟังก์ชันขั้นสูง
            </p>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="admin-toggle"
                  checked={isAdmin}
                  onChange={toggleAdmin}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 rounded-full bg-[var(--color-bg-surface)] border border-[var(--glass-border)] peer-checked:bg-[var(--color-accent)] transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {isAdmin ? "เปิดใช้งานอยู่" : "ปิดใช้งาน"}
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="animate-fade-in-up !border-[rgba(248,81,73,0.2)]" style={{ animationDelay: "200ms" }}>
        <div className="flex items-start gap-4">
          <div className="stat-icon" style={{ background: "rgba(248,81,73,0.08)", color: "var(--color-danger)" }}>
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[var(--color-danger)] mb-1">Danger Zone</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              ลบข้อมูลลูกค้าและธุรกรรมทั้งหมดออกจากระบบ การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <Button variant="danger" onClick={resetData}>
              <RotateCcw size={16} />
              รีเซ็ตข้อมูลทั้งหมด
            </Button>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-start gap-4">
          <div className="stat-icon">
            <Settings size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">About</h3>
            <div className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <p>WAVY BANK — Secure Digital Banking</p>
              <p>Version 1.0.0</p>
              <p className="text-xs text-[var(--text-faint)]">Data stored locally in your browser (localStorage)</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
