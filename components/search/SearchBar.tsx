// components/search/SearchBar.tsx
"use client";
import { useState, useMemo } from "react";


type PlateState = {
  code: string;
  name: string;
  image: string;
  plates?: { image: string }[];
};

type SearchBarProps = {
  data: PlateState[];
  onSelect: (item: PlateState) => void;
  onSearchChange?: (value: string) => void; // ✅ NEW
};

// type SearchBarProps = {
//     data: PlateState[];
//     onSelect: (item: PlateState) => void;
// };

export default function SearchBar({ data, onSelect, onSearchChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter plates by name
  const filtered = useMemo(() => {
    if (!searchTerm) return [];
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  return (
    <div className="relative mb-6 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search plates..."
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          onSearchChange?.(value);
        //   setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        className="w-full px-4 py-2 rounded-lg border shadow-sm bg-card text-forest focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {showSuggestions && searchTerm && (
        <div className="absolute w-full left-0 top-full bg-white border rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">No matches</div>
          ) : (
            filtered.slice(0, 8).map((item) => (
              <button
                key={item.name}
                onMouseDown={() => {
                  setSearchTerm(item.name);
                  onSelect(item);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-sage-tint text-forest"
              >
                {item.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
