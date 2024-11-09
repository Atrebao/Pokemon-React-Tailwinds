import axios from "axios";

export const BASE_URL = "http://localhost:3001/pokemons";

// Récupérer la liste de tous les Pokémons
export const getPokemons = async () => {
  return await axios.get(BASE_URL);
};

// Récupérer un Pokémon spécifique par ID
export const getPokemon = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

// Ajouter un nouveau Pokémon
export const addPokemon = async (pokemon) => {
  return await axios.post(BASE_URL, pokemon, {
    headers: { "Content-Type": "application/json" },
  });
};

// Mettre à jour un Pokémon existant
export const updatePokemon = async (pokemon) => {
  return await axios.put(`${BASE_URL}/${pokemon.id}`, pokemon, {
    headers: { "Content-Type": "application/json" },
  });
};

// Supprimer un Pokémon par ID
export const deletePokemon = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};
