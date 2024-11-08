import React, { useEffect, useState } from "react";
import { POKEMONS } from "../models/mock-pokemon";
import formatType from "../helpers/FormatType.js";
import formatDate from "../helpers/FormatDate.js";
import { getPokemons } from "../services/PokemonService.js";
import PokemonCard from "../components/PokemonCard";
import Pagination from "@mui/material/Pagination";

import { useNavigate } from "react-router-dom";

export default function PokemonList() {
  const [data, setData] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [inputs, setInputs] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    // Définir un timeout de 5 secondes pour afficher le skeleton
    const timer = setTimeout(() => setIsLoading(false), 5000);

    try {
      getPokemons()
        .then((response) => {
          if (response.status === 200) {
            clearTimeout(timer); // Annule le timer si les données sont récupérées plus tôt
            setIsLoading(false);
            setPokemons(response.data);
            setData(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }

    return () => clearTimeout(timer); // Nettoyage du timer si le composant est démonté
  }, []);

  const handleAdd = () => {
    navigate("/pokemon/add");
  };

  const filteredData = (inputValue) => {
    const filter = pokemons.filter((x) =>
      x.name.toLowerCase().startsWith((inputValue || "").toLowerCase())
    );
    setData(filter);
    setCurrentPage(1); // Réinitialise à la première page après un filtre
  };

  // Calcul des Pokémon affichés pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fonction pour gérer le changement de page avec Material-UI Pagination
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto min-h-screen bg-slate-100">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold py-6 md:py-8 lg:py-10">
          Pokédex
        </h1>

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

        <div className="container mx-auto my-3 px-4 md:px-8 lg:px-16 xl:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 py-6 md:py-8 lg:py-10">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="skeleton p-1 space-y-2 md:space-y-3 lg:space-y-4 flex flex-col h-36 bg-gray-300 animate-pulse"></div>
            ))
          ) : (
            currentData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          )}
        </div>

        {/* Pagination avec Material-UI */}
        <div className="flex justify-center my-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>

        <button
          onClick={handleAdd}
          className="fixed bottom-4 right-4 text-white w-12 h-12 bg-red-500 shadow-lg hover:shadow-2xl rounded-full flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
