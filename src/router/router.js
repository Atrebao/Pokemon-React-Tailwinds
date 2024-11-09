import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { isAuthenticated } from "../Guards/AuthGuard";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonAdd from "./pages/PokemonAdd";
import NavBar from "./components/NavBar";
import PokemonEdit from "./pages/PokemonEdit";
import Login from "./pages/Login";

const AppRoutes = () => {
  const location = useLocation();

  // Vérifie si l'utilisateur est sur la page de login
  const isLoginPage = location.pathname === "/login";

  const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      {!isLoginPage && <NavBar />}

      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/pokemons" element={<ProtectedRoute />}>
          <Route path="/pokemons" element={<PokemonList />} />
        </Route>

        <Route exact path="/pokemon/:id" element={<ProtectedRoute />}>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Route>
        <Route exact path="/pokemon/add" element={<ProtectedRoute />}>
          <Route path="/pokemon/add" element={<PokemonAdd />} />
        </Route>
        <Route exact path="/pokemon/edit/:id" element={<ProtectedRoute />}>
          <Route path="/pokemon/edit/:id" element={<PokemonEdit />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
