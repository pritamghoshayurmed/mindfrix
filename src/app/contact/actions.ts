"use server";

const WEBHOOK_URL =
  "https://hook.eu1.make.com/nm93wshb9jwrx1b4r68a52j7n4legq6a";

export interface ContactFormData {
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

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Submission failed (status ${response.status}). Please try again.`,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
