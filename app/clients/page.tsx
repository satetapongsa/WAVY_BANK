// app/clients/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as storage from "@/app/lib/storage";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { Trash2, UserPlus, Users, Search } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<storage.Client[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setClients(storage.getClients());
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("ลบลูกค้ารายนี้?")) return;
    storage.deleteClient(id);
    setClients(storage.getClients());
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.account_number.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div className="page-header !mb-0">
          <h1 className="page-title">Clients</h1>
          <p className="page-subtitle">จัดการข้อมูลลูกค้า ({clients.length} คน)</p>
        </div>
        <Link href="/clients/new">
          <Button size="md">
            <UserPlus size={16} />
            เพิ่มลูกค้า
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
        />
        <input
          type="text"
          placeholder="ค้นหาชื่อ, อีเมล, หรือเลขบัญชี..."
          className="input-dark !pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card noPadding className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        {filtered.length === 0 ? (
          <div className="empty-state p-8">
            <Users size={40} className="empty-state-icon mx-auto mb-3" />
            <p className="text-[var(--text-muted)]">
              {search ? "ไม่พบลูกค้าที่ค้นหา" : "ยังไม่มีข้อมูลลูกค้า"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Account</th>
                  <th className="text-right">Balance</th>
                  <th>Status</th>
                  <th>Region</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="font-medium text-[var(--text-primary)]">{c.name}</td>
                    <td className="text-[var(--text-muted)]">{c.email}</td>
                    <td className="font-mono text-xs text-[var(--color-primary)]">
                      {c.account_number}
                    </td>
                    <td className="text-right font-bold text-[var(--color-success)]">
                      ฿{Number(c.balance).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          c.status === "Active" ? "badge-active" : "badge-blocked"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="text-[var(--text-muted)]">{c.region}</td>
                    <td className="text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        iconOnly
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
