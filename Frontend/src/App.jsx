import { useState } from 'react'
import reactLogo from './assets/react.svg'
import mojLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import Proizvodi from './pages/Proizvodi/Proizvodi'
import ProizvodiDodaj from './pages/Proizvodi/ProizvodiDodaj'



function App() {
 

  return (
    <>
   <NavBar />
   <Routes>
  <Route path={RoutesNames.HOME} element={<Pocetna/>}/>
  <Route path={RoutesNames.PROZIVOD_PREGLED} element={<Proizvodi/>}/>
  <Route path={RoutesNames.PROIZVOD_NOVI} element={<ProizvodiDodaj/>}/>
      </Routes>           
      
      
       
    </> 
  )
}

export default App
