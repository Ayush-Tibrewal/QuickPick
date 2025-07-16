import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

export default function Header() {
  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 bg-[#0f1117] backdrop-blur-md shadow-md">
      {/* App name on the left */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-extrabold text-[#ffdd00]">QuickPick</span>
      </div>

      {/* Sign in / Sign out button on the right */}
      <div>
        <button
          onClick={user ? () => signOut() : () => openSignIn()}
          className="px-4 py-2 bg-[#ffdd00] text-black rounded-xl hover:bg-red-700 hover:text-white transition duration-200 ease-in-out shadow-lg"
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </header>
  );
}
