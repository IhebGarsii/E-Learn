import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <GoogleOAuthProvider clientId="745484482146-nb1euo7dj38rge6cb5c4mre2u3k0vsqc.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </UserProvider>
  </QueryClientProvider>
);
