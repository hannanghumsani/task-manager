import React from "react";
import type { Ticket } from "@/types/ticket.d";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

interface TicketTableProps {
  tickets: Ticket[];
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-white bg-red-500";
    case "Medium":
      return "text-gray-900 bg-yellow-400";
    case "Low":
      return "text-white bg-green-500";
    default:
      return "text-gray-900 bg-gray-400";
  }
};

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                #{ticket.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                {ticket.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {ticket.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={clsx(
                    "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                    {
                      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
                        ticket.status === "Open",
                    },
                    {
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300":
                        ticket.status === "In Progress",
                    },
                    {
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
                        ticket.status === "Resolved",
                    }
                  )}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={clsx(
                    "px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full",
                    getPriorityClass(ticket.priority)
                  )}
                >
                  {ticket.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/ticket/${ticket.id}`}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center justify-end"
                >
                  View <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
