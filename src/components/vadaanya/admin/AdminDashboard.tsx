"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ADMIN_KPIS,
  FUNNEL_STEPS,
  MOCK_STUDENTS,
  MOCK_SCHOOLS,
  VOCATIONAL_STATS,
  RegisteredStudent,
  downloadOmrScannerExport,
  downloadMandalOutreachExport,
  downloadDraftRecoveryExport,
  downloadVocationalAlignmentExport,
  downloadFilteredStudentsCsv,
} from "@/data/vadaanya/adminMockData";
import { DISTRICTS_DATA } from "@/data/vadaanya/talentTestDistrictsData";

type AdminTab = "overview" | "students" | "schools" | "funnel" | "reports";

export interface AdminDashboardProps {
  adminEmail?: string;
  role?: string;
}

export default function AdminDashboard({
  adminEmail = "admin@vadaanya.org",
  role = "Super Admin",
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<RegisteredStudent | null>(null);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request failed:", e);
    } finally {
      window.location.reload();
    }
  };

  // Filters for Students Directory
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistrict, setFilterDistrict] = useState<string>("ALL");
  const [filterMandal, setFilterMandal] = useState<string>("ALL");
  const [filterClass, setFilterClass] = useState<string>("ALL");
  const [filterGender, setFilterGender] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isMobileStudentFilterOpen, setIsMobileStudentFilterOpen] = useState(false);

  const [schoolFilter, setSchoolFilter] = useState<"ALL" | "LAGGING">("ALL");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [schoolDistrict, setSchoolDistrict] = useState<string>("ALL");
  const [schoolMandal, setSchoolMandal] = useState<string>("ALL");
  const [isMobileSchoolFilterOpen, setIsMobileSchoolFilterOpen] = useState(false);

  // Deduplicated Mandals for Schools based on district selection
  const availableSchoolMandals = useMemo(() => {
    let list: string[] = [];
    if (schoolDistrict === "ATP") {
      list = DISTRICTS_DATA.ATP.mandals;
    } else if (schoolDistrict === "SSS") {
      list = DISTRICTS_DATA.SSS.mandals;
    } else {
      list = [...DISTRICTS_DATA.ATP.mandals, ...DISTRICTS_DATA.SSS.mandals];
    }
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
  }, [schoolDistrict]);

  // Deduplicated Mandals based on district selection
  const availableMandals = useMemo(() => {
    let list: string[] = [];
    if (filterDistrict === "ATP") {
      list = DISTRICTS_DATA.ATP.mandals;
    } else if (filterDistrict === "SSS") {
      list = DISTRICTS_DATA.SSS.mandals;
    } else {
      list = [...DISTRICTS_DATA.ATP.mandals, ...DISTRICTS_DATA.SSS.mandals];
    }
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
  }, [filterDistrict]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((st) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          st.fullName.toLowerCase().includes(q) ||
          st.regNo.toLowerCase().includes(q) ||
          st.schoolName.toLowerCase().includes(q) ||
          st.mandal.toLowerCase().includes(q) ||
          st.whatsapp.includes(q) ||
          st.aadhaarLast4.includes(q);
        if (!match) return false;
      }

      if (filterDistrict !== "ALL" && st.districtId !== filterDistrict) return false;
      if (filterMandal !== "ALL" && st.mandal !== filterMandal) return false;
      if (filterClass !== "ALL" && st.studentClass !== filterClass) return false;
      if (filterGender !== "ALL" && st.gender !== filterGender) return false;
      if (filterStatus !== "ALL" && st.status !== filterStatus) return false;

      return true;
    });
  }, [searchQuery, filterDistrict, filterMandal, filterClass, filterGender, filterStatus]);

  // Filtered Schools
  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter((sch) => {
      if (schoolFilter === "LAGGING" && !sch.isRedFlag) return false;
      if (schoolDistrict !== "ALL" && sch.districtId !== schoolDistrict) return false;
      if (schoolMandal !== "ALL" && sch.mandal !== schoolMandal) return false;
      if (schoolSearch.trim()) {
        const q = schoolSearch.toLowerCase().trim();
        const match =
          sch.schoolName.toLowerCase().includes(q) ||
          sch.mandal.toLowerCase().includes(q) ||
          sch.hmName.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [schoolFilter, schoolDistrict, schoolMandal, schoolSearch]);

  const hasActiveSchoolFilter =
    schoolDistrict !== "ALL" ||
    schoolMandal !== "ALL" ||
    schoolFilter !== "ALL" ||
    schoolSearch.trim().length > 0;

  const activeSchoolFilterCount =
    (schoolDistrict !== "ALL" ? 1 : 0) +
    (schoolMandal !== "ALL" ? 1 : 0) +
    (schoolFilter !== "ALL" ? 1 : 0);

  const activeStudentFilterCount =
    (filterDistrict !== "ALL" ? 1 : 0) +
    (filterMandal !== "ALL" ? 1 : 0) +
    (filterClass !== "ALL" ? 1 : 0) +
    (filterGender !== "ALL" ? 1 : 0) +
    (filterStatus !== "ALL" ? 1 : 0);

  const hasActiveStudentFilter =
    activeStudentFilterCount > 0 || searchQuery.trim().length > 0;

  const laggingCount = useMemo(() => {
    return MOCK_SCHOOLS.filter((s) => s.isRedFlag).length;
  }, []);

  const atpPct = ((ADMIN_KPIS.atpRegistered / ADMIN_KPIS.atpQuota) * 100).toFixed(1);
  const sssPct = ((ADMIN_KPIS.sssRegistered / ADMIN_KPIS.sssQuota) * 100).toFixed(1);

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
    }, 600);
  };

  return (
    <div className="admin-shell">
      {/* Mobile Backdrop */}
      <div
        className={`admin-sidebar-backdrop ${isSidebarOpen ? "is-open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ============================================================ */}
      {/*  SIDEBAR (Collapsible, Full-Height App Shell)                */}
      {/* ============================================================ */}
      <aside
        className={`admin-sidebar ${isCollapsed ? "is-collapsed" : ""} ${
          isSidebarOpen ? "is-open" : ""
        }`}
      >
        <div className="admin-sidebar__header">
          <div
            className="brand-group"
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
              }
            }}
            title={isCollapsed ? "Click to expand sidebar" : "Vadaanya Talent Test 2026"}
            style={{ cursor: isCollapsed ? "pointer" : "default" }}
          >
            <div
              className="brand-mark"
              onClick={(e) => {
                if (isCollapsed) {
                  e.stopPropagation();
                  setIsCollapsed(false);
                }
              }}
            >
              V
            </div>
            <div className="brand-text">
              <h2>Vadaanya Admin</h2>
              <p>Talent Test 2026</p>
            </div>
          </div>

          <button
            type="button"
            className="collapse-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points={isCollapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
            </svg>
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          <div className="nav-label">Navigation</div>

          <button
            type="button"
            className={`nav-item ${activeTab === "overview" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("overview");
              setIsSidebarOpen(false);
            }}
            title="Overview"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Overview</span>
            </div>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === "students" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("students");
              setIsSidebarOpen(false);
            }}
            title="Registrations (6,032)"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Registrations</span>
            </div>
            <span className="badge-count">6,032</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === "schools" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("schools");
              setIsSidebarOpen(false);
            }}
            title="School wise count"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
              </svg>
              <span>School wise count</span>
            </div>
            <span className="badge-count alert">{laggingCount}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === "funnel" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("funnel");
              setIsSidebarOpen(false);
            }}
            title="Completion rate"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Completion Rate</span>
            </div>
            <span className="badge-count warn">412</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === "reports" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("reports");
              setIsSidebarOpen(false);
            }}
            title="Reports Engine"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Reports Engine</span>
            </div>
            <span className="badge-count">.xlsx</span>
          </button>

          <div className="nav-label">Quick Links</div>

          <Link
            href="/talent-test2026"
            target="_blank"
            className="nav-item"
            rel="noopener noreferrer"
            title="Public Registration"
          >
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Public Registration</span>
            </div>
            <span className="external-indicator" style={{ fontSize: "11px", color: "#64748b" }}>↗</span>
          </Link>

          <Link href="/" className="nav-item" title="Main Website">
            <div className="nav-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Main Website</span>
            </div>
          </Link>
        </nav>

        {/* Bottom Sidebar Collapse Toggle & Logout */}
        <div className="admin-sidebar__footer">
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title={isCollapsed ? "Log Out" : `Log Out (${adminEmail})`}
            aria-label="Log Out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!isCollapsed && <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>}
          </button>

          <button
            type="button"
            className="bottom-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points={isCollapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
            </svg>
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/*  MAIN CONTENT AREA                                           */}
      {/* ============================================================ */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header__left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation drawer"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Compact proportional search bar with no overlap */}
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab === "overview" && e.target.value.trim()) {
                    setActiveTab("students");
                  }
                }}
              />
            </div>
          </div>

          <div className="admin-header__right">
            {/* Authenticated Admin Identity Badge */}
            <div className="admin-badge-pill" title={`Authenticated as ${adminEmail} (${role})`}>
              <div className="admin-badge-avatar">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <div className="admin-badge-info">
                <span className="admin-badge-email">{adminEmail}</span>
                <span className="admin-badge-role">
                  <span className="role-dot" />
                  {role}
                </span>
              </div>
            </div>

            {/* Reload Button */}
            <button
              type="button"
              className="btn-reload"
              onClick={handleReload}
              title="Reload latest analytics data"
            >
              <svg
                className={isReloading ? "spinning" : ""}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span className="btn-reload__text">{isReloading ? "Reloading..." : "Reload"}</span>
            </button>

            {/* Topbar Logout Button */}
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Log Out"
              aria-label="Log Out"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="btn-logout__text">{isLoggingOut ? "Signing out..." : "Log Out"}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="admin-content">
          {/* Subheader / Breadcrumbs */}
          <div className="admin-page-header">
            <div className="header-left">
              <h1>
                {activeTab === "overview" && "Executive Analytics Overview"}
                {activeTab === "students" && "Student Registrations Directory"}
                {activeTab === "schools" && "School wise count"}
                {activeTab === "funnel" && "Completion Rate at Every Step"}
                {activeTab === "reports" && "Reports & Data Export Engine"}
              </h1>
              <div className="breadcrumbs">
                <span>Dashboard</span>
                <span className="sep">/</span>
                <span className="active">
                  {activeTab === "schools"
                    ? "School wise count"
                    : activeTab === "funnel"
                    ? "Completion Rate"
                    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>
                <span className="sep">•</span>
                <span>Talent Test 2026</span>
              </div>
            </div>

            <div className="header-right">
              {activeTab === "students" && (
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => downloadFilteredStudentsCsv(filteredStudents)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Export Filtered ({filteredStudents.length})</span>
                </button>
              )}

              {activeTab === "schools" && (
                <div className="desktop-only-action" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
                    Download all schools sheet
                  </span>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => downloadMandalOutreachExport(MOCK_SCHOOLS)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download .csv</span>
                  </button>
                </div>
              )}

              {activeTab !== "schools" && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    if (activeTab === "reports") {
                      downloadOmrScannerExport();
                    } else {
                      setActiveTab("reports");
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>OMR Export (.csv)</span>
                </button>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/*  TAB 1: OVERVIEW DASHBOARD                                   */}
          {/* ============================================================ */}
          {activeTab === "overview" && (
            <>
              {/* 4 Top KPI Cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-card__header">
                    <span className="title">Total Enrolled</span>
                    <div className="icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="kpi-card__value">{ADMIN_KPIS.confirmedCount.toLocaleString()}</div>
                  <div className="kpi-card__footer">
                    <span className="trend-pill">+{ADMIN_KPIS.todayVelocity} today</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-card__header">
                    <span className="title">Conversion Rate</span>
                    <div className="icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="kpi-card__value">{ADMIN_KPIS.conversionRate}%</div>
                  <div className="kpi-card__footer">
                    <span className="trend-pill">+1.4% vs last week</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-card__header">
                    <span className="title">Pending Applications</span>
                    <div className="icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                  <div className="kpi-card__value">{ADMIN_KPIS.pendingDraftsCount}</div>
                  <div className="kpi-card__footer">
                    <span className="trend-pill down">-12 abandoned</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-card__header">
                    <span className="title">Participating Schools</span>
                    <div className="icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4v18" />
                        <path d="M19 21V11l-6-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="kpi-card__value">{ADMIN_KPIS.participatingSchools}</div>
                  <div className="kpi-card__footer">
                    <span className="trend-pill">90.6% reach</span>
                  </div>
                </div>
              </div>

              {/* District Quota Progress Gauges */}
              <div className="quota-section">
                <div className="quota-card">
                  <div className="quota-card__header">
                    <span className="district-title">Anantapur District (ATP)</span>
                    <span className="district-count">
                      <strong>{ADMIN_KPIS.atpRegistered.toLocaleString()}</strong> / {ADMIN_KPIS.atpQuota.toLocaleString()} seats ({atpPct}%)
                    </span>
                  </div>
                  <div className="quota-card__track">
                    <div className="fill" style={{ width: `${atpPct}%` }} />
                  </div>
                  <div className="quota-card__footer">
                    <span>Remaining capacity: {ADMIN_KPIS.atpQuota - ADMIN_KPIS.atpRegistered} seats</span>
                  </div>
                </div>

                <div className="quota-card">
                  <div className="quota-card__header">
                    <span className="district-title">Sri Sathya Sai District (SSS)</span>
                    <span className="district-count">
                      <strong>{ADMIN_KPIS.sssRegistered.toLocaleString()}</strong> / {ADMIN_KPIS.sssQuota.toLocaleString()} seats ({sssPct}%)
                    </span>
                  </div>
                  <div className="quota-card__track">
                    <div className="fill" style={{ width: `${sssPct}%` }} />
                  </div>
                  <div className="quota-card__footer">
                    <span>Remaining capacity: {ADMIN_KPIS.sssQuota - ADMIN_KPIS.sssRegistered} seats</span>
                  </div>
                </div>
              </div>

              {/* Funnel Drop-Off Tracker Widget */}
              <div className="funnel-card">
                <div className="funnel-card__header">
                  <div className="title-group">
                    <h3>Completion Rate</h3>
                    <p>Real-time completion rate and drop-off metrics across the 4 registration steps</p>
                  </div>
                </div>

                <div className="funnel-card__steps">
                  {FUNNEL_STEPS.map((step, idx) => (
                    <div
                      key={step.stepId}
                      className={`step-node ${idx === FUNNEL_STEPS.length - 1 ? "completed" : ""}`}
                    >
                      <div className="node-header">
                        <span className="step-num">
                          <span className="step-num__desktop">Step {idx}: {step.name}</span>
                          <span className="step-num__mobile">Step {idx}</span>
                        </span>
                      </div>
                      <div className="node-count">{step.count.toLocaleString()}</div>
                      <div className="node-meta">
                        <span className="node-meta__desktop">{step.conversionRate}% completion</span>
                        <span className="node-meta__mobile">{step.conversionRate}%</span>
                      </div>
                      <div className="node-bar">
                        <div
                          className="node-fill"
                          style={{ width: `${step.conversionRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Section: Lagging Schools Red Flag & Aspirations Breakdown */}
              <div className="analytics-dual-grid">
                {/* Lagging Schools Red Flag List */}
                <div className="admin-card">
                  <div className="admin-card__header">
                    <div className="title-area">
                      <h3>Lagging Schools</h3>
                      <p>Schools with &lt;5 registrations requiring follow-up</p>
                    </div>
                    <div className="action-area">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setSchoolFilter("LAGGING");
                          setActiveTab("schools");
                        }}
                      >
                        View All ({laggingCount})
                      </button>
                    </div>
                  </div>

                  <div className="admin-card__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrapper" style={{ border: "none", borderRadius: 0 }}>
                      <table>
                        <thead>
                          <tr>
                            <th>School & Mandal</th>
                            <th>Enrolled</th>
                            <th>Headmaster</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_SCHOOLS.filter((s) => s.isRedFlag)
                            .slice(0, 4)
                            .map((sch) => (
                              <tr key={sch.id}>
                                <td>
                                  <div className="school-meta">
                                    <div className="school-title">{sch.schoolName}</div>
                                    <div className="mandal-badge">
                                      {sch.mandal} • {sch.districtName}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge redflag">
                                    {sch.completedCount}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>
                                    {sch.hmName}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                                    {sch.hmPhone}
                                  </div>
                                </td>
                                <td>
                                  <a href={`tel:${sch.hmPhone}`} className="btn-call">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>Call</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Vocational & Stream Alignment Preferences */}
                <div className="admin-card">
                  <div className="admin-card__header">
                    <div className="title-area">
                      <h3>Vocational Skills</h3>
                      <p>Student interest distribution across technical trades</p>
                    </div>
                    <div className="action-area">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={downloadVocationalAlignmentExport}
                      >
                        Export .csv
                      </button>
                    </div>
                  </div>

                  <div className="admin-card__body">
                    <div className="aspiration-list">
                      {VOCATIONAL_STATS.map((voc) => (
                        <div key={voc.trade} className="aspiration-item">
                          <div className="item-top">
                            <span className="name">{voc.trade}</span>
                            <span className="pct">
                              {voc.count.toLocaleString()} ({voc.percentage}%)
                            </span>
                          </div>
                          <div className="item-track">
                            <div
                              className="item-fill"
                              style={{ width: `${voc.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Live Registrations Table Preview */}
              <div className="admin-card">
                <div className="admin-card__header">
                  <div className="title-area">
                    <h3>Recent Live Registrations</h3>
                    <p>Latest verified student admissions across both districts</p>
                  </div>
                  <div className="action-area">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setActiveTab("students")}
                    >
                      View All
                    </button>
                  </div>
                </div>

                <div className="admin-card__body" style={{ padding: 0 }}>
                  <div className="admin-table-wrapper" style={{ border: "none", borderRadius: 0 }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Reg No</th>
                          <th>Student Name</th>
                          <th>Class</th>
                          <th>Gender</th>
                          <th>School & Mandal</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_STUDENTS.slice(0, 6).map((st) => (
                          <tr key={st.id}>
                            <td>
                              <span style={{ fontWeight: 600, fontFamily: "monospace", color: "#0f172a" }}>
                                {st.regNo}
                              </span>
                            </td>
                            <td>
                              <div className="student-meta">
                                <div className="name">{st.fullName}</div>
                                <div className="sub">C/O {st.relativeName}</div>
                              </div>
                            </td>
                            <td>{st.studentClass}</td>
                            <td>{st.gender === "MALE" ? "Boy" : "Girl"}</td>
                            <td>
                              <div className="school-meta">
                                <div className="school-title">{st.schoolName}</div>
                                <div className="mandal-badge">
                                  {st.mandal}, {st.districtName}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${st.status === "COMPLETED" ? "completed" : "pending"}`}>
                                {st.status === "COMPLETED" ? "Confirmed" : "Pending"}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn-outline"
                                onClick={() => setSelectedStudent(st)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/*  TAB 2: REGISTRATIONS DIRECTORY                              */}
          {/* ============================================================ */}
          {activeTab === "students" && (
            <>
              {/* Mobile Compact Action Bar (Search + Filter + Download) */}
              <div className="admin-mobile-filter-bar">
                <div className="mobile-search-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className={`btn-mobile-filter ${activeStudentFilterCount > 0 ? "has-active" : ""}`}
                  onClick={() => setIsMobileStudentFilterOpen(true)}
                  aria-label="Open filter options"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span>Filter</span>
                  {activeStudentFilterCount > 0 && (
                    <span className="filter-badge">{activeStudentFilterCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-mobile-download"
                  onClick={() => downloadFilteredStudentsCsv(filteredStudents)}
                  title={`Export filtered students (${filteredStudents.length})`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>.csv</span>
                </button>
              </div>

              {/* Mobile Filter Modal / Popup */}
              {isMobileStudentFilterOpen && (
                <div
                  className="admin-filter-modal-backdrop"
                  onClick={() => setIsMobileStudentFilterOpen(false)}
                >
                  <div
                    className="admin-filter-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="admin-filter-modal__header">
                      <div className="title-group">
                        <h3>Filter Students</h3>
                        {activeStudentFilterCount > 0 && (
                          <span className="active-count-tag">{activeStudentFilterCount} active</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => setIsMobileStudentFilterOpen(false)}
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="admin-filter-modal__body">
                      <div className="filter-field">
                        <label>District</label>
                        <select
                          value={filterDistrict}
                          onChange={(e) => {
                            setFilterDistrict(e.target.value);
                            setFilterMandal("ALL");
                          }}
                        >
                          <option value="ALL">All Districts</option>
                          <option value="ATP">Anantapur (ATP)</option>
                          <option value="SSS">Sri Sathya Sai (SSS)</option>
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>Mandal</label>
                        <select
                          value={filterMandal}
                          onChange={(e) => setFilterMandal(e.target.value)}
                        >
                          <option value="ALL">All Mandals ({availableMandals.length})</option>
                          {availableMandals.map((m, idx) => (
                            <option key={`m-pop-st-${m}-${idx}`} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>Class</label>
                        <select
                          value={filterClass}
                          onChange={(e) => setFilterClass(e.target.value)}
                        >
                          <option value="ALL">All Classes</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>Gender</label>
                        <select
                          value={filterGender}
                          onChange={(e) => setFilterGender(e.target.value)}
                        >
                          <option value="ALL">All Genders</option>
                          <option value="MALE">Boys (Male)</option>
                          <option value="FEMALE">Girls (Female)</option>
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="ALL">All Status</option>
                          <option value="COMPLETED">Confirmed</option>
                          <option value="PENDING">Pending</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-filter-modal__footer">
                      {activeStudentFilterCount > 0 && (
                        <button
                          type="button"
                          className="btn-modal-reset"
                          onClick={() => {
                            setFilterDistrict("ALL");
                            setFilterMandal("ALL");
                            setFilterClass("ALL");
                            setFilterGender("ALL");
                            setFilterStatus("ALL");
                          }}
                        >
                          Reset Filters
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-modal-done"
                        onClick={() => setIsMobileStudentFilterOpen(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop Filter Strip */}
              <div className="admin-desktop-filters">
                <div className="admin-filters-card">
                  <div className="filters-row">
                    <div className="filter-item">
                      <label>District</label>
                      <select
                        value={filterDistrict}
                        onChange={(e) => {
                          setFilterDistrict(e.target.value);
                          setFilterMandal("ALL");
                        }}
                      >
                        <option value="ALL">All Districts</option>
                        <option value="ATP">Anantapur (ATP)</option>
                        <option value="SSS">Sri Sathya Sai (SSS)</option>
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>Mandal</label>
                      <select
                        value={filterMandal}
                        onChange={(e) => setFilterMandal(e.target.value)}
                      >
                        <option value="ALL">All Mandals ({availableMandals.length})</option>
                        {availableMandals.map((m, idx) => (
                          <option key={`${m}-${idx}`} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>Class</label>
                      <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                      >
                        <option value="ALL">All Classes</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>Gender</label>
                      <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                      >
                        <option value="ALL">All Genders</option>
                        <option value="MALE">Boys (Male)</option>
                        <option value="FEMALE">Girls (Female)</option>
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="ALL">All Status</option>
                        <option value="COMPLETED">Confirmed</option>
                        <option value="PENDING">Pending</option>
                      </select>
                    </div>

                    <div className="filter-actions">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setFilterDistrict("ALL");
                          setFilterMandal("ALL");
                          setFilterClass("ALL");
                          setFilterGender("ALL");
                          setFilterStatus("ALL");
                          setSearchQuery("");
                        }}
                      >
                        Reset Filters
                      </button>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => downloadFilteredStudentsCsv(filteredStudents)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Export Filtered ({filteredStudents.length})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Students (Class & Gender separated, Trade Interest removed) */}
              <div className="admin-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Reg No</th>
                      <th>Student & Parent</th>
                      <th>Class</th>
                      <th>Gender</th>
                      <th>School & Mandal</th>
                      <th>Aadhaar</th>
                      <th>WhatsApp</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: "center", padding: "36px" }}>
                          <p style={{ color: "#64748b", margin: 0, fontSize: "13px" }}>
                            No student registrations matched your filter criteria.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => (
                        <tr key={st.id}>
                          <td>
                            <span style={{ fontWeight: 600, fontFamily: "monospace", color: "#0f172a" }}>
                              {st.regNo}
                            </span>
                          </td>
                          <td>
                            <div className="student-meta">
                              <div className="name">{st.fullName}</div>
                              <div className="sub">C/O {st.relativeName}</div>
                            </div>
                          </td>
                          <td>{st.studentClass}</td>
                          <td>{st.gender === "MALE" ? "Boy" : "Girl"}</td>
                          <td>
                            <div className="school-meta">
                              <div className="school-title">{st.schoolName}</div>
                              <div className="mandal-badge">
                                {st.mandal}, {st.districtName}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontFamily: "monospace", color: "#64748b" }}>
                              XXXX-XXXX-{st.aadhaarLast4}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`https://wa.me/91${st.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#047857", fontWeight: 500, textDecoration: "none" }}
                            >
                              +91 {st.whatsapp}
                            </a>
                          </td>
                          <td>
                            <span className={`badge ${st.status === "COMPLETED" ? "completed" : "pending"}`}>
                              {st.status === "COMPLETED" ? "Confirmed" : "Pending"}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-outline"
                              onClick={() => setSelectedStudent(st)}
                            >
                              View Card
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/*  TAB 3: SCHOOLS & OUTREACH (CLICK-TO-CALL)                   */}
          {/* ============================================================ */}
          {activeTab === "schools" && (
            <>
              {/* Mobile Compact Action Bar (Search + Filter + Download) */}
              <div className="admin-mobile-filter-bar">
                <div className="mobile-search-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                  />
                  {schoolSearch && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setSchoolSearch("")}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className={`btn-mobile-filter ${activeSchoolFilterCount > 0 ? "has-active" : ""}`}
                  onClick={() => setIsMobileSchoolFilterOpen(true)}
                  aria-label="Open filter options"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span>Filter</span>
                  {activeSchoolFilterCount > 0 && (
                    <span className="filter-badge">{activeSchoolFilterCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-mobile-download"
                  onClick={() => downloadMandalOutreachExport(hasActiveSchoolFilter ? filteredSchools : MOCK_SCHOOLS)}
                  title={hasActiveSchoolFilter ? "Download filtered sheet (.csv)" : "Download all schools sheet (.csv)"}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>.csv</span>
                </button>
              </div>

              {/* Mobile Filter Modal / Popup */}
              {isMobileSchoolFilterOpen && (
                <div
                  className="admin-filter-modal-backdrop"
                  onClick={() => setIsMobileSchoolFilterOpen(false)}
                >
                  <div
                    className="admin-filter-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="admin-filter-modal__header">
                      <div className="title-group">
                        <h3>Filter Schools</h3>
                        {activeSchoolFilterCount > 0 && (
                          <span className="active-count-tag">{activeSchoolFilterCount} active</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => setIsMobileSchoolFilterOpen(false)}
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="admin-filter-modal__body">
                      <div className="filter-field">
                        <label>District</label>
                        <select
                          value={schoolDistrict}
                          onChange={(e) => {
                            setSchoolDistrict(e.target.value);
                            setSchoolMandal("ALL");
                          }}
                        >
                          <option value="ALL">All Districts</option>
                          <option value="ATP">Anantapur (ATP)</option>
                          <option value="SSS">Sri Sathya Sai (SSS)</option>
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>Mandal</label>
                        <select
                          value={schoolMandal}
                          onChange={(e) => setSchoolMandal(e.target.value)}
                        >
                          <option value="ALL">All Mandals ({availableSchoolMandals.length})</option>
                          {availableSchoolMandals.map((m, idx) => (
                            <option key={`m-pop-${m}-${idx}`} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-field">
                        <label>View Mode</label>
                        <select
                          value={schoolFilter}
                          onChange={(e) => setSchoolFilter(e.target.value as "ALL" | "LAGGING")}
                        >
                          <option value="ALL">All Schools ({MOCK_SCHOOLS.length})</option>
                          <option value="LAGGING">Lagging Schools (&lt;5 Registered) — {laggingCount} Red Flags</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-filter-modal__footer">
                      {activeSchoolFilterCount > 0 && (
                        <button
                          type="button"
                          className="btn-modal-reset"
                          onClick={() => {
                            setSchoolDistrict("ALL");
                            setSchoolMandal("ALL");
                            setSchoolFilter("ALL");
                          }}
                        >
                          Reset Filters
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-modal-done"
                        onClick={() => setIsMobileSchoolFilterOpen(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop Filter Strip */}
              <div className="admin-desktop-filters">
                <div className="admin-filters-card">
                  <div className="filters-row" style={{ alignItems: "center" }}>
                    <div className="filter-item">
                      <label>District</label>
                      <select
                        value={schoolDistrict}
                        onChange={(e) => {
                          setSchoolDistrict(e.target.value);
                          setSchoolMandal("ALL");
                        }}
                      >
                        <option value="ALL">All Districts</option>
                        <option value="ATP">Anantapur (ATP)</option>
                        <option value="SSS">Sri Sathya Sai (SSS)</option>
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>Mandal</label>
                      <select
                        value={schoolMandal}
                        onChange={(e) => setSchoolMandal(e.target.value)}
                      >
                        <option value="ALL">All Mandals ({availableSchoolMandals.length})</option>
                        {availableSchoolMandals.map((m, idx) => (
                          <option key={`sch-m-${m}-${idx}`} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-item">
                      <label>View Mode</label>
                      <select
                        value={schoolFilter}
                        onChange={(e) => setSchoolFilter(e.target.value as "ALL" | "LAGGING")}
                      >
                        <option value="ALL">All Schools ({MOCK_SCHOOLS.length})</option>
                        <option value="LAGGING">Lagging Schools (&lt;5 Registered) — {laggingCount} Red Flags</option>
                      </select>
                    </div>

                    <div className="filter-item" style={{ flex: 1, minWidth: "220px" }}>
                      <label>Search School or Headmaster</label>
                      <input
                        type="text"
                        placeholder="Search"
                        value={schoolSearch}
                        onChange={(e) => setSchoolSearch(e.target.value)}
                      />
                    </div>

                    {hasActiveSchoolFilter && (
                      <div className="filter-actions">
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => {
                            setSchoolDistrict("ALL");
                            setSchoolMandal("ALL");
                            setSchoolFilter("ALL");
                            setSchoolSearch("");
                          }}
                        >
                          Reset Filters
                        </button>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap" }}>
                            Download filtered sheet
                          </span>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => downloadMandalOutreachExport(filteredSchools)}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>Download .csv</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table of Schools with Click-to-Call (UDISE Code Column Removed) */}
              <div className="admin-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>School Name & Mandal</th>
                      <th>Category</th>
                      <th>Enrolled Count</th>
                      <th>Pending</th>
                      <th>Headmaster / Principal</th>
                      <th>Contact / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchools.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "36px" }}>
                          <p style={{ color: "#64748b", margin: 0, fontSize: "13px" }}>
                            No schools matched your filter criteria.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredSchools.map((sch) => (
                      <tr key={sch.id}>
                        <td>
                          <div className="school-meta">
                            <div className="school-title">{sch.schoolName}</div>
                            <div className="mandal-badge">
                              {sch.mandal}, {sch.districtName}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge category">{sch.category}</span>
                        </td>
                        <td>
                          <span className={sch.isRedFlag ? "badge redflag" : "badge completed"}>
                            {sch.completedCount}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: "#b45309", fontWeight: 600 }}>
                            {sch.pendingCount}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: "#0f172a" }}>{sch.hmName}</div>
                          <div style={{ fontSize: "11px", color: "#64748b" }}>{sch.hmPhone}</div>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <a href={`tel:${sch.hmPhone}`} className="btn-call">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                              <span>Call</span>
                            </a>

                            <a
                              href={`https://wa.me/${sch.hmPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Respected Headmaster ${sch.hmName}, Greetings from Vadaanya Foundation. We noticed that registrations for ${sch.schoolName} in the Vadaanya Talent Test 2026 are currently at ${sch.completedCount}. Please let us know if your students require assistance in completing their applications.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-whatsapp"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                              </svg>
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/*  TAB 4: FUNNEL ANALYTICS & DRAFT RECOVERY                    */}
          {/* ============================================================ */}
          {activeTab === "funnel" && (
            <>
              {/* Detailed Funnel Card */}
              <div className="funnel-card">
                <div className="funnel-card__header">
                  <div className="title-group">
                    <h3>Completion Rate</h3>
                    <p>Detailed breakdown of completion rates and drop-off points at every registration step</p>
                  </div>
                  <div className="action-area">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={downloadDraftRecoveryExport}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                  </div>
                </div>

                <div className="funnel-card__steps">
                  {FUNNEL_STEPS.map((step, idx) => (
                    <div
                      key={step.stepId}
                      className={`step-node ${idx === FUNNEL_STEPS.length - 1 ? "completed" : ""}`}
                    >
                      <div className="node-header">
                        <span className="step-num">
                          <span className="step-num__desktop">Step {idx}: {step.name}</span>
                          <span className="step-num__mobile">Step {idx}</span>
                        </span>
                      </div>
                      <div className="node-count">{step.count.toLocaleString()}</div>
                      <div className="node-meta">
                        <span className="node-meta__desktop">{step.conversionRate}% completion</span>
                        <span className="node-meta__mobile">{step.conversionRate}%</span>
                      </div>
                      <div className="node-bar">
                        <div
                          className="node-fill"
                          style={{ width: `${step.conversionRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Registrations Recovery Table */}
              <div className="admin-card">
                <div className="admin-card__header">
                  <div className="title-area">
                    <h3>Pending Registrations Recovery Queue ({ADMIN_KPIS.pendingDraftsCount} Students)</h3>
                    <p>Students who initiated application but haven&apos;t confirmed yet.</p>
                  </div>
                  <div className="action-area">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={downloadDraftRecoveryExport}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                  </div>
                </div>

                <div className="admin-card__body" style={{ padding: 0 }}>
                  <div className="admin-table-wrapper" style={{ border: "none", borderRadius: 0 }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Aadhaar Last 4</th>
                          <th>Student Name</th>
                          <th>District & Mandal</th>
                          <th>Last Completed Step</th>
                          <th>Time Elapsed</th>
                          <th>One-Click Recovery Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_STUDENTS.filter((s) => s.status === "PENDING").map((st) => (
                          <tr key={st.id}>
                            <td>
                              <span style={{ fontFamily: "monospace", color: "#64748b" }}>
                                XXXX-XXXX-{st.aadhaarLast4}
                              </span>
                            </td>
                            <td>
                              <div className="student-meta">
                                <div className="name">{st.fullName}</div>
                                <div className="sub">C/O {st.relativeName}</div>
                              </div>
                            </td>
                            <td>
                              {st.mandal}, {st.districtName}
                            </td>
                            <td>
                              <span className="badge pending">
                                Block {st.currentStep}: {st.currentStep === 1 ? "Personal Profile" : "School & Mandal"}
                              </span>
                            </td>
                            <td style={{ fontSize: "11.5px", color: "#64748b" }}>
                              {st.registeredAt}
                            </td>
                            <td>
                              <a
                                href={`https://wa.me/91${st.whatsapp}?text=${encodeURIComponent(
                                  `Dear ${st.fullName}, you have partially filled your Vadaanya Talent Test 2026 application. Please visit vadaanya.org/talent-test2026 and re-enter your Aadhaar number to resume where you left off!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                </svg>
                                <span>Send WhatsApp Link</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/*  TAB 5: REPORTS & DATA EXPORT ENGINE (.xlsx / .csv)          */}
          {/* ============================================================ */}
          {activeTab === "reports" && (
            <>
              <div className="reports-grid">
                {/* 1. OMR Scanner Master Export */}
                <div className="report-card">
                  <div className="report-card__top">
                    <span className="badge-target">OMR Evaluation Team</span>
                    <h3>OMR Scanner Master Export</h3>
                    <p>
                      Strictly formatted optical mark recognition mapping sheet used to ingest candidate records directly into high-speed OMR sheet evaluation equipment.
                    </p>
                  </div>
                  <div className="report-card__bottom">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={downloadOmrScannerExport}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                    <span className="format-info">Format: UTF-8 CSV / Excel</span>
                  </div>
                </div>

                {/* 2. Mandal Coordinator Outreach Sheet */}
                <div className="report-card">
                  <div className="report-card__top">
                    <span className="badge-target">Regional Field Coordinators</span>
                    <h3>Mandal & School Count Sheet</h3>
                    <p>
                      Comprehensive school-by-school registration tallies across all 64 Mandals. Highlights schools with &lt;5 registrations for physical field visits.
                    </p>
                  </div>
                  <div className="report-card__bottom">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => downloadMandalOutreachExport()}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                    <span className="format-info">Format: UTF-8 CSV / Excel</span>
                  </div>
                </div>

                {/* 3. Pending Registrations Recovery Sheet */}
                <div className="report-card">
                  <div className="report-card__top">
                    <span className="badge-target">Field Volunteer Team</span>
                    <h3>Pending Registrations Recovery Sheet</h3>
                    <p>
                      Targeted student recovery sheet containing WhatsApp numbers and drop-off timestamps of students with pending applications.
                    </p>
                  </div>
                  <div className="report-card__bottom">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={downloadDraftRecoveryExport}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                    <span className="format-info">Format: UTF-8 CSV / Excel</span>
                  </div>
                </div>

                {/* 4. Vocational & Skills Alignment Report */}
                <div className="report-card">
                  <div className="report-card__top">
                    <span className="badge-target">APSSDC & PMKVY Liaison</span>
                    <h3>Vocational & Skills Alignment Report</h3>
                    <p>
                      Aggregates student interest in technical trades (Electrical, Plumbing, Carpentry, Painting) and intermediate streams for state skill partnerships.
                    </p>
                  </div>
                  <div className="report-card__bottom">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={downloadVocationalAlignmentExport}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Export (.csv)</span>
                    </button>
                    <span className="format-info">Format: UTF-8 CSV / Excel</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/*  STUDENT DETAIL MODAL                                        */}
      {/* ============================================================ */}
      {selectedStudent && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Student Registration Record</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="admin-modal__body">
              <div className="modal-profile-header">
                <div className="student-name">
                  <h2>{selectedStudent.fullName}</h2>
                  <p>C/O {selectedStudent.relativeName}</p>
                </div>
                <div className="reg-chip">{selectedStudent.regNo}</div>
              </div>

              <div className="modal-grid">
                <div className="info-field">
                  <label>Class</label>
                  <div className="value">{selectedStudent.studentClass}</div>
                </div>

                <div className="info-field">
                  <label>Gender</label>
                  <div className="value">{selectedStudent.gender === "MALE" ? "Boy (Male)" : "Girl (Female)"}</div>
                </div>

                <div className="info-field">
                  <label>Registration Status</label>
                  <div className="value">
                    <span className={`badge ${selectedStudent.status === "COMPLETED" ? "completed" : "pending"}`}>
                      {selectedStudent.status === "COMPLETED" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="info-field">
                  <label>District</label>
                  <div className="value">{selectedStudent.districtName} ({selectedStudent.districtId})</div>
                </div>

                <div className="info-field">
                  <label>Mandal</label>
                  <div className="value">{selectedStudent.mandal}</div>
                </div>

                <div className="info-field" style={{ gridColumn: "1 / -1" }}>
                  <label>School Institution</label>
                  <div className="value">{selectedStudent.schoolName}</div>
                </div>

                <div className="info-field">
                  <label>Aadhaar Blind Index (Last 4)</label>
                  <div className="value" style={{ fontFamily: "monospace" }}>
                    XXXX-XXXX-{selectedStudent.aadhaarLast4}
                  </div>
                </div>

                <div className="info-field">
                  <label>WhatsApp Number</label>
                  <div className="value">+91 {selectedStudent.whatsapp}</div>
                </div>

                <div className="info-field">
                  <label>Post-10th Stream Aspiration</label>
                  <div className="value">{selectedStudent.stream}</div>
                </div>

                <div className="info-field">
                  <label>Vocational Trade Choice</label>
                  <div className="value">{selectedStudent.vocationalInterest}</div>
                </div>

                <div className="info-field" style={{ gridColumn: "1 / -1" }}>
                  <label>Admission Timestamp</label>
                  <div className="value">{selectedStudent.registeredAt}</div>
                </div>
              </div>
            </div>

            <div className="admin-modal__footer">
              <a
                href={`https://wa.me/91${selectedStudent.whatsapp}?text=${encodeURIComponent(
                  `Hello ${selectedStudent.fullName}, Greetings from Vadaanya Foundation regarding your Talent Test 2026 Registration (${selectedStudent.regNo}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>WhatsApp Student</span>
              </a>

              <button
                type="button"
                className="btn-outline"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
