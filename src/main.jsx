import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import DashboardAuth from "./Providers/DashboardAuth";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardAuth>
          <HelmetProvider>
            <section className="max-w-screen-2xl mx-auto">
              <RouterProvider router={router} />
            </section>
          </HelmetProvider>
        </DashboardAuth>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
