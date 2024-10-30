import React from "react";
import formatType from "../helpers/FormatType.js";
import formatDate from "../helpers/FormatDate.js";
import { NavLink, useNavigate } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`, {state: pokemon});
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-200 rounded-md shadow-sm p-1 space-y-2 md:space-y-3 lg:space-y-4 flex flex-col h-full hover:bg-teal-600 cursor-pointer transition-colors duration-200"
    >
      <div className="bg-base-100 w-full rounded-sm p-2 md:p-3 flex flex-col sm:flex-row items-center gap-3">
        {/* Image container */}
        <div className="w-24 md:w-28 lg:w-32 flex-shrink-0">
          <img
            src={pokemon.picture}
            alt={pokemon?.name}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Informations container */}
        <div className="space-y-1 w-full text-center sm:text-left">
          <p className="text-lg md:text-xl font-semibold">{pokemon.name}</p>
          <p className="text-sm md:text-base">
            <small>{formatDate(pokemon.created)}</small>
          </p>
          {/* Types container */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className="p-1 px-3 rounded-full text-center text-sm md:text-base"
                style={{ backgroundColor: formatType(type) }}
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
