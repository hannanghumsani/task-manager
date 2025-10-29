import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { Ticket, TicketStatus, TicketPriority } from "@/types/ticket.d";
import { ticketService } from "@/api/ticketService";
import { toast } from "sonner";

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  createTicket: (
    data: Omit<Ticket, "id" | "createdAt" | "comments" | "status">
  ) => void;
  updateTicket: (ticket: Ticket) => void;
  changeStatusAndPriority: (
    id: number,
    status: TicketStatus,
    priority: TicketPriority
  ) => void;
  addComment: (id: number, text: string) => void;
  getTicketById: (id: number) => Ticket | undefined;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicketsContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketsContext must be used within a TicketProvider");
  }
  return context;
};

interface TicketProviderProps {
  children: React.ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Initial Load
  useEffect(() => {
    try {
      const initialTickets = ticketService.getAll();
      setTickets(initialTickets);
    } catch (error) {
      toast.error("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. CRUD Operations
  const createTicket = useCallback(
    (data: Omit<Ticket, "id" | "createdAt" | "comments" | "status">) => {
      try {
        const newTicket = ticketService.create(data as any); // Type assertion needed due to status/comments omission
        setTickets((prev) => [...prev, newTicket]);
        toast.success(`Ticket #${newTicket.id} created successfully!`);
      } catch (error) {
        toast.error("Failed to create ticket.");
      }
    },
    []
  );

  const updateTicket = useCallback((updatedTicket: Ticket) => {
    try {
      const savedTicket = ticketService.update(updatedTicket);
      setTickets((prev) =>
        prev.map((t) => (t.id === savedTicket.id ? savedTicket : t))
      );
      toast.success(`Ticket #${updatedTicket.id} updated.`);
    } catch (error) {
      toast.error(`Failed to update ticket #${updatedTicket.id}.`);
    }
  }, []);

  // 3. Specific Operations
  const changeStatusAndPriority = useCallback(
    (id: number, status: TicketStatus, priority: TicketPriority) => {
      const ticket = tickets.find((t) => t.id === id);
      if (ticket) {
        const updatedTicket = { ...ticket, status, priority };
        updateTicket(updatedTicket);
      }
    },
    [tickets, updateTicket]
  );

  const addComment = useCallback((id: number, text: string) => {
    try {
      const updatedTicket = ticketService.addComment(id, text);
      setTickets((prev) => prev.map((t) => (t.id === id ? updatedTicket : t)));
      toast.success("Comment added successfully.");
    } catch (error) {
      toast.error("Failed to add comment.");
    }
  }, []);

  const getTicketById = useCallback(
    (id: number) => tickets.find((t) => t.id === id),
    [tickets]
  );

  const value = useMemo(
    () => ({
      tickets,
      loading,
      createTicket,
      updateTicket,
      changeStatusAndPriority,
      addComment,
      getTicketById,
    }),
    [
      tickets,
      loading,
      createTicket,
      updateTicket,
      changeStatusAndPriority,
      addComment,
      getTicketById,
    ]
  );

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};
