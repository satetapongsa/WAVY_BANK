// app/clients/new/page.tsx
"use client";
import { useState } from "react";
import * as storage from "@/app/lib/storage";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [region, setRegion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.insertClient({
      name,
      email,
      account_number: storage.generateAccountNumber(),
      balance,
      status: "Active",
      region,
    });
    router.push("/clients");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors animate-fade-in"
      >
        <ArrowLeft size={16} />
        ย้อนกลับ
      </button>

      <Card elevated className="animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="stat-icon">
            <UserPlus size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">เพิ่มลูกค้าใหม่</h2>
            <p className="text-xs text-[var(--text-muted)]">กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีลูกค้า</p>
          </div>
        </div>

        <div className="divider" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-1.5 block">
              ชื่อลูกค้า
            </label>
            <input
              type="text"
              placeholder="เช่น สมชาย ใจดี"
              className="input-dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-1.5 block">
              อีเมล
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-1.5 block">
              ยอดคงเหลือเริ่มต้น (฿)
            </label>
            <input
              type="number"
              placeholder="0"
              className="input-dark"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-1.5 block">
              ภูมิภาค
            </label>
            <input
              type="text"
              placeholder="เช่น กรุงเทพฯ, เชียงใหม่"
              className="input-dark"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>

          <div className="divider" />

          <Button type="submit" className="w-full" size="lg">
            <UserPlus size={18} />
            สร้างลูกค้า
          </Button>
        </form>
      </Card>
    </div>
  );
}
