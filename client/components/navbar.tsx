"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import { User } from "firebase/auth";
import { signInWithGoogle, signOut, onAuthStateChangedHelper } from "../app/firebase/firebase";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">
        <Image width={90} height={20} src="/logo.svg" alt="YouTube Logo" />
      </Link>
      <SearchBar />
      {user ? (
        // If user is signed in, show a welcome message (or something else)
        <button  className="border border=gray px-4 py-2 rounded-full font-bold text-base cursor-pointer" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        // If user is not signed in, show sign-in button
        <button  className="border border=gray px-4 py-2 rounded-full font-bold text-base cursor-pointer" onClick={signInWithGoogle}>
          Sign in
        </button>
      )}
    </nav>
  );
}
