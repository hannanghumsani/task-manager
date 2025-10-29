import React, { useState, useMemo } from "react";
import { useTicketsContext } from "../context/TicketContext";
import {
  TICKET_STATUSES,
  PLACEHOLDERS,
  // Note: FIELD_LABELS is needed here for SelectField to work without errors
} from "../language/constants"; // Assuming you fixed the path to utils/constants
import type { Ticket, TicketStatus } from "@/types/ticket.d";
import DebouncedInput from "../components/common/DebouncedInput";
import { List, Table } from "lucide-react";
import TicketTable from "../components/tickets/TicketTable";
import TicketCard from "../components/tickets/TicketCard";
import Pagination from "../components/common/Pagination";
import Button from "../components/common/Button";
import SelectField from "../components/common/SelectField";

type ViewType = "table" | "card";
type SortKey = "priority" | "createdAt";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

// Options for the Sort Key dropdown
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "createdAt", label: "Sort by Date" },
  { value: "priority", label: "Sort by Priority" },
];

const TicketListPage: React.FC = () => {
  const { tickets, loading } = useTicketsContext();
  const [view, setView] = useState<ViewType>("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // ... (filteredAndSortedTickets and Pagination Logic remains the same) ...
  const filteredAndSortedTickets = useMemo(() => {
    let result = [...tickets];

    // 1. Filter by Status
    if (statusFilter !== "All") {
      result = result.filter((t) => t.status === statusFilter);
    }

    // 2. Filter by Search Term (Customer or Title)
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.customerName.toLowerCase().includes(lowerSearch) ||
          t.title.toLowerCase().includes(lowerSearch)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortKey === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      } else if (sortKey === "priority") {
        const priorityOrder: Record<string, number> = {
          High: 3,
          Medium: 2,
          Low: 1,
        };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return sortOrder === "asc" ? comparison : -comparison; // Apply order
    });

    return result;
  }, [tickets, statusFilter, searchTerm, sortKey, sortOrder]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(
    filteredAndSortedTickets.length / ITEMS_PER_PAGE
  );
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTickets.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTickets, currentPage]);

  if (loading) {
    return (
      <div className="text-center py-10 dark:text-gray-200">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50">
        Support Tickets Dashboard
      </h1>

      {/* --- Filter & Search Bar --- */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow w-full md:w-auto">
          <DebouncedInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={PLACEHOLDERS.search}
          />
        </div>

        {/* 1. Status Filter (Using SelectField) */}
        <div className="w-full md:w-52">
          <SelectField
            name="statusFilter"
            label="" // Hidden label
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as TicketStatus | "All");
              setCurrentPage(1);
            }}
            isInvalid={false}
            options={[
              { value: "All", label: "All Statuses" },
              ...TICKET_STATUSES.map((s) => ({ value: s, label: s })),
            ]}
          />
        </div>

        {/* 2. Sort By Key (Using SelectField) */}
        <div className="w-full md:w-40">
          <SelectField
            name="sortKey"
            label="" // Hidden label
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            isInvalid={false}
            options={SORT_OPTIONS}
          />
        </div>

        {/* Sort Order Toggle Button */}
        <Button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          variant="secondary"
          className="p-3 w-full md:w-auto flex-shrink-0" // Added flex-shrink for better layout
        >
          {sortOrder === "asc" ? "↑ Date/Priority Asc" : "↓ Date/Priority Desc"}
        </Button>

        {/* View Toggle */}
        <div className="flex space-x-2 w-full md:w-auto flex-shrink-0">
          <Button
            onClick={() => setView("table")}
            variant={view === "table" ? "primary" : "secondary"}
            className="p-3"
          >
            <Table className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setView("card")}
            variant={view === "card" ? "primary" : "secondary"}
            className="p-3"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* --- Ticket List/Table --- */}
      {filteredAndSortedTickets.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-lg font-medium dark:text-gray-300">
            No tickets match your current filters.
          </p>
        </div>
      ) : (
        <>
          {view === "table" ? (
            <TicketTable tickets={paginatedTickets} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}

          {/* --- Pagination --- */}
          <div className="py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TicketListPage;
