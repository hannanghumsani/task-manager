import type { Ticket, TicketPriority, TicketStatus } from "@/types/ticket.d";

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 1,
    title: "AI model gave incorrect clause summary",
    customerName: "John Doe",
    email: "john@example.com",
    description:
      "The NDA summary generated seems incomplete. It's missing the liability cap clause. This is a critical issue for a time-sensitive contract review.",
    priority: "High",
    status: "Open",
    createdAt: "2025-10-15T10:00:00Z",
    comments: [
      {
        user: "Support Agent",
        text: "We’re investigating this issue, prioritizing it immediately.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "Cannot upload large PDF files to the system",
    customerName: "Jane Smith",
    email: "jane@corp.com",
    description:
      "Files over 50MB fail to upload. Getting a generic 'Server Error' message.",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2025-10-16T15:30:00Z",
    comments: [],
  },
  {
    id: 3,
    title: "Request for new feature: Dark Mode",
    customerName: "Alex Johnson",
    email: "alex@startup.net",
    description:
      "The bright white interface is causing eye strain during late-night work. Would love a proper dark mode!",
    priority: "Low",
    status: "Resolved",
    createdAt: "2025-10-14T09:00:00Z",
    comments: [
      {
        user: "Support Agent",
        text: "Good news! Dark mode has been deployed. Closing this ticket.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

export const TICKET_PRIORITIES: TicketPriority[] = ["Low", "Medium", "High"];
export const TICKET_STATUSES: TicketStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
];

export const FIELD_LABELS = {
  customerName: "Customer Name",
  email: "Customer Email",
  title: "Ticket Title",
  description: "Issue Description",
  priority: "Priority Level",
  comment: "Add New Comment",
};

export const PLACEHOLDERS = {
  customerName: "Enter customer full name",
  email: "e.g., user@company.com",
  title: "A concise summary of the issue",
  description: "Describe the issue in detail...",
  comment: "Type your update here...",
  search: "Search by Customer or Title...",
};
