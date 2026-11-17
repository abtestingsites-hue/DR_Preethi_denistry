"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  treatmentSlug: string;
  source: string;
  status: string;
  notes: string | null;
  createdAt: string;
  assignedToUser?: { fullName: string; role: string } | null;
}

interface Appointment {
  id: string;
  treatmentType: string;
  scheduledStart: string;
  status: string;
  notes: string | null;
  patient: {
    fullName: string;
    phoneNumber: string;
    medicalRecordNumber: string;
  };
  dentist?: {
    fullName: string;
  } | null;
}

interface CRMStats {
  totalLeads: number;
  newLeads: number;
  totalAppointments: number;
  pendingAppointments: number;
  totalPatients: number;
}

export default function DentalCRMPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "appointments" | "audit">("leads");
  const [stats, setStats] = useState<CRMStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCRMData = async () => {
    setLoading(true);
    try {
      const [statsRes, leadsRes, apptsRes] = await Promise.all([
        fetch("/api/crm/stats"),
        fetch("/api/crm/leads"),
        fetch("/api/crm/appointments"),
      ]);

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const apptsData = await apptsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
        setAuditLogs(statsData.auditLogs || []);
      }
      if (leadsData.success) setLeads(leadsData.leads);
      if (apptsData.success) setAppointments(apptsData.appointments);
    } catch (err) {
      console.error("Error fetching CRM records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCRMData();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    setUpdatingId(appointmentId);
    try {
      const res = await fetch("/api/crm/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status: newStatus }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phoneNumber.includes(searchQuery) ||
      l.treatmentSlug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAppointments = appointments.filter(
    (a) =>
      a.patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patient.phoneNumber.includes(searchQuery) ||
      a.treatmentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9F6] text-[#29291F]">
      {/* Top Navigation Bar */}
      <header className="bg-[#465239] text-white border-b border-[#36402B] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7B8052] flex items-center justify-center font-serif font-bold text-white text-base">
              A
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF8F2]/75 block leading-none">
                Artibots Dental CRM
              </span>
              <h1 className="text-base font-serif font-bold tracking-wide">
                Dr. Preethi&apos;s Dentistry
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#7B8052]/40 text-[#FAF8F2] border border-[#7B8052]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Saibaba Colony Flagship
            </span>
            <button
              onClick={fetchCRMData}
              disabled={loading}
              className="p-2 rounded-lg bg-[#7B8052] hover:bg-[#5E623A] text-white transition-colors"
              title="Refresh CRM Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Total Inquiries
              </p>
              <h3 className="text-2xl font-serif font-bold text-[#29291F] mt-1">
                {stats?.totalLeads ?? "--"}
              </h3>
              <p className="text-[10px] text-[#7B8052] font-semibold mt-0.5">
                {stats?.newLeads ?? 0} Pending Triage
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#7B8052]/10 text-[#7B8052] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Consultations
              </p>
              <h3 className="text-2xl font-serif font-bold text-[#29291F] mt-1">
                {stats?.totalAppointments ?? "--"}
              </h3>
              <p className="text-[10px] text-amber-600 font-semibold mt-0.5">
                {stats?.pendingAppointments ?? 0} Unconfirmed
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Active Patients
              </p>
              <h3 className="text-2xl font-serif font-bold text-[#29291F] mt-1">
                {stats?.totalPatients ?? "--"}
              </h3>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                All records isolated
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Clinic Director
              </p>
              <h3 className="text-sm font-serif font-bold text-[#29291F] mt-1">
                Dr. Preethi
              </h3>
              <p className="text-[10px] text-[#7B8052] font-semibold mt-0.5">
                CLINIC_ADMIN (Active)
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#465239]/10 text-[#465239] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* Tab & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E5E8E1] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "leads"
                  ? "bg-[#7B8052] text-white shadow-sm"
                  : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Consultation Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "appointments"
                  ? "bg-[#7B8052] text-white shadow-sm"
                  : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "audit"
                  ? "bg-[#7B8052] text-white shadow-sm"
                  : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#F8F9F6] border border-[#E5E8E1] text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052]"
            />
          </div>
        </div>

        {/* Tab Content: Leads Triage Pipeline */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">
                Inbound Consultation Inquiries
              </h2>
              <span className="text-[11px] text-[#666666]">
                Real-time patient intake from Website & WhatsApp
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-[#666666]">
                Loading incoming inquiries...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#666666]">
                No leads found matching query.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E8E1]">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#29291F]">
                          {lead.fullName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === "NEW"
                              ? "bg-emerald-100 text-emerald-800"
                              : lead.status === "CONTACTED"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "CONSULTATION_BOOKED"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-[#7B8052] font-semibold bg-[#7B8052]/10 px-2 py-0.5 rounded-full">
                          {lead.source}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666]">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-[#7B8052]" />
                          {lead.phoneNumber}
                        </span>
                        <span>•</span>
                        <span className="text-[#29291F] font-medium">
                          {lead.treatmentSlug}
                        </span>
                        {lead.notes && (
                          <>
                            <span>•</span>
                            <span className="italic text-[#666666] max-w-md truncate">
                              &ldquo;{lead.notes}&rdquo;
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Received on {new Date(lead.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${lead.phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Vanakkam ${lead.fullName}, thank you for contacting Dr. Preethi's Dentistry (Saibaba Colony). How can we assist with your ${lead.treatmentSlug} inquiry?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5E8E1] bg-white text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052]"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CONSULTATION_BOOKED">CONSULTATION_BOOKED</option>
                        <option value="UNRESPONSIVE">UNRESPONSIVE</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Appointments Manager */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">
                Confirmed & Pending Consultation Slots
              </h2>
              <span className="text-[11px] text-[#666666]">
                Dr. Preethi Subramanian Schedule
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-[#666666]">
                Loading appointment schedule...
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#666666]">
                No appointment bookings found.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E8E1]">
                {filteredAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#29291F]">
                          {appt.patient.fullName}
                        </h3>
                        <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {appt.patient.medicalRecordNumber}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            appt.status === "CONFIRMED"
                              ? "bg-emerald-100 text-emerald-800"
                              : appt.status === "PENDING"
                              ? "bg-amber-100 text-amber-800"
                              : appt.status === "COMPLETED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666]">
                        <span className="flex items-center gap-1 font-medium text-[#7B8052]">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(appt.scheduledStart).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        <span>•</span>
                        <span className="text-[#29291F]">{appt.treatmentType}</span>
                        <span>•</span>
                        <span className="font-mono">{appt.patient.phoneNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={appt.status}
                        disabled={updatingId === appt.id}
                        onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5E8E1] bg-white text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052]"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="NO_SHOW">NO_SHOW</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Compliance & Audit Trail */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">
                Tamper-Evident Operational Audit Log
              </h2>
              <span className="text-[11px] text-[#666666]">
                DPDP Act & Healthcare Compliance Trail
              </span>
            </div>

            {auditLogs.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#666666]">
                No audit events recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E8E1]">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#465239] mr-2">
                        {log.action}
                      </span>
                      <span className="text-gray-500">[{log.entityType}]</span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {JSON.stringify(log.changes)}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
