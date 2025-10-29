// src/types/ticket.d.ts

export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketPriority = "Low" | "Medium" | "High";

export interface Comment {
  user: string;
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: number;
  title: string;
  customerName: string;
  email: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  comments: Comment[];
}
