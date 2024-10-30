import React, { useEffect, useState } from "react";
import { POKEMONS } from "../models/mock-pokemon";
import formatType from "../helpers/FormatType.js";
import formatDate from "../helpers/FormatDate.js";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";

export default function PokemonList() {
  const [data, setData] = useState(POKEMONS);
  const [inputs, setInputs] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleAdd = () =>{
    navigate("/pokemon/add")
  }


  const filteredData = (inputValue) => {
    const filter = POKEMONS.filter((x) =>
      x.name.toLowerCase().startsWith((inputValue || "").toLowerCase())
    );
    setData(filter);
  };
  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto min-h-screen bg-slate-100">
        {/* Titre responsive */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold py-6 md:py-8 lg:py-10">
          Pokédex
        </h1>

        {/* Barre de recherche responsive */}
        <div className="bg-base-100 w-[90%] md:w-[70%] lg:w-[500px] px-4 md:px-6 lg:px-8 rounded-md h-32 md:h-36 lg:h-40 shadow-sm mx-auto flex items-center">
          <input
            type="text"
            placeholder="Rechercher un pokémon"
            className="input input-bordered input-sm w-full"
            value={inputs}
            onChange={(e) => {
              const value = e.target.value;
              setInputs(value);
              filteredData(value);
            }}
          />
        </div>
        {/* Grille de Pokémon responsive avec marges adaptatives */}
        <div className="container mx-auto my-3 px-4 md:px-8 lg:px-16 xl:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 py-6 md:py-8 lg:py-10">
          {data?.map((pokemon, index) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        <button onClick={handleAdd} className="fixed bottom-4 right-4 text-white w-12 h-12 bg-red-500 shadow-lg hover:shadow-2xl rounded-full flex items-center justify-center">
          +
        </button>
      </div>
    </div>
  );
}
