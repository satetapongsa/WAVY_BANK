// app/overview/page.tsx
"use client";

import { useEffect, useState } from "react";
import * as storage from "@/app/lib/storage";
import { Wallet, Users, ArrowLeftRight, TrendingUp, Activity } from "lucide-react";

export default function ExecutiveOverview() {
  const [clients, setClients] = useState<storage.Client[]>([]);
  const [transactions, setTransactions] = useState<storage.Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cl = storage.getClients();
    const txAll = storage.getTransactions();
    const recent = txAll
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
    setClients(cl);
    setTransactions(recent);
    setLoading(false);
  }, []);

  const totalAssets = clients.reduce((sum, c) => sum + Number(c.balance), 0);
  const activeClients = clients.filter((c) => c.status === "Active").length;

  if (loading) {
    return (
      <div className="flex flex-col gap-6 mt-8">
        <div className="loader h-8 w-64 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card h-32 animate-pulse-glow" />
          ))}
        </div>
        <div className="glass-card h-64 animate-pulse-glow" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Executive Dashboard</h1>
        <p className="page-subtitle">ภาพรวมระบบธนาคาร WAVY BANK</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
        {/* Total Assets */}
        <div className="stat-card animate-fade-in-up">
          <div className="stat-label">Total Assets</div>
          <div className="stat-value">฿{totalAssets.toLocaleString()}</div>
          <div className="stat-icon">
            <Wallet size={18} />
          </div>
        </div>

        {/* Total Clients */}
        <div className="stat-card animate-fade-in-up">
          <div className="stat-label">Total Clients</div>
          <div className="stat-value">{clients.length}</div>
          <div className="stat-icon">
            <Users size={18} />
          </div>
        </div>

        {/* Active Clients */}
        <div className="stat-card animate-fade-in-up">
          <div className="stat-label">Active Clients</div>
          <div className="stat-value">{activeClients}</div>
          <div className="stat-icon" style={{ background: "rgba(63,185,80,0.08)", color: "var(--color-success)" }}>
            <Activity size={18} />
          </div>
        </div>

        {/* Recent TX Count */}
        <div className="stat-card animate-fade-in-up">
          <div className="stat-label">Recent Transactions</div>
          <div className="stat-value">{transactions.length}</div>
          <div className="stat-icon" style={{ background: "rgba(163,113,247,0.08)", color: "var(--color-accent)" }}>
            <ArrowLeftRight size={18} />
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <section className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={20} className="text-[var(--color-primary)]" />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Recent Transactions</h2>
        </div>
        <div className="glass-card !p-0 overflow-hidden">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Time</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="text-[var(--text-muted)] text-xs">
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
                  <td className="text-right font-bold text-[var(--color-success)]">
                    ฿{Number(t.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-state">
                    <ArrowLeftRight size={32} className="empty-state-icon mx-auto mb-2" />
                    <p>ยังไม่มีรายการธุรกรรม</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
