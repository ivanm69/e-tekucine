
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import Proizvodi from './pages/Proizvodi/Proizvodi'
import ProizvodiDodaj from './pages/Proizvodi/ProizvodiDodaj'
import ProizvodiPromjena from './pages/Proizvodi/ProizvodiPromjena'
import Proizvodjaci from './pages/Proizvodjaci/Proizvodjaci'
import ProizvodjaciDodaj from './pages/Proizvodjaci/ProizvodjaciDodaj'
import ProizvodjaciPromjena from './pages/Proizvodjaci/ProizvodjaciPromjena'
import Arome from './pages/Arome/Arome'
import AromeDodaj from './pages/Arome/AromeDodaj'
import AromePromjena from './pages/Arome/AromePromjena'
import ErrorModal from './components/ErrorModal'
import useError from './hooks/useError'
import LoadingSpinner from './components/LoadingSpinner'
import ParticleBack from './components/Particle'
import Login from "./pages/Login"
import useAuth from "./hooks/useAuth"
import NadzornaPloca from './pages/NadzornaPloca'





function App() {
  
  const { errors, prikaziErrorModal, sakrijError } = useError();
  const { isLoggedIn } = useAuth();
  return (
    <>
   <ParticleBack/>
     <LoadingSpinner/>
     <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
   <NavBar />
   <Routes>
   <Route path={RoutesNames.HOME} element={<Pocetna />} />
      {isLoggedIn ? (
        <>
        <Route path={RoutesNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

  <Route path={RoutesNames.HOME} element={<Pocetna/>}/>
  <Route path={RoutesNames.PROZIVOD_PREGLED} element={<Proizvodi/>}/>
  <Route path={RoutesNames.PROIZVOD_NOVI} element={<ProizvodiDodaj/>}/>
  <Route path={RoutesNames.PROIZVOD_PROMJENI}element={<ProizvodiPromjena/>}/>
  <Route path={RoutesNames.PROZIVODJAC_PREGLED} element={<Proizvodjaci/>}/>
  <Route path={RoutesNames.PROIZVODJAC_NOVI} element={<ProizvodjaciDodaj/>}/>
  <Route path={RoutesNames.PROIZVODJAC_PROMJENI}element={<ProizvodjaciPromjena/>}/>
  <Route path={RoutesNames.AROMA_PREGLED}element={<Arome/>}/>
  <Route path={RoutesNames.AROMA_NOVI}element={<AromeDodaj/>}/>
  <Route path={RoutesNames.AROMA_PROMJENI}element={<AromePromjena/>}/>
  </>
        ) : (
          <>
            <Route path={RoutesNames.LOGIN} element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
