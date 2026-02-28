"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitContactForm } from "./actions";

interface FormData {
  // Step 1 – Contact Info
  businessName: string;
  founderName: string;
  phone: string;
  email: string;
  websiteLinks: string;
  location: string;
  // Step 2 – Business Overview
  businessDetails: string;
  businessType: string;
  yearsInBusiness: string;
  usp: string;
  // Step 3 – Revenue & Financials
  lastMonthRevenue: string;
  annualRevenue: string;
  monthlyMarketingSpend: string;
  // Step 4 – Customers & Team
  teamSize: string;
  monthlyCustomers: string;
  mainCustomerSource: string[];
  // Step 5 – Marketing & Sales
  biggestChallenge: string;
  ranPaidAds: string;
  monthlyMarketingBudget: string;
  salesSystem: string[];
  readyToInvest: string;
}

const STORAGE_KEY = "mindfix_contact_draft";

const STEPS = [
  { number: 1, label: "Contact Info" },
  { number: 2, label: "Business Overview" },
  { number: 3, label: "Revenue & Financials" },
  { number: 4, label: "Customers & Team" },
  { number: 5, label: "Marketing & Sales" },
];

const initialData: FormData = {
  businessName: "",
  founderName: "",
  phone: "",
  email: "",
  websiteLinks: "",
  location: "",
  businessDetails: "",
  businessType: "",
  yearsInBusiness: "",
  usp: "",
  lastMonthRevenue: "",
  annualRevenue: "",
  monthlyMarketingSpend: "",
  teamSize: "",
  monthlyCustomers: "",
  mainCustomerSource: [],
  biggestChallenge: "",
  ranPaidAds: "",
  monthlyMarketingBudget: "",
  salesSystem: [],
  readyToInvest: "",
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialData);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [restored, setRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    setStepError(null);
  }

  function toggleMulti(field: "mainCustomerSource" | "salesSystem", value: string) {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    setStepError(null);
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, boolean>> = {};
    if (step === 1) {
      if (!form.businessName.trim()) e.businessName = true;
      if (!form.founderName.trim()) e.founderName = true;
      if (!form.phone.trim()) e.phone = true;
      if (!form.email.trim()) e.email = true;
      if (!form.location.trim()) e.location = true;
    } else if (step === 2) {
      if (!form.businessDetails.trim()) e.businessDetails = true;
      if (!form.businessType.trim()) e.businessType = true;
      if (!form.yearsInBusiness) e.yearsInBusiness = true;
      if (!form.usp.trim()) e.usp = true;
    } else if (step === 3) {
      if (!form.lastMonthRevenue.trim()) e.lastMonthRevenue = true;
      if (!form.annualRevenue.trim()) e.annualRevenue = true;
      if (!form.monthlyMarketingSpend.trim()) e.monthlyMarketingSpend = true;
    } else if (step === 4) {
      if (!form.teamSize.trim()) e.teamSize = true;
      if (!form.monthlyCustomers.trim()) e.monthlyCustomers = true;
      if (form.mainCustomerSource.length === 0) e.mainCustomerSource = true;
    } else if (step === 5) {
      if (!form.biggestChallenge) e.biggestChallenge = true;
      if (!form.ranPaidAds) e.ranPaidAds = true;
      if (!form.monthlyMarketingBudget) e.monthlyMarketingBudget = true;
      if (form.salesSystem.length === 0) e.salesSystem = true;
      if (!form.readyToInvest) e.readyToInvest = true;
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStepError("Please fill in all required fields before continuing.");
      return false;
    }
    setStepError(null);
    return true;
  }

  function goTo(next: number, dir: "forward" | "back") {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 280);
  }

  function handleNext() {
    if (!validate()) return;
    if (step < totalSteps) goTo(step + 1, "forward");
  }

  function handleBack() {
    setErrors({});
    setStepError(null);
    if (step > 1) goTo(step - 1, "back");
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const result = await submitContactForm(form);
      if (!result.success) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      router.push("/thank-you");
    } catch {
      setSubmitError("Unexpected error. Please try again.");
      setSubmitting(false);
    }
  }

  // Restore form state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { form: savedForm, step: savedStep } = JSON.parse(saved);
        if (savedForm) setForm(savedForm);
        if (savedStep) setStep(savedStep);
      }
    } catch {
      // ignore malformed data
    }
    setRestored(true);
  }, []);

  // Persist form state to localStorage on every change (after initial restore)
  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, step }));
    } catch {
      // ignore storage errors
    }
  }, [form, step, restored]);

  // Scroll to top of form on step change
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const slideClass = animating
    ? direction === "forward"
      ? "cf-slide-out-left"
      : "cf-slide-out-right"
    : "";

  return (
    <>
      <Navbar />
      <main className="contact-page">
        {/* Background orbs */}
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-orb contact-orb-3" />

        <div className="container contact-container" ref={formRef}>
          {/* Header */}
          <div className="contact-header">
            <span className="contact-eyebrow">Let&apos;s Work Together</span>
            <h1 className="contact-title">
              Tell us about your <span className="gradient-text">Business</span>
            </h1>
            <p className="contact-subtitle">
              Fill out the form below and we&apos;ll craft a personalised growth strategy for you.
            </p>
          </div>

          {/* Step tracker */}
          <div className="cf-steps-row">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className={`cf-step-item ${step === s.number ? "active" : ""} ${step > s.number ? "done" : ""}`}
              >
                <div className="cf-step-circle">
                  {step > s.number ? <CheckIcon /> : s.number}
                </div>
                <span className="cf-step-label">{s.label}</span>
              </div>
            ))}

            {/* Connector lines */}
            <div className="cf-steps-track">
              <div className="cf-steps-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Form card */}
          <div className={`cf-card ${slideClass}`}>
            <div className="cf-card-header">
              <span className="cf-step-badge">Step {step} of {totalSteps}</span>
              <h2 className="cf-card-title">{STEPS[step - 1].label}</h2>
            </div>

            <div className="cf-fields">
              {/* ─── Step 1: Contact Info ─── */}
              {step === 1 && (
                <>
                  <div className="cf-field-row">
                    <div className="cf-field">
                      <label className="cf-label">Business Name <span className="cf-required">*</span></label>
                      <input
                        type="text"
                        placeholder="e.g. MindFrix Studio"
                        value={form.businessName}
                        onChange={(e) => update("businessName", e.target.value)}
                        className={`cf-input${errors.businessName ? " cf-input-error" : ""}`}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-label">Founder / Decision Maker Name <span className="cf-required">*</span></label>
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
                      <label className="cf-label">Phone Number <span className="cf-required">*</span></label>
                      <input
                        type="tel"
                        placeholder="WhatsApp preferred, e.g. +91 98765 43210"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={`cf-input${errors.phone ? " cf-input-error" : ""}`}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-label">Email Address <span className="cf-required">*</span></label>
                      <input
                        type="email"
                        placeholder="e.g. hello@yourbrand.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={`cf-input${errors.email ? " cf-input-error" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Business Website / Social Media Links</label>
                    <input
                      type="text"
                      placeholder="e.g. https://yourbrand.com  or  @yourbrand"
                      value={form.websiteLinks}
                      onChange={(e) => update("websiteLinks", e.target.value)}
                      className="cf-input"
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Business Location <span className="cf-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      className={`cf-input${errors.location ? " cf-input-error" : ""}`}
                    />
                  </div>
                </>
              )}

              {/* ─── Step 2: Business Overview ─── */}
              {step === 2 && (
                <>
                  <div className="cf-field">
                    <label className="cf-label">Tell us about your Business in Detail <span className="cf-required">*</span></label>
                    <textarea
                      placeholder="Describe what your business does, who it serves, and what you're trying to achieve..."
                      value={form.businessDetails}
                      onChange={(e) => update("businessDetails", e.target.value)}
                      rows={4}
                      className={`cf-input cf-textarea${errors.businessDetails ? " cf-input-error" : ""}`}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Business Type <span className="cf-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. E-commerce, SaaS, Service, Coaching, Agency..."
                      value={form.businessType}
                      onChange={(e) => update("businessType", e.target.value)}
                      className={`cf-input${errors.businessType ? " cf-input-error" : ""}`}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">How long have you been in business? <span className="cf-required">*</span></label>
                    <div className="cf-options-grid">
                      {["Less than 6 months", "6–12 months", "1–3 years", "3+ years"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`cf-option-btn ${form.yearsInBusiness === opt ? "selected" : ""} ${errors.yearsInBusiness && form.yearsInBusiness !== opt ? "cf-option-error" : ""}`}
                          onClick={() => update("yearsInBusiness", opt)}
                        >
                          {form.yearsInBusiness === opt && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Your Business USP <span className="cf-required">*</span></label>
                    <textarea
                      placeholder="What makes you different from competitors?"
                      value={form.usp}
                      onChange={(e) => update("usp", e.target.value)}
                      rows={3}
                      className={`cf-input cf-textarea${errors.usp ? " cf-input-error" : ""}`}
                    />
                  </div>
                </>
              )}

              {/* ─── Step 3: Revenue & Financials ─── */}
              {step === 3 && (
                <>
                  <div className="cf-field">
                    <label className="cf-label">Last Month Revenue <span className="cf-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,50,000"
                      value={form.lastMonthRevenue}
                      onChange={(e) => update("lastMonthRevenue", e.target.value)}
                      className={`cf-input${errors.lastMonthRevenue ? " cf-input-error" : ""}`}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Annual Revenue <span className="cf-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. ₹24,00,000"
                      value={form.annualRevenue}
                      onChange={(e) => update("annualRevenue", e.target.value)}
                      className={`cf-input${errors.annualRevenue ? " cf-input-error" : ""}`}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Monthly Marketing Spend <span className="cf-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. ₹30,000 / month"
                      value={form.monthlyMarketingSpend}
                      onChange={(e) => update("monthlyMarketingSpend", e.target.value)}
                      className={`cf-input${errors.monthlyMarketingSpend ? " cf-input-error" : ""}`}
                    />
                  </div>

                  <div className="cf-financials-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Your financial data is kept strictly confidential and is only used to tailor our strategy for you.
                  </div>
                </>
              )}

              {/* ─── Step 4: Customers & Team ─── */}
              {step === 4 && (
                <>
                  <div className="cf-field-row">
                    <div className="cf-field">
                      <label className="cf-label">Current Team Size <span className="cf-required">*</span></label>
                      <input

                        type="text"
                        placeholder="e.g. 5 people"
                        value={form.teamSize}
                        onChange={(e) => update("teamSize", e.target.value)}
                        className={`cf-input${errors.teamSize ? " cf-input-error" : ""}`}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-label">Monthly Customer / Client Count <span className="cf-required">*</span></label>
                      <input

                        type="text"
                        placeholder="e.g. 50 clients / month"
                        value={form.monthlyCustomers}
                        onChange={(e) => update("monthlyCustomers", e.target.value)}
                        className={`cf-input${errors.monthlyCustomers ? " cf-input-error" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Main Source of Customers <span className="cf-required">*</span> <span className="cf-hint">(select all that apply)</span></label>
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
                          className={`cf-option-btn ${form.mainCustomerSource.includes(opt) ? "selected" : ""} ${errors.mainCustomerSource && form.mainCustomerSource.length === 0 ? "cf-option-error" : ""}`}
                          onClick={() => toggleMulti("mainCustomerSource", opt)}
                        >
                          {form.mainCustomerSource.includes(opt) && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ─── Step 5: Marketing & Sales ─── */}
              {step === 5 && (
                <>
                  <div className="cf-field">
                    <label className="cf-label">Biggest Challenge in Scaling Right Now <span className="cf-required">*</span></label>
                    <div className="cf-options-grid">
                      {["Leads", "Sales closing", "Branding", "Systems & Automation", "Team", "Retention"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`cf-option-btn ${form.biggestChallenge === opt ? "selected" : ""} ${errors.biggestChallenge && form.biggestChallenge !== opt ? "cf-option-error" : ""}`}
                          onClick={() => update("biggestChallenge", opt)}
                        >
                          {form.biggestChallenge === opt && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Have you run paid ads before? <span className="cf-required">*</span></label>
                    <div className="cf-options-row">
                      {["Yes (Facebook / Google / Other)", "No"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`cf-option-btn ${form.ranPaidAds === opt ? "selected" : ""} ${errors.ranPaidAds && form.ranPaidAds !== opt ? "cf-option-error" : ""}`}
                          onClick={() => update("ranPaidAds", opt)}
                        >
                          {form.ranPaidAds === opt && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Current Monthly Marketing Budget <span className="cf-required">*</span></label>
                    <div className="cf-options-grid">
                      {["₹10k–₹30k", "₹30k–₹50k", "₹50k–₹1L", "₹1L+"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`cf-option-btn ${form.monthlyMarketingBudget === opt ? "selected" : ""} ${errors.monthlyMarketingBudget && form.monthlyMarketingBudget !== opt ? "cf-option-error" : ""}`}
                          onClick={() => update("monthlyMarketingBudget", opt)}
                        >
                          {form.monthlyMarketingBudget === opt && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label">Do you have a sales system in place? <span className="cf-required">*</span> <span className="cf-hint">(select all that apply)</span></label>
                    <div className="cf-options-grid">
                      {["Website", "Funnel", "CRM", "WhatsApp Automation", "None"].map((opt) => (
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

                  <div className="cf-field">
                    <label className="cf-label">If the strategy makes sense, are you ready to invest in the next 30 days? <span className="cf-required">*</span></label>
                    <div className="cf-options-row">
                      {["Yes", "No", "Need discussion"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={`cf-option-btn ${form.readyToInvest === opt ? "selected" : ""} ${errors.readyToInvest && form.readyToInvest !== opt ? "cf-option-error" : ""}`}
                          onClick={() => update("readyToInvest", opt)}
                        >
                          {form.readyToInvest === opt && <CheckIcon />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Validation error */}
            {stepError && (
              <p className="cf-step-error">{stepError}</p>
            )}

            {/* Navigation */}
            <div className="cf-nav">
              {step > 1 ? (
                <button type="button" className="cf-btn-back" onClick={handleBack}>
                  <ArrowLeft /> Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button type="button" className="btn-primary cf-btn-next" onClick={handleNext}>
                  Continue <ArrowRight />
                </button>
              ) : (
                <>
                  {submitError && (
                    <p className="cf-submit-error">{submitError}</p>
                  )}
                  <button
                    type="button"
                    className="btn-primary cf-btn-submit"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : <>Submit Application <ArrowRight /></>}
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
