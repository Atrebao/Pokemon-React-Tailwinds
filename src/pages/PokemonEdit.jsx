import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPokemon } from "../services/PokemonService";
import PokemonForm from "../components/PokemonForm";

export default function PokemonEdit() {
  const [pokemon, setPokemon] = useState();
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    try {
      getPokemon(id)
        .then((response) => {
          if (response.status === 200) {
            setPokemon(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-slate-100">
       <PokemonForm pokemon={pokemon} isEditForm={true} /> 
    </div>
  );
}
