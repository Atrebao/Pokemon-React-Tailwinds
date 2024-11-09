import React, { useState, useEffect } from "react";
import pokemon_ball from "../assets/images/pokemon_ball.png";
import { login } from "../authentification/AuthRequest";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
    username: { value: "", isValid: true, error: "emilys" },
    password: { value: "", isValid: true, error: "emilyspass" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], value, isValid: true }, // Réinitialise isValid lors de la saisie
    }));
  };

  const connexion = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut

    // Validation simple avant d'envoyer les données
    const isUsernameValid = formData.username.value.trim() !== "";
    const isPasswordValid = formData.password.value.trim() !== "";

    if (!isUsernameValid || !isPasswordValid) {
      setFormData({
        username: { ...formData.username, isValid: isUsernameValid },
        password: { ...formData.password, isValid: isPasswordValid },
      });
      return; // Arrête la fonction si les champs sont invalides
    }

    setIsLoading(true);
    login(formData.username.value, formData.password.value)
      .then((response) => {
        setIsLoading(false);
        if (response.data) {
          localStorage.setItem(
            "access_token",
            res.data.accessToken
          );
          navigate("/pokemons");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-teal-500">
      <div className="mt-10 py-5 w-44 md:w-48 lg:w-52">
        <img src={pokemon_ball} className="w-full h-auto" alt="Pokeball" />
      </div>
      <div className="bg-white w-[450px] h-fit rounded-lg shadow-2xl p-5">
        <h1 className="text-center text-2xl font-bold py-5">Login</h1>
        <form onSubmit={connexion}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Username</span>
            </label>
            <input
              value={formData.username.value}
              name="username"
              type="text"
              placeholder="emilys"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("username", e.target.value)}
            />
            {!formData.username.isValid && (
              <span className="text-red-500">username : {formData.username.error}</span>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-slate-600">Password</span>
            </label>
            <input
              value={formData.password.value}
              name="password"
              type="password" // Change le type en "password" pour masquer la saisie
              placeholder="emilyspass"
              className="input input-bordered w-full"
              required
              onChange={(e) => handleUpdate("password", e.target.value)}
            />
            {!formData.password.isValid && (
              <span className="text-red-500">password : {formData.password.error}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-7 p-3 rounded-md bg-teal-500 hover:bg-teal-600 text-white"
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}