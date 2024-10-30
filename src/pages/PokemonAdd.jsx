import React, { useState } from "react";
import formatType from "../helpers/FormatType.js";

export default function PokemonAdd() {
  const [formData, setFormData] = useState({
    hp: "100",
    cp: "",
    name: "",
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png",
    types: [],
    created: "",
  });

  const typesPokemon = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type) => {
    return formData.types.includes(type);
  }

  const selectType = (type, e) => {
    const checked = e.target.checked;
    let newTypes;

    if(checked) {
      // Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon.
       newTypes = formData.types.concat([type]);
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
       newTypes = formData.types.filter((currentType) => currentType !== type);
      
    }

    setFormData({...formData, ...{ types: newTypes }});
  }

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

  };

  const handleSubmit = ()=>{
    console.log("Forms ", formData);
  }

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <h1 className="text-center text-3xl  md:text-4xl lg:text-5xl py-2 md:py-4 lg:py-6">
        Ajouter un pokemon
      </h1>
      <div className="w-10/12 md:w-2/5 lg:w-1/3 mx-auto bg-base-100 shadow-lg p-6 md:p-8 lg:p-10 rounded-xl ">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Image</span>
            </label>
            <input
              value={formData.picture}
              name="nomPrenoms"
              type="text"
              placeholder="Votre nom et prénoms"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("picture", e.target.value)}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Nom</span>
            </label>
            <input
              value={formData.name}
              name="nomPrenoms"
              type="text"
              placeholder="Votre nom et prénoms"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("name", e.target.value)}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Points de vies</span>
            </label>
            <input
              value={formData.hp}
              name="nomPrenoms"
              type="number"
              placeholder="Votre nom et prénoms"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("hp", e.target.value)}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Degats</span>
            </label>
            <input
              value={formData.cp}
              name="nomPrenoms"
              type="text"
              placeholder="Votre nom et prénoms"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("cp", e.target.value)}
            />
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text text-slate-600">Types</span>
            </label>
            <div className="grid md:grid-cols-2  lg:grid-cols-4">
              {typesPokemon.map((type, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer py-2">
                  <input
                    value={type}
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) =>
                      handleUpdate("conditonUtilisation", e.target.checked)
                    }
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
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl text-lg font-semibold mt-4 hover:bg-blue-600 transition-colors"
            >
              Soumettre
            </button>
        </form>
      </div>
    </div>
  );
}
