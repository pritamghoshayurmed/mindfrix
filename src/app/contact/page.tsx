"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { submitContactForm } from "./actions";
import MetaPixel from "@/components/MetaPixel";

/* ─── Types ─── */
interface FormData {
  businessName: string;
  founderName: string;
  phone: string;
  email: string;
  websiteLinks: string;
  businessIndustry: string;
  yearsInBusiness: string;
  lastMonthRevenue: string;
  monthlyMarketingSpend: string;
  monthlyCustomers: string;
  mainCustomerSource: string;
  salesSystem: string[];
  meetingDate: string;
}

const STORAGE_KEY = "mindfix_contact_draft";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-]{7,15}$/;

const initialData: FormData = {
  businessName: "",
  founderName: "",
  phone: "+91 ",
  email: "",
  websiteLinks: "",
  businessIndustry: "",
  yearsInBusiness: "",
  lastMonthRevenue: "",
  monthlyMarketingSpend: "",
  monthlyCustomers: "",
  mainCustomerSource: "",
  salesSystem: [],
  meetingDate: "",
};

/* ─── Icons ─── */
function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="cf-spinner"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ─── Calendar Picker Component ─── */
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarPicker({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const minDateStr = "2026-03-05";

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else setViewMonth(viewMonth - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(viewMonth + 1);
  }

  function selectDay(day: number) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    // Don't allow dates before the minimum date
    if (dateStr < minDateStr) return;
    onChange(dateStr);
    setOpen(false);
  }

  function formatDisplay(dateStr: string) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
  }

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="cf-calendar-wrap" ref={ref}>
      <button
        type="button"
        className={`cf-calendar-trigger${hasError ? " cf-input-error" : ""}${value ? " has-value" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon />
        <span>{value ? formatDisplay(value) : "Select a date"}</span>
      </button>
      {open && (
        <div className="cf-calendar-dropdown">
          <div className="cf-cal-header">
            <button
              type="button"
              className="cf-cal-nav-btn"
              onClick={prevMonth}
            >
              <ChevronLeft />
            </button>
            <span className="cf-cal-month-label">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              className="cf-cal-nav-btn"
              onClick={nextMonth}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="cf-cal-days-header">
            {DAY_LABELS.map((d) => (
              <span key={d} className="cf-cal-day-label">
                {d}
              </span>
            ))}
          </div>
          <div className="cf-cal-grid">
            {blanks.map((b) => (
              <span key={`b-${b}`} className="cf-cal-blank" />
            ))}
            {days.map((day) => {
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isDisabled = dateStr < minDateStr;
              const isSelected = dateStr === value;
              const isToday = dateStr === todayStr;
              return (
                <button
                  type="button"
                  key={day}
                  className={`cf-cal-day${isSelected ? " selected" : ""}${isToday ? " today" : ""}${isDisabled ? " past" : ""}`}
                  onClick={() => selectDay(day)}
                  disabled={isDisabled}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Contact Page ─── */
export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialData);
  const [restored, setRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);

  // Save indicator state
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError(null);
  }

  function toggleMulti(field: "salesSystem", value: string) {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError(null);
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};

    if (!form.businessName.trim())
      e.businessName = "Business name is required.";
    if (!form.founderName.trim()) e.founderName = "Founder name is required.";

    // Phone: strip spaces/dashes, must be digits (with optional leading +)
    const phoneClean = form.phone.replace(/[\s\-]/g, "");
    if (!phoneClean || phoneClean === "+91") {
      e.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      e.phone = "Enter a valid phone number (e.g. +91 98765 43210).";
    }

    // Email pattern
    if (!form.email.trim()) {
      e.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = "Enter a valid email address.";
    }

    if (!form.businessIndustry.trim())
      e.businessIndustry = "Business industry is required.";
    if (!form.yearsInBusiness) e.yearsInBusiness = "Please select an option.";

    // Numeric fields
    if (!form.lastMonthRevenue.trim()) {
      e.lastMonthRevenue = "Last month revenue is required.";
    } else if (isNaN(Number(form.lastMonthRevenue.replace(/,/g, "")))) {
      e.lastMonthRevenue = "Enter a valid number (e.g. 250000).";
    }

    if (!form.monthlyMarketingSpend.trim()) {
      e.monthlyMarketingSpend = "Marketing spend is required.";
    } else if (isNaN(Number(form.monthlyMarketingSpend.replace(/,/g, "")))) {
      e.monthlyMarketingSpend = "Enter a valid number (e.g. 30000).";
    }

    if (!form.monthlyCustomers.trim()) {
      e.monthlyCustomers = "Monthly customer count is required.";
    } else if (isNaN(Number(form.monthlyCustomers.replace(/,/g, "")))) {
      e.monthlyCustomers = "Enter a valid number (e.g. 50).";
    }

    if (!form.mainCustomerSource)
      e.mainCustomerSource = "Please select your main source.";
    if (form.salesSystem.length === 0)
      e.salesSystem = "Please select at least one option.";
    if (!form.meetingDate) e.meetingDate = "Please select a meeting date.";

    setErrors(e);
    if (Object.keys(e).length > 0) {
      setFormError("Please fix the highlighted fields below.");
      return false;
    }
    setFormError(null);
    return true;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const result = await submitContactForm(form);
      if (!result.success) {
        setSubmitError(
          result.error ?? "Something went wrong. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      router.push("/thank-you");
    } catch {
      setSubmitError("Unexpected error. Please try again.");
      setSubmitting(false);
    }
  }

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          // Merge with initialData to handle old/mismatched schemas
          setForm({
            ...initialData,
            ...parsed,
            // Ensure arrays stay arrays
            salesSystem: Array.isArray(parsed.salesSystem)
              ? parsed.salesSystem
              : [],
            // mainCustomerSource was array in old schema, now string
            mainCustomerSource:
              typeof parsed.mainCustomerSource === "string"
                ? parsed.mainCustomerSource
                : "",
          });
        }
      }
    } catch {
      /* ignore */
    }
    setRestored(true);
  }, []);

  // Auto-save to localStorage with floating indicator
  const persistForm = useCallback((data: FormData) => {
    // Clear previous timers
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    setSaveStatus("saving");

    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* ignore */
      }
      setSaveStatus("saved");

      hideTimerRef.current = setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 600);
  }, []);

  useEffect(() => {
    if (!restored) return;
    persistForm(form);
  }, [form, restored, persistForm]);

  return (
    <main className="cp-page">
      <MetaPixel pixelId="1273490387964007" />
      {/* Background effects */}
      <div className="cp-bg-orb cp-bg-orb-1" />
      <div className="cp-bg-orb cp-bg-orb-2" />
      <div className="cp-bg-noise" />

      {/* Top bar: Go Home + Logo + Save Indicator */}
      <div className="cp-topbar">
        <button
          type="button"
          className="cp-home-btn"
          onClick={() => router.push("/")}
        >
          <ArrowLeft />
        </button>

        <a href="/" className="cp-topbar-logo">
          <img
            src="/mindfrix_logo.svg"
            alt="MindFrix Logo"
            width={42}
            height={42}
          />
          MindFrix
        </a>

        <div
          className={`cp-save-indicator ${saveStatus !== "idle" ? "visible" : ""} ${saveStatus}`}
        >
          {saveStatus === "saving" && (
            <>
              <SpinnerIcon />
              <span>Saving…</span>
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <CheckIcon size={14} />
              <span>Form saved</span>
            </>
          )}
        </div>
      </div>

      {/* Form container */}
      <div className="cp-container">
        {/* Header */}
        <div className="cp-header">
          <span className="cp-eyebrow">Let&apos;s Work Together</span>
          <h1 className="cp-title">
            Tell us about your <span className="gradient-text">Business</span>
          </h1>
          <p className="cp-subtitle">
            Fill out the form below and we&apos;ll craft a personalised growth
            strategy for you.
          </p>
        </div>

        {/* Form card */}
        <div className="cp-card">
          <div className="cp-fields">
            {/* ─── Contact Info Section ─── */}
            <div className="cp-section">
              <h2 className="cp-section-title">Contact Information</h2>
              <div className="cp-section-fields">
                <div className="cf-field-row">
                  <div className="cf-field">
                    <label className="cf-label">
                      Business Name <span className="cf-required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MindFrix"
                      value={form.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      className={`cf-input${errors.businessName ? " cf-input-error" : ""}`}
                    />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">
                      Founder / Decision Maker Name{" "}
                      <span className="cf-required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={form.founderName}
                      onChange={(e) => update("founderName", e.target.value)}
                      className={`cf-input${errors.founderName ? " cf-input-error" : ""}`}
                    />
                  </div>
                </div>
                <div className="cf-field-row">
                  <div className="cf-field">
                    <label className="cf-label">
                      Phone Number (WhatsApp preferred){" "}
                      <span className="cf-required">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={`cf-input${errors.phone ? " cf-input-error" : ""}`}
                    />
                    {errors.phone && (
                      <span className="cf-field-error">{errors.phone}</span>
                    )}
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">
                      Email Address <span className="cf-required">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. hello@yourbrand.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`cf-input${errors.email ? " cf-input-error" : ""}`}
                    />
                    {errors.email && (
                      <span className="cf-field-error">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label">
                    Business Website / Social Media Links
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://yourbrand.com or @yourbrand"
                    value={form.websiteLinks}
                    onChange={(e) => update("websiteLinks", e.target.value)}
                    className="cf-input"
                  />
                </div>
              </div>
            </div>

            {/* ─── Business Overview Section ─── */}
            <div className="cp-section">
              <h2 className="cp-section-title">Business Overview</h2>
              <div className="cp-section-fields">
                <div className="cf-field">
                  <label className="cf-label">
                    Business Industry <span className="cf-required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. E-commerce, SaaS, Real Estate, Coaching..."
                    value={form.businessIndustry}
                    onChange={(e) => update("businessIndustry", e.target.value)}
                    className={`cf-input${errors.businessIndustry ? " cf-input-error" : ""}`}
                  />
                </div>
                <div className="cf-field">
                  <label className="cf-label">
                    How long have you been in business?{" "}
                    <span className="cf-required">*</span>
                  </label>
                  <div className="cf-options-grid">
                    {[
                      "Less than 6 months",
                      "6–12 months",
                      "1–3 years",
                      "3+ years",
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        className={`cf-option-btn ${form.yearsInBusiness === opt ? "selected" : ""} ${errors.yearsInBusiness && !form.yearsInBusiness ? "cf-option-error" : ""}`}
                        onClick={() => update("yearsInBusiness", opt)}
                      >
                        {form.yearsInBusiness === opt && <CheckIcon />} {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Revenue & Growth Section ─── */}
            <div className="cp-section">
              <h2 className="cp-section-title">Revenue &amp; Growth</h2>
              <div className="cp-section-fields">
                <div className="cf-field-row">
                  <div className="cf-field">
                    <label className="cf-label">
                      Last Month Revenue (₹){" "}
                      <span className="cf-required">*</span>
                    </label>
                    <div className="cf-input-prefix-wrap">
                      <span className="cf-input-prefix">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 250000"
                        value={form.lastMonthRevenue}
                        onChange={(e) =>
                          update(
                            "lastMonthRevenue",
                            e.target.value.replace(/[^0-9,]/g, ""),
                          )
                        }
                        className={`cf-input cf-input-with-prefix${errors.lastMonthRevenue ? " cf-input-error" : ""}`}
                      />
                    </div>
                    {errors.lastMonthRevenue && (
                      <span className="cf-field-error">
                        {errors.lastMonthRevenue}
                      </span>
                    )}
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">
                      Marketing Spend Every Month (₹){" "}
                      <span className="cf-required">*</span>
                    </label>
                    <div className="cf-input-prefix-wrap">
                      <span className="cf-input-prefix">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 30000"
                        value={form.monthlyMarketingSpend}
                        onChange={(e) =>
                          update(
                            "monthlyMarketingSpend",
                            e.target.value.replace(/[^0-9,]/g, ""),
                          )
                        }
                        className={`cf-input cf-input-with-prefix${errors.monthlyMarketingSpend ? " cf-input-error" : ""}`}
                      />
                    </div>
                    {errors.monthlyMarketingSpend && (
                      <span className="cf-field-error">
                        {errors.monthlyMarketingSpend}
                      </span>
                    )}
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label">
                    Monthly Customer / Client Count{" "}
                    <span className="cf-required">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50"
                    value={form.monthlyCustomers}
                    onChange={(e) =>
                      update(
                        "monthlyCustomers",
                        e.target.value.replace(/[^0-9]/g, ""),
                      )
                    }
                    className={`cf-input${errors.monthlyCustomers ? " cf-input-error" : ""}`}
                  />
                  {errors.monthlyCustomers && (
                    <span className="cf-field-error">
                      {errors.monthlyCustomers}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Customer & Sales Section ─── */}
            <div className="cp-section">
              <h2 className="cp-section-title">Customers &amp; Sales</h2>
              <div className="cp-section-fields">
                <div className="cf-field">
                  <label className="cf-label">
                    Main Source of Customers{" "}
                    <span className="cf-required">*</span>
                  </label>
                  <div className="cf-options-grid">
                    {[
                      "Organic (Instagram, YouTube, SEO)",
                      "Paid Ads",
                      "Referrals",
                      "Marketplace",
                      "Other",
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        className={`cf-option-btn ${form.mainCustomerSource === opt ? "selected" : ""} ${errors.mainCustomerSource && !form.mainCustomerSource ? "cf-option-error" : ""}`}
                        onClick={() => update("mainCustomerSource", opt)}
                      >
                        {form.mainCustomerSource === opt && <CheckIcon />} {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label">
                    Do you have a sales system in place?{" "}
                    <span className="cf-required">*</span>{" "}
                    <span className="cf-hint">(select all that apply)</span>
                  </label>
                  <div className="cf-options-grid">
                    {[
                      "Website",
                      "Funnel",
                      "CRM",
                      "WhatsApp Automation",
                      "None",
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        className={`cf-option-btn ${form.salesSystem.includes(opt) ? "selected" : ""} ${errors.salesSystem && form.salesSystem.length === 0 ? "cf-option-error" : ""}`}
                        onClick={() => toggleMulti("salesSystem", opt)}
                      >
                        {form.salesSystem.includes(opt) && <CheckIcon />} {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Meeting Booking Section ─── */}
            <div className="cp-section">
              <h2 className="cp-section-title">Book Your Meeting</h2>
              <div className="cp-section-fields">
                <div className="cf-field">
                  <label className="cf-label">
                    Meeting Booking Date <span className="cf-required">*</span>
                  </label>
                  <CalendarPicker
                    value={form.meetingDate}
                    onChange={(v) => update("meetingDate", v)}
                    hasError={!!errors.meetingDate}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div className="cp-privacy-note">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your data is encrypted and kept strictly confidential.
          </div>

          {/* Errors */}
          {formError && <p className="cf-step-error">{formError}</p>}
          {submitError && <p className="cf-submit-error">{submitError}</p>}

          {/* Submit */}
          <div className="cp-submit-wrap">
            <button
              type="button"
              className="btn-primary cp-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                "Submitting…"
              ) : (
                <>
                  Submit Application <ArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
