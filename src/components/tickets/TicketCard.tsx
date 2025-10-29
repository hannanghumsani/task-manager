import React from "react";
// import { Ticket } from "@/types/ticket.d";
import type { Ticket } from "@/types/ticket";

import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import clsx from "clsx";

interface TicketCardProps {
  ticket: Ticket;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "border-red-500 text-red-700 dark:text-red-400";
    case "In Progress":
      return "border-yellow-500 text-yellow-700 dark:text-yellow-400";
    case "Resolved":
      return "border-green-500 text-green-700 dark:text-green-400";
    default:
      return "border-gray-500 text-gray-700 dark:text-gray-400";
  }
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <Link to={`/ticket/${ticket.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            ID: #{ticket.id}
          </span>
          <span
            className={clsx(
              "text-sm font-semibold px-3 py-1 rounded-full border",
              getStatusColor(ticket.status)
            )}
          >
            {ticket.status}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {ticket.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {ticket.description}
        </p>

        <div className="border-t pt-3 mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-indigo-500" />
              <span>{ticket.customerName}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
