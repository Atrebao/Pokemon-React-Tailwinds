import React, { useState } from "react";
import formatType from "../helpers/FormatType.js";
import PokemonForm from "../components/PokemonForm.jsx";

export default function PokemonAdd() {




  return (

    <div className="w-full min-h-screen bg-slate-100">
        <PokemonForm isEditForm ={false}  pokemon ={null}/>
    </div>
  );
}
