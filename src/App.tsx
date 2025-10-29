import React from "react";
import { Routes, Route } from "react-router-dom";
import TicketListPage from "./pages/TicketListPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import Layout from "./components/common/Layout"; // Assumed component

const App: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<TicketListPage />} />
          <Route path="/create" element={<CreateTicketPage />} />
          <Route path="/ticket/:id" element={<TicketDetailPage />} />
          {/* Optional: Add a 404 page route */}
          <Route
            path="*"
            element={
              <h2 className="text-center text-xl pt-10 dark:text-white">
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </div>
    </Layout>
  );
};

export default App;
