"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./searchbar";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">
        <Image width={90} height={20} src="/logo.svg" alt="YouTube Logo" />
      </Link>
      <SearchBar />
      <button className="border border=gray px-4 py-2 rounded-full font-bold text-base cursor-pointer">
        Sign In
      </button>
    </nav>
  );
}
