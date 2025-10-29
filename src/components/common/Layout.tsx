import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Ticket, Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; // Assuming ThemeContext is complete

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header / Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and App Name */}
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              <Ticket className="w-7 h-7 mr-2" />
              TicketCRM
            </Link>

            {/* Navigation and Actions */}
            <nav className="flex items-center space-x-4">
              <Link
                to="/create"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Ticket
              </Link>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                aria-label="Toggle dark/light mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Optional Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-gray-800">
        TicketCRM built with React, TypeScript, and TailwindCSS.
      </footer>
    </div>
  );
};

export default Layout;
