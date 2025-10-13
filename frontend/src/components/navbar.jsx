// "use client"

// import { Button } from "@/components/ui/button"
// import { Package } from "lucide-react"
// import { Link, useLocation } from "react-router-dom"   // ✅ React Router

// export function Navbar() {
//   const location = useLocation()   // ✅ usePathname → useLocation
//   const pathname = location.pathname

//   return (
//     <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-semibold text-white">Quick Pick</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className={`transition-colors ${
//                 pathname === "/" ? "text-white font-medium" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/compare"
//               className={`transition-colors ${
//                 pathname === "/compare" ? "text-white font-medium" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Compare
//             </Link>
//             <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//               About
//             </Link>
//           </div>

//           <div className="flex items-center space-x-3">
//             <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
//               Login
//             </Button>
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"
// import { Toggle } from "@/components/ui/toggle"
import { Package } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

// import { useClerk, useUser } from "@clerk/clerk-react"   // Clerk removed


export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  // Clerk removed
  // const { openSignUp, signOut } = useClerk()
  // const { user } = useUser()
  const [showAuthMsg, setShowAuthMsg] = useState(false);
  const handleAuthClick = () => {
    setShowAuthMsg(true);
    setTimeout(() => {
      setShowAuthMsg(false);
    }, 2000);
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">Quick Pick</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                pathname === "/" ? "text-white font-medium" : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/compare"
              className={`transition-colors ${
                pathname === "/compare" ? "text-white font-medium" : "text-gray-400 hover:text-white"
              }`}
            >
              Compare
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Auth button */}
          <div className="flex items-center space-x-3 relative">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAuthClick}
            >
              Sign In
            </Button>
            {showAuthMsg && (
              <div className="absolute top-12 right-0 bg-yellow-100 text-yellow-900 px-4 py-2 rounded shadow z-50 text-sm border border-yellow-300 animate-fade-in">
                Auth is removed. You can access all features directly.
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
