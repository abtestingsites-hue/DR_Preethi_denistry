"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield, AlertCircle, ArrowRight } from "lucide-react";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("drpreethi@preethisdentistry.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/crm");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#465239] text-white flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-md">
          A
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B8052] block">
          ARTIBOTS DENTAL CRM
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F]">
          Clinic Staff Authentication
        </h2>
        <p className="text-xs text-[#666666]">
          Authorized access for Dr. Preethi Subramanian &amp; Clinic Reception
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E5E8E1] shadow-elevated">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">
                Clinic Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@preethisdentistry.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5E8E1] text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052] bg-[#FAF9F5]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5E8E1] text-xs text-[#29291F] focus:outline-none focus:border-[#7B8052] bg-[#FAF9F5]"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Default Director Access: <code className="font-mono text-gray-600">Admin@Preethi2026</code>
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full bg-[#7B8052] hover:bg-[#465239] disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>{loading ? "Authenticating..." : "Access Dental CRM"}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E5E8E1] text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <Shield className="w-3.5 h-3.5 text-[#7B8052]" />
              <span>Multi-Tenant Tenant Isolation &amp; DPDP Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
