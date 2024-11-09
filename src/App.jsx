import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonAdd from "./pages/PokemonAdd";
import NavBar from "./components/NavBar";
import PokemonEdit from "./pages/PokemonEdit";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  // Vérifie si l'utilisateur est sur la page de login
  const isLoginPage = location.pathname === "/login";
  const isNotFoundPage = location.pathname === "*";

  return (
    <>
    
      {(!isLoginPage && !isNotFoundPage) ? <NavBar /> : <div></div>}
      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route path="/" element={<PokemonList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/pokemon/add" element={<PokemonAdd />} />
        <Route path="/pokemon/edit/:id" element={<PokemonEdit />} />
      </Routes>
    </>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
