import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Homepage } from "./pages/Homepage";

import { RequireAuth, RequireGuest } from "./routes/guards";
import { ArchivesPage } from "./pages/ArchivesPage";
import { AddNotePage } from "./pages/AddNotePage";
import { DetailPage } from "./pages/DetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 min-h-[calc(100svh-56px)] flex flex-col">
        <Routes>
          <Route element={<RequireGuest />}>
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="/notes/add" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
