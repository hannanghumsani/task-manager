import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import { TicketProvider } from "@/context/TicketContext.tsx"; // Assumed component
import { Toaster } from "sonner"; // Sonner component

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TicketProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </TicketProvider>
    </ThemeProvider>
  </React.StrictMode>
);
