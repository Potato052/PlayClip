import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <input
      className="border border-gray-300 rounded-lg p-2 w-96 text-center"
      type="text"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput}
    />
  );
}
