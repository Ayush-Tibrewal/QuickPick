// src/App.jsx
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";   // ✅ use Navbar instead of Header

// 👇 must exactly match the VITE_ prefix
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error(
    "🚨 VITE_CLERK_PUBLISHABLE_KEY is missing — check your .env and restart the dev server."
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        {/* ✅ Navbar stays outside Routes */}
        <Navbar />

        <div className="bg-[#0d0d0d] min-h-screen text-white">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route
              path="/compare"
              element={
                <>
                  <SignedIn>
                    <Home />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}
