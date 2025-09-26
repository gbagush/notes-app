import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <App />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
