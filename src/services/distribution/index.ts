/**
 * Distribution Service Layer Contract
 * Prepares architecture for future OAuth 2.0 integrations with social APIs.
 */

export interface DistributionDispatchItem {
  id: string;
  title: string;
  platform: "LinkedIn" | "X" | "Medium" | "Substack" | "Reddit" | "YouTube" | "Email";
  accountHandle: string;
  status: "Scheduled" | "Pending Approval" | "Publishing Queue" | "Completed" | "Failed";
  scheduledDate: string;
  scheduledTime: string;
  failureReason?: string;
}

export const getDistributionQueue = async (): Promise<DistributionDispatchItem[]> => {
  // Placeholder mock response simulating future API fetch
  return [
    {
      id: "dist-1",
      title: "System Over Campaign Breakdown",
      platform: "LinkedIn",
      accountHandle: "Bhavesh Tickoo (Personal)",
      status: "Scheduled",
      scheduledDate: "2026-08-03",
      scheduledTime: "09:00 AM",
    },
    {
      id: "dist-2",
      title: "GEO AI Search Citation Playbook",
      platform: "Medium",
      accountHandle: "Eminarc Engineering",
      status: "Pending Approval",
      scheduledDate: "2026-08-05",
      scheduledTime: "11:30 AM",
    },
    {
      id: "dist-3",
      title: "10 Founder Bottlenecks in Scaling Content",
      platform: "X",
      accountHandle: "@bhaveshtickoo",
      status: "Publishing Queue",
      scheduledDate: "2026-08-02",
      scheduledTime: "11:45 AM",
    },
    {
      id: "dist-4",
      title: "B2B Growth OS Architecture Teardown",
      platform: "Substack",
      accountHandle: "Eminarc Growth Dispatch",
      status: "Completed",
      scheduledDate: "2026-07-28",
      scheduledTime: "08:00 AM",
    },
    {
      id: "dist-5",
      title: "r/SaaS Community AMA: Zero Ad-Spend Scaling",
      platform: "Reddit",
      accountHandle: "u/bhaveshtickoo",
      status: "Failed",
      scheduledDate: "2026-07-26",
      scheduledTime: "04:30 PM",
      failureReason: "OAuth token expired. Re-authentication required.",
    },
  ];
};

export const dispatchNow = async (id: string): Promise<{ success: boolean; message: string }> => {
  return { success: true, message: `Dispatched item ${id} to social provider API.` };
};

export const rescheduleItem = async (id: string, newDate: string): Promise<{ success: boolean }> => {
  return { success: true };
};
