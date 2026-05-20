import { useState } from "react";
import SearchByName from "./SearchByName";
import SearchByType from "./SearchByType";

const SearchTabs = ({ onSelectPokemon }) => {
  const [activeTab, setActiveTab] = useState("name");

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-[#1A1A1A] p-2 rounded-xl border-2 border-slate-800">
        <button
          onClick={() => setActiveTab("name")}
          className={`px-4 sm:px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
            activeTab === "name"
              ? "bg-slate-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Por Nombre
        </button>
        <button
          onClick={() => setActiveTab("type")}
          className={`px-4 sm:px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
            activeTab === "type"
              ? "bg-slate-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Por Tipo
        </button>
      </div>

      <div className="w-full flex-1 flex flex-col items-center">
        {activeTab === "name" ? (
          <SearchByName onSelectPokemon={onSelectPokemon} />
        ) : (
          <SearchByType onSelectPokemon={onSelectPokemon} />
        )}
      </div>
    </div>
  );
};

export default SearchTabs;
