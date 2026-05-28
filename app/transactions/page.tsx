// app/transactions/page.tsx
"use client";
import { useEffect, useState } from "react";
import * as storage from "@/app/lib/storage";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { Trash2, ArrowLeftRight, Search } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<storage.Transaction[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const txs = storage.getTransactions().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setTransactions(txs);
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("ลบรายการธุรกรรมนี้?")) return;
    const newTxs = storage.getTransactions().filter((t) => t.id !== id);
    storage.setTransactions(newTxs);
    setTransactions(newTxs);
  };

  const filtered = transactions.filter(
    (t) =>
      (t.sender_account ?? "").includes(search) ||
      (t.receiver_account ?? "").includes(search) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      (t.type ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Transactions</h1>
        <p className="page-subtitle">ประวัติธุรกรรมทั้งหมด ({transactions.length} รายการ)</p>
      </div>

      {/* Search */}
      <div className="relative animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
        />
        <input
          type="text"
          placeholder="ค้นหาบัญชี, ประเภท, หรือคำอธิบาย..."
          className="input-dark !pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card noPadding className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        {filtered.length === 0 ? (
          <div className="empty-state p-8">
            <ArrowLeftRight size={40} className="empty-state-icon mx-auto mb-3" />
            <p className="text-[var(--text-muted)]">
              {search ? "ไม่พบรายการที่ค้นหา" : "ยังไม่มีรายการธุรกรรม"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                      {new Date(t.created_at).toLocaleString("th-TH")}
                    </td>
                    <td className="font-mono text-xs text-[var(--color-primary)]">
                      {t.sender_account ?? "—"}
                    </td>
                    <td className="font-mono text-xs text-[var(--color-primary)]">
                      {t.receiver_account ?? "—"}
                    </td>
                    <td>
                      <span className="badge badge-info">{t.type || "Transfer"}</span>
                    </td>
                    <td className="text-[var(--text-secondary)] text-sm max-w-[200px] truncate">
                      {t.description || "—"}
                    </td>
                    <td className="text-right font-bold text-[var(--color-success)] whitespace-nowrap">
                      ฿{Number(t.amount).toLocaleString()}
                    </td>
                    <td className="text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        iconOnly
                        onClick={() => handleDelete(t.id)}
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
