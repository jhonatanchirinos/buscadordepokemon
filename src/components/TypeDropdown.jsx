import { useState } from "react";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

const TypeDropdown = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedType = POKEMON_TYPES.find((t) => t.value === value);

  return (
    <div
      className={`relative w-52 ${isOpen ? "z-50" : "z-10"}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full border-2 rounded-lg px-4 py-2 shadow-sm bg-[#1A1A1A] border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
      >
        {selectedType ? (
          <div className="flex items-center gap-2">
            <img
              src={`/type-icons/${selectedType.value}.svg`}
              alt={selectedType.label}
              className="w-6 h-6 object-contain"
            />
            <span className="text-base">{selectedType.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="text-xs text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-[#1A1A1A] border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
        >
          <li
            role="option"
            aria-selected={!value}
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-gray-400"
            onMouseDown={(e) => {
              e.preventDefault();
              onChange("");
              setIsOpen(false);
            }}
          >
            {placeholder}
          </li>
          {POKEMON_TYPES.map((t) => {
            const isSelected = t.value === value;
            return (
              <li
                key={t.value}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(t.value);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 cursor-pointer"
              >
                <img
                  src={`/type-icons/${t.value}.svg`}
                  alt={t.label}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-base">{t.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TypeDropdown;
