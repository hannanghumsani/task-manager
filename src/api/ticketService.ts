import type { Ticket, Comment } from "@/types/ticket.d";
import { INITIAL_TICKETS } from "../language/constants";

const STORAGE_KEY = "tickets";

const getInitialData = (): Ticket[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const tickets = JSON.parse(data);
      if (tickets.length > 0) return tickets;
    } catch (e) {
      console.error("Error parsing tickets from localStorage:", e);
    }
  }
  // Initialize with mock data if localStorage is empty or corrupt
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
  return INITIAL_TICK;
};

const saveTickets = (tickets: Ticket[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
};

export const ticketService = {
  getAll: (): Ticket[] => {
    return getInitialData();
  },

  getById: (id: number): Ticket | undefined => {
    return getInitialData().find((t) => t.id === id);
  },

  create: (
    newTicketData: Omit<Ticket, "id" | "createdAt" | "comments">
  ): Ticket => {
    const currentTickets = getInitialData();
    const newId =
      currentTickets.length > 0
        ? Math.max(...currentTickets.map((t) => t.id)) + 1
        : 1;

    const newTicket: Ticket = {
      ...newTicketData,
      id: newId,
      status: "Open", // New tickets are always 'Open'
      createdAt: new Date().toISOString(),
      comments: [],
    };

    const updatedTickets = [...currentTickets, newTicket];
    saveTickets(updatedTickets);
    return newTicket;
  },

  update: (updatedTicket: Ticket): Ticket => {
    const currentTickets = getInitialData();
    const index = currentTickets.findIndex((t) => t.id === updatedTicket.id);

    if (index === -1) {
      throw new Error(`Ticket with ID ${updatedTicket.id} not found.`);
    }

    const updatedTickets = [
      ...currentTickets.slice(0, index),
      updatedTicket,
      ...currentTickets.slice(index + 1),
    ];

    saveTickets(updatedTickets);
    return updatedTicket;
  },

  addComment: (
    ticketId: number,
    text: string,
    user: string = "Support Agent"
  ): Ticket => {
    const currentTickets = getInitialData();
    const ticket = currentTickets.find((t) => t.id === ticketId);

    if (!ticket) {
      throw new Error(`Ticket with ID ${ticketId} not found for commenting.`);
    }

    const newComment: Comment = {
      user,
      text,
      timestamp: new Date().toISOString(),
    };

    const updatedTicket: Ticket = {
      ...ticket,
      comments: [...ticket.comments, newComment],
    };

    return ticketService.update(updatedTicket); // Use the existing update method to save
  },
};
