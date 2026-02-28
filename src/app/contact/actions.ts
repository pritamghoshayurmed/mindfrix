"use server";

const WEBHOOK_URL =
  "https://hook.eu1.make.com/nm93wshb9jwrx1b4r68a52j7n4legq6a";

export interface ContactFormData {
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
