import React, { useState, useEffect } from "react";
import formatType from "../helpers/FormatType.js";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import {
  addPokemon,
  updatePokemon,
  getPokemons,
} from "../services/PokemonService.js";
import { Link, useNavigate } from "react-router-dom";

export default function PokemonForm({ isEditForm, pokemon }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    picture: { value: pokemon ? pokemon.picture : "", isValid: true },
    name: { value: pokemon ? pokemon.name : "", isValid: true },
    hp: { value: pokemon ? pokemon.hp : "", isValid: true },
    cp: { value: pokemon ? pokemon.cp : "", isValid: true },
    types: { value: pokemon ? pokemon.types : [], isValid: true },
  });

  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    try {
      getPokemons()
        .then((response) => {
          if (response.status === 200) {
            setPokemons(response.data);
          }
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
    if (pokemon) {
      setFormData({
      picture: { value: pokemon ? pokemon.picture : "", isValid: true },
      name: { value: pokemon ? pokemon.name : "", isValid: true },
      hp: { value: pokemon ? pokemon.hp : "", isValid: true },
      cp: { value: pokemon ? pokemon.cp : "", isValid: true },
      types: { value: pokemon ? pokemon.types : [], isValid: true },
    })
    }
  }, [pokemon]);

  const typesPokemon = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type) => formData.types.value.includes(type);

  const selectType = (type, e) => {
    const checked = e.target.checked;
    const newTypes = checked
      ? [...formData.types.value, type]
      : formData.types.value.filter((currentType) => currentType !== type);

    setFormData((prev) => ({
      ...prev,
      types: {
        value: newTypes,
        isValid: newTypes.length > 0 && newTypes.length <= 3,
      },
    }));
  };

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const isTypesValid = (type) => {
    if (formData.types.value.length === 1 && hasType(type)) {
      return false;
    }
    if (formData.types.value.length >= 3 && !hasType(type)) {
      return false;
    }
    return true;
  };

  const handleExit = () => {
    window.history.back();
  };

  const isAddForm = () => !isEditForm;

  const validateForm = () => {
    let newForm = formData;

    // Validator url
    if (isAddForm()) {
      const start =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if (
        !formData.picture.value.startsWith(start) ||
        !formData.picture.value.endsWith(end)
      ) {
        const errorMsg = "L'url n'est pas valide.";
        const newField = {
          value: formData.picture.value,
          error: errorMsg,
          isValid: false,
        };
        newForm = { ...newForm, ...{ picture: newField } };
      } else {
        const newField = {
          value: form.picture.value,
          error: "",
          isValid: true,
        };
        newForm = { ...newForm, ...{ picture: newField } };
      }
    }

    // Validator name
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(formData.name.value)) {
      const errorMsg = "Le nom du pokémon est requis (1-25).";
      const newField = {
        value: formData.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField = { value: formData.name.value, error: "", isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator hp
    if (!/^[0-9]{1,3}$/.test(formData.hp.value)) {
      const errorMsg =
        "Les points de vie du pokémon sont compris entre 0 et 999.";
      const newField = {
        value: formData.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField = { value: formData.hp.value, error: "", isValid: true };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    // Validator cp
    if (!/^[0-9]{1,2}$/.test(formData.cp.value)) {
      const errorMsg = "Les dégâts du pokémon sont compris entre 0 et 99";
      const newField = {
        value: formData.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField = { value: formData.cp.value, error: "", isValid: true };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setFormData(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  };

  const cleanForms = () => {
    setFormData({
      picture: { value: "", isValid: true },
      name: { value: "", isValid: true },
      hp: { value: "", isValid: true },
      cp: { value: "", isValid: true },
      types: { value: [], isValid: true },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    
    if (isFormValid) {
      const tempNewPokemon = {
        id : pokemon.id,
        name: formData.name.value,
        picture: formData.picture.value,
        hp: formData.hp.value,
        cp: formData.cp.value,
        types: formData.types.value,
      };

      if (isEditForm) {
        try {
          updatePokemon(tempNewPokemon)
            .then((response) => {
              if (response.data) {
                toast.success("Mise à jour succès");
                navigate("/");
              }
            })
            .catch((err) => {
              toast.error(err.response.data);

              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        const duplicate = pokemons.some(
          (p) => p.name.toLowerCase() === formData.name.value.toLowerCase()
        );

        if (!duplicate) {
          try {
            addPokemon(tempNewPokemon)
              .then((response) => {
                if (response.status == 201) {
                  toast.success("Enregistré avec  succès");
                  navigate("/");
                  cleanForms();
                }
              })
              .catch((err) => {
                if (err.response) {
                  toast.error(err.response.data);
                } else {
                }
                console.log("api error", err);
              });
          } catch (error) {
            console.error("Error updating Pokémon:", error);
            throw error;
          }
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl py-2 md:py-4 lg:py-6">
        {isAddForm() ? "Ajouter un Pokémon" : "Modifier le Pokémon"}
      </h1>
      <div className="w-10/12 md:w-2/5 lg:w-1/3 mx-auto bg-base-100 shadow-lg p-6 md:p-8 lg:p-10 rounded-xl">
        <form onSubmit={handleSubmit}>
          {isEditForm && pokemon && (
            <div
              className="mx-auto w-32 md:w-52 lg:w-60 rounded-lg overflow-hidden hover:scale-105 duration-300"
              style={{ backgroundColor: formatType(pokemon.types[0]) }}
            >
              <img
                src={pokemon?.picture}
                alt={pokemon?.name}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {isAddForm() && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-slate-600">Image</span>
              </label>
              <input
                value={formData.picture.value}
                name="picture"
                type="text"
                placeholder="URL de l'image du Pokémon"
                className="input input-bordered w-full"
                required
                onChange={(e) => handleUpdate("picture", e.target.value)}
              />
              {formData.picture.error && (
                <small className="text-red-500">{formData.picture.error}</small>
              )}
            </div>
          )}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Nom</span>
            </label>
            <input
              value={formData.name.value}
              name="name"
              type="text"
              placeholder="Nom du Pokémon"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("name", e.target.value)}
            />
          </div>
          {pokemon && (
            <small className="text-red-500">{formData.name.value}</small>
          )}
          {formData.name.error && (
            <small className="text-red-500">{formData.name.error}</small>
          )}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Points de vie</span>
            </label>
            <input
              value={formData.hp.value}
              name="hp"
              type="number"
              placeholder="Points de vie du Pokémon"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("hp", e.target.value)}
            />
          </div>
          {formData.name.error && (
            <small className="text-red-500">{formData.hp.error}</small>
          )}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Dégâts</span>
            </label>
            <input
              value={formData.cp.value}
              name="cp"
              type="number"
              placeholder="Dégâts du Pokémon"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("cp", e.target.value)}
            />
          </div>
          {formData.name.error && (
            <small className="text-red-500">{formData.cp.error}</small>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text text-slate-600">Types</span>
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {typesPokemon.map((type, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer py-2"
                >
                  <input
                    value={type}
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={hasType(type)}
                    disabled={!isTypesValid(type)}
                    onChange={(e) => selectType(type, e)}
                  />
                  <span
                    className="p-1 px-3 text-center rounded-full text-sm md:text-base"
                    style={{ backgroundColor: formatType(type) }}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-end mt-5 gap-2">
            <div
              onClick={handleExit}

              className=" bg-red-500  text-white p-5 py-2 rounded-xl text-lg font-semibold mt-4 hover:bg-red-600 transition-colors cursor-pointer"
            >
              Annuler
            </div>
            <button
              type="submit"
              className=" bg-blue-500 text-white p-5 py-2 rounded-xl text-lg font-semibold mt-4 hover:bg-blue-600 transition-colors"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
