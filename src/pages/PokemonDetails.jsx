import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pen } from "lucide-react";
import formatType from "../helpers/FormatType.js";
import formatDate from "../helpers/FormatDate.js";

export default function PokemonDetails() {
  const location = useLocation();
  const pokemon = location.state;
  console.log(pokemon);
  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col items-center">
      <h1 className="text-center text-3xl font-light md:text-6xl lg:text-7xl py-6 md:py-8 lg:py-10">
        {pokemon?.name}
      </h1>
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto bg-base-100 shadow-sm p-6 md:p-8 lg:p-10 rounded-lg ">
        <div
          className="mx-auto w-32 md:w-52 lg:w-60 rounded-lg overflow-hidden hover:scale-105 duration-300 "
          style={{ backgroundColor: formatType(pokemon.types[0]) }}
        >
          <img
            src={pokemon.picture}
            alt={pokemon?.name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex justify-end mt-4  ">
          <Pen
            color="#fff"
            size={45}
            className="p-2 rounded-2xl bg-teal-600 cursor-pointer  "
          />
        </div>
        <div className="text-center mt-6">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                 
                  <th>Nom</th>
                  <th>Points de vie</th>
                  <th>Degats</th>
                  <th>Types</th>
                  <th>DateCreation</th>

                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                 
                  <td>{pokemon.name}</td>
                  <td>{pokemon.hp}</td>
                  <td>{pokemon.cp}</td>
                  <td>{pokemon.types.map((type, index) =>(
                    <span className="p-1 px-3 text-center rounded-full text-sm md:text-base"  style={{ backgroundColor: formatType(type) }}> {type}</span>
                  ))}</td>
                  <td>{formatDate(pokemon.created)}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
