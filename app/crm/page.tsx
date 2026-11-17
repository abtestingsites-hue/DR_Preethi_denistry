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
  Search,
  RefreshCw,
  FolderOpen,
  Send,
  PieChart,
  BarChart3,
  UserPlus,
  X,
  FileText,
  Smile,
  ShieldCheck,
  Plus,
  Star,
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
    id: string;
    fullName: string;
    phoneNumber: string;
    medicalRecordNumber: string;
  };
}

interface Patient {
  id: string;
  fullName: string;
  phoneNumber: string;
  medicalRecordNumber: string;
  medicalHistory: string | null;
  createdAt: string;
  appointments: {
    id: string;
    treatmentType: string;
    scheduledStart: string;
    status: string;
  }[];
}

interface CRMStats {
  totalLeads: number;
  newLeads: number;
  totalAppointments: number;
  pendingAppointments: number;
  totalPatients: number;
}

export default function DentalCRMPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "appointments" | "patients" | "prescriptions" | "aligners" | "analytics" | "audit">("leads");
  const [stats, setStats] = useState<CRMStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modals state
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [isAlignerModalOpen, setIsAlignerModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  // Selected Records
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // Form states
  const [newPatientData, setNewPatientData] = useState({ fullName: "", phoneNumber: "", medicalHistory: "" });
  const [rescheduleData, setRescheduleData] = useState({ newDate: "", newTimeSlot: "11:00", reason: "" });
  const [rxData, setRxData] = useState({
    medName: "Amoxicillin",
    dosage: "500mg",
    frequency: "TDS (3 times daily)",
    duration: "5 Days",
    instructions: "After food",
    clinicalAdvice: "Maintain optimal oral hygiene. Rinse aligners with cool water.",
  });
  const [alignerData, setAlignerData] = useState({
    systemType: "Invisalign",
    totalTrays: 24,
    currentTray: 6,
    wearDaysPerTray: 10,
    nextTrayChangeDate: "",
    clinicalObservations: "Tracking accurately. Clear adaptation on upper lateral incisors.",
  });

  const fetchCRMData = async () => {
    setLoading(true);
    try {
      const [statsRes, leadsRes, apptsRes, patientsRes, analyticsRes] = await Promise.all([
        fetch("/api/crm/stats", { cache: "no-store" }),
        fetch("/api/crm/leads", { cache: "no-store" }),
        fetch("/api/crm/appointments", { cache: "no-store" }),
        fetch("/api/crm/patients", { cache: "no-store" }),
        fetch("/api/crm/analytics", { cache: "no-store" }),
      ]);

      const [statsData, leadsData, apptsData, patientsData, analyticsData] = await Promise.all([
        statsRes.json(),
        leadsRes.json(),
        apptsRes.json(),
        patientsRes.json(),
        analyticsRes.json(),
      ]);

      if (statsData.success) {
        setStats(statsData.stats);
        setAuditLogs(statsData.auditLogs || []);
      }
      if (leadsData.success && Array.isArray(leadsData.leads)) setLeads(leadsData.leads);
      if (apptsData.success && Array.isArray(apptsData.appointments)) setAppointments(apptsData.appointments);
      if (patientsData.success && Array.isArray(patientsData.patients)) {
        setPatients(patientsData.patients);
        if (patientsData.patients.length > 0 && !selectedPatientId) {
          setSelectedPatientId(patientsData.patients[0].id);
        }
      }
      if (analyticsData.success) setAnalytics(analyticsData.analytics);
    } catch (err) {
      console.error("Error fetching CRM records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCRMData();
  }, []);

  const triggerAutomatedReminders = async () => {
    setActionNotice("Dispatching 24-hour consultation reminders...");
    try {
      const res = await fetch("/api/crm/reminders", { method: "POST" });
      const data = await res.json();
      setActionNotice(data.message || "Reminders dispatched.");
      setTimeout(() => setActionNotice(null), 5000);
      fetchCRMData();
    } catch {
      setActionNotice("Failed to dispatch reminders.");
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/crm/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatientData),
      });
      const data = await res.json();
      if (data.success) {
        setIsNewPatientOpen(false);
        setNewPatientData({ fullName: "", phoneNumber: "", medicalHistory: "" });
        setActionNotice("Patient registered with permanent MRN.");
        setTimeout(() => setActionNotice(null), 4000);
        fetchCRMData();
      }
    } catch (err) {
      console.error("Failed to add patient:", err);
    }
  };

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      const res = await fetch("/api/appointments/reschedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedAppointment.id,
          action: "RESCHEDULE",
          newDate: rescheduleData.newDate,
          newTimeSlot: rescheduleData.newTimeSlot,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsRescheduleModalOpen(false);
        setActionNotice("Appointment rescheduled and patient WhatsApp slip queued.");
        setTimeout(() => setActionNotice(null), 4000);
        fetchCRMData();
      } else {
        alert(data.message || "Could not reschedule appointment.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;

    try {
      const res = await fetch("/api/crm/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          medications: [
            {
              name: rxData.medName,
              dosage: rxData.dosage,
              frequency: rxData.frequency,
              duration: rxData.duration,
              instructions: rxData.instructions,
            },
          ],
          clinicalAdvice: rxData.clinicalAdvice,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsRxModalOpen(false);
        setActionNotice("Digital Prescription generated & queued for WhatsApp dispatch.");
        setTimeout(() => setActionNotice(null), 5000);
        fetchCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAlignerCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;

    try {
      const res = await fetch("/api/crm/aligner-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          systemType: alignerData.systemType,
          totalTrays: alignerData.totalTrays,
          currentTray: alignerData.currentTray,
          wearDaysPerTray: alignerData.wearDaysPerTray,
          nextTrayChangeDate: alignerData.nextTrayChangeDate,
          clinicalObservations: alignerData.clinicalObservations,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAlignerModalOpen(false);
        setActionNotice("Aligner milestone updated & patient WhatsApp alert queued.");
        setTimeout(() => setActionNotice(null), 5000);
        fetchCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReviewInvite = async (patientId: string, treatment: string) => {
    try {
      const res = await fetch("/api/crm/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, treatmentCompleted: treatment }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice("Google Review invitation queued for WhatsApp.");
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const filteredPatients = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phoneNumber.includes(searchQuery) ||
      p.medicalRecordNumber.toLowerCase().includes(searchQuery.toLowerCase())
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
                Artibots Dental CRM · Phase 4
              </span>
              <h1 className="text-base font-serif font-bold tracking-wide">
                Dr. Preethi&apos;s Dentistry
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerAutomatedReminders}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#7B8052] hover:bg-[#5E623A] text-white shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send 24h Reminders</span>
            </button>
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

      {/* Global Notification Banner */}
      {actionNotice && (
        <div className="bg-emerald-600 text-white text-xs font-semibold text-center py-2 px-4 shadow-sm animate-fade-in flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

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
                {patients.length}
              </h3>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                Medical Records Tracked
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Clinical Director
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
        <div className="bg-white p-4 rounded-2xl border border-[#E5E8E1] shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "leads" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "appointments" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "patients" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Patient Directory ({patients.length})
            </button>
            <button
              onClick={() => setActiveTab("prescriptions")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "prescriptions" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Digital Rx
            </button>
            <button
              onClick={() => setActiveTab("aligners")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "aligners" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Aligner Staging
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "analytics" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              BI Analytics
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "audit" ? "bg-[#7B8052] text-white shadow-sm" : "bg-[#F8F9F6] text-[#666666] hover:bg-[#E5E8E1]"
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {activeTab === "patients" && (
              <button
                onClick={() => setIsNewPatientOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#7B8052] hover:bg-[#5E623A] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Patient</span>
              </button>
            )}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#F8F9F6] border border-[#E5E8E1] text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052]"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Leads Triage Pipeline */}
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
              <div className="p-12 text-center text-xs text-[#666666]">Loading incoming inquiries...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#666666]">No leads found matching query.</div>
            ) : (
              <div className="divide-y divide-[#E5E8E1]">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#29291F]">{lead.fullName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === "NEW" ? "bg-emerald-100 text-emerald-800" : lead.status === "CONTACTED" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}>
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
                        <span className="text-[#29291F] font-medium">{lead.treatmentSlug}</span>
                        {lead.notes && (
                          <>
                            <span>•</span>
                            <span className="italic text-[#666666] max-w-md truncate">&ldquo;{lead.notes}&rdquo;</span>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">Received on {new Date(lead.createdAt).toLocaleString("en-IN")}</p>
                    </div>

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

        {/* Tab 2: Appointments Manager with Live Rescheduling */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">
                Confirmed & Pending Consultation Slots
              </h2>
              <span className="text-[11px] text-[#666666]">Dr. Preethi Subramanian Schedule</span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-[#666666]">Loading appointment schedule...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#666666]">No appointment bookings found.</div>
            ) : (
              <div className="divide-y divide-[#E5E8E1]">
                {filteredAppointments.map((appt) => (
                  <div key={appt.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#29291F]">{appt.patient.fullName}</h3>
                        <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {appt.patient.medicalRecordNumber}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          appt.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : appt.status === "PENDING" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {appt.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666]">
                        <span className="flex items-center gap-1 font-medium text-[#7B8052]">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(appt.scheduledStart).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </span>
                        <span>•</span>
                        <span className="text-[#29291F]">{appt.treatmentType}</span>
                        <span>•</span>
                        <span className="font-mono">{appt.patient.phoneNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setIsRescheduleModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5E8E1] hover:bg-[#F8F9F6] text-xs font-semibold text-[#465239]"
                      >
                        Reschedule
                      </button>

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

        {/* Tab 3: Patient Directory & Fast Action Center */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">Clinical Patient Directory</h2>
              <span className="text-[11px] text-[#666666]">Direct patient actions & medical history</span>
            </div>

            <div className="divide-y divide-[#E5E8E1]">
              {filteredPatients.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF9F5]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-serif font-bold text-[#29291F]">{p.fullName}</h3>
                      <span className="font-mono text-[10px] bg-[#7B8052]/10 text-[#7B8052] font-semibold px-2 py-0.5 rounded">
                        {p.medicalRecordNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#666666]">
                      <span className="font-mono">{p.phoneNumber}</span>
                      {p.medicalHistory && (
                        <>
                          <span>•</span>
                          <span className="text-gray-500">History: {p.medicalHistory}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setIsRxModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#465239] hover:bg-[#36402B] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Issue Rx</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setIsAlignerModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#7B8052] hover:bg-[#5E623A] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Smile className="w-3.5 h-3.5" />
                      <span>Aligner Stage</span>
                    </button>

                    <button
                      onClick={() => handleSendReviewInvite(p.id, "Orthodontic & Dental Care")}
                      className="px-2.5 py-1.5 rounded-lg border border-[#E5E8E1] hover:bg-[#F8F9F6] text-xs font-semibold text-[#29291F] flex items-center gap-1"
                      title="Send Google Review Invite via WhatsApp"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      <span>Review Invite</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Digital Prescriptions Hub */}
        {activeTab === "prescriptions" && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E8E1] shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <div>
                <h2 className="text-sm font-serif font-bold text-[#29291F]">Digital Prescriptions & Slip Generator</h2>
                <p className="text-xs text-[#666666]">Dr. Preethi Subramanian, MDS · DCI-TN-34821</p>
              </div>
              <button
                onClick={() => setIsRxModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#7B8052] hover:bg-[#5E623A] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Prescription</span>
              </button>
            </div>

            <div className="p-6 bg-[#FAF9F5] rounded-xl border border-[#E5E8E1] text-xs text-[#666666] leading-relaxed">
              Select a patient from the <strong>Patient Directory</strong> or click <strong>Write New Prescription</strong> above to format and queue a digital slip directly to the patient&apos;s WhatsApp with tamper-evident audit logging.
            </div>
          </div>
        )}

        {/* Tab 5: Clear Aligner Staging Tracker */}
        {activeTab === "aligners" && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E8E1] shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <div>
                <h2 className="text-sm font-serif font-bold text-[#29291F]">Clear Aligner Staging & Milestone Tracker</h2>
                <p className="text-xs text-[#666666]">Invisalign® & GoClear Active Patient Monitoring</p>
              </div>
              <button
                onClick={() => setIsAlignerModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#7B8052] hover:bg-[#5E623A] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Update Aligner Staging</span>
              </button>
            </div>

            <div className="p-6 bg-[#FAF9F5] rounded-xl border border-[#E5E8E1] text-xs text-[#666666] leading-relaxed">
              Track tray progression, monitor wear schedules, and dispatch automated WhatsApp progress alerts to clear-aligner patients.
            </div>
          </div>
        )}

        {/* Tab 6: BI Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle space-y-4">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#7B8052]" />
                  <h3 className="text-sm font-serif font-bold text-[#29291F]">Acquisition Sources</h3>
                </div>
                <div className="space-y-2">
                  {analytics?.marketing?.leadsBySource?.map((item: any) => (
                    <div key={item.source} className="flex items-center justify-between text-xs py-1 border-b border-[#E5E8E1]">
                      <span className="font-medium text-[#666666]">{item.source}</span>
                      <span className="font-bold text-[#7B8052]">{item.count} Inquiries</span>
                    </div>
                  )) || <p className="text-xs text-gray-400">No source data yet.</p>}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E8E1] shadow-subtle space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#7B8052]" />
                  <h3 className="text-sm font-serif font-bold text-[#29291F]">Treatment Demand Breakdown</h3>
                </div>
                <div className="space-y-2">
                  {analytics?.marketing?.leadsByTreatment?.map((item: any) => (
                    <div key={item.treatment} className="flex items-center justify-between text-xs py-1 border-b border-[#E5E8E1]">
                      <span className="font-medium text-[#666666]">{item.treatment}</span>
                      <span className="font-bold text-[#465239]">{item.count}</span>
                    </div>
                  )) || <p className="text-xs text-gray-400">No treatment demand data yet.</p>}
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E8E1] shadow-subtle space-y-4">
              <h3 className="text-sm font-serif font-bold text-[#29291F]">Clear Aligner & Patient Conversion Funnel</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E8E1]">
                  <p className="text-[10px] uppercase font-bold text-gray-500">1. Inquiries</p>
                  <p className="text-xl font-bold text-[#29291F] mt-1">{analytics?.funnel?.impressionsToInquiry ?? 0}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E8E1]">
                  <p className="text-[10px] uppercase font-bold text-gray-500">2. Contacted</p>
                  <p className="text-xl font-bold text-[#7B8052] mt-1">{analytics?.funnel?.inquiryToContacted ?? 0}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E8E1]">
                  <p className="text-[10px] uppercase font-bold text-gray-500">3. Qualified</p>
                  <p className="text-xl font-bold text-[#465239] mt-1">{analytics?.funnel?.contactedToQualified ?? 0}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E8E1]">
                  <p className="text-[10px] uppercase font-bold text-gray-500">4. Booked</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">{analytics?.funnel?.qualifiedToBooked ?? 0}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-[10px] uppercase font-bold text-emerald-700">5. Completed</p>
                  <p className="text-xl font-bold text-emerald-800 mt-1">{analytics?.funnel?.bookedToCompleted ?? 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Compliance Audit Trail */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-2xl border border-[#E5E8E1] shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-[#E5E8E1] bg-[#F8F9F6] flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-[#29291F]">Tamper-Evident Operational Audit Log</h2>
              <span className="text-[11px] text-[#666666]">DPDP Act & Healthcare Compliance Trail</span>
            </div>

            <div className="divide-y divide-[#E5E8E1]">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[#465239] mr-2">{log.action}</span>
                    <span className="text-gray-500">[{log.entityType}]</span>
                    <p className="text-[11px] text-gray-500 mt-0.5">{JSON.stringify(log.changes)}</p>
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(log.createdAt).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal 1: Reschedule Appointment */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E8E1] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <h3 className="text-base font-serif font-bold text-[#29291F]">Reschedule Consultation</h3>
              <button onClick={() => setIsRescheduleModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReschedule} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">New Consultation Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={rescheduleData.newDate}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Time Slot</label>
                <select
                  value={rescheduleData.newTimeSlot}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newTimeSlot: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                >
                  <option value="10:30">10:30 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="17:30">05:30 PM</option>
                  <option value="18:30">06:30 PM</option>
                  <option value="19:30">07:30 PM</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-[#7B8052] text-white text-xs font-semibold uppercase tracking-wider mt-2">
                Confirm & Dispatch WhatsApp Notice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Digital Prescription Slip */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E8E1] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <h3 className="text-base font-serif font-bold text-[#29291F]">Issue Digital Prescription Slip</h3>
              <button onClick={() => setIsRxModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendPrescription} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Medication Name</label>
                <input
                  type="text"
                  required
                  value={rxData.medName}
                  onChange={(e) => setRxData({ ...rxData, medName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Dosage</label>
                  <input
                    type="text"
                    value={rxData.dosage}
                    onChange={(e) => setRxData({ ...rxData, dosage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Duration</label>
                  <input
                    type="text"
                    value={rxData.duration}
                    onChange={(e) => setRxData({ ...rxData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-[#465239] text-white text-xs font-semibold uppercase tracking-wider mt-2">
                Generate & Queue to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Aligner Staging Update */}
      {isAlignerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E8E1] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <h3 className="text-base font-serif font-bold text-[#29291F]">Clear Aligner Progress Update</h3>
              <button onClick={() => setIsAlignerModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateAlignerCase} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">System Type</label>
                <select
                  value={alignerData.systemType}
                  onChange={(e) => setAlignerData({ ...alignerData, systemType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                >
                  <option value="Invisalign">Invisalign® Clear Aligners</option>
                  <option value="GoClear">GoClear Aligners</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Current Tray #</label>
                  <input
                    type="number"
                    value={alignerData.currentTray}
                    onChange={(e) => setAlignerData({ ...alignerData, currentTray: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Total Trays</label>
                  <input
                    type="number"
                    value={alignerData.totalTrays}
                    onChange={(e) => setAlignerData({ ...alignerData, totalTrays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-[#7B8052] text-white text-xs font-semibold uppercase tracking-wider mt-2">
                Log Milestone & Dispatch WhatsApp Progress
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Add New Patient */}
      {isNewPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E8E1] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-3">
              <h3 className="text-base font-serif font-bold text-[#29291F]">Register New Clinical Patient</h3>
              <button onClick={() => setIsNewPatientOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePatient} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newPatientData.fullName}
                  onChange={(e) => setNewPatientData({ ...newPatientData, fullName: e.target.value })}
                  placeholder="e.g. Anandhi Sundar"
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newPatientData.phoneNumber}
                  onChange={(e) => setNewPatientData({ ...newPatientData, phoneNumber: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E1] text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">Medical Notes</label>
                <textarea
                  rows={2}
                  value={newPatientData.medicalHistory}
                  onChange={(e) => setNewPatientData({ ...newPatientData, medicalHistory: e.target.value })}
                  placeholder="e.g. Mild crowding, previous restoration..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E5E8E1] text-xs"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-[#7B8052] text-white text-xs font-semibold uppercase tracking-wider mt-2">
                Create Medical Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
