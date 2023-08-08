"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import SignIn from "./sign-in";
import Upload from "./upload";
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
      <div className="flex">
        {user && <Upload />}
        <SignIn user={user} />
      </div>
    </nav>
  );
}
