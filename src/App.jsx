import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import PokemonList from './pages/PokemonList'
import PokemonDetails from './pages/PokemonDetails'
import PokemonAdd from './pages/PokemonAdd'
import NavBar from './components/NavBar'
import PokemonEdit from './pages/PokemonEdit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<PokemonList/>}/>
          <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
          <Route path='/pokemon/add' element={<PokemonAdd/>}/>
          <Route path='/pokemon/edit/:id' element={<PokemonEdit/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
