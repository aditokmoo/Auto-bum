import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import { RezultatiPretrage } from './pages/home/RezultatiPretrage';
import Info from './pages/Info';
import Pretrage from './pages/Pretrage';
import Prodaj from './pages/Prodaj';
import Profile from './pages/Profile';
import { PolitikaPrivatnosti } from './pages/PolitikaPrivatnosti';
import { Contact } from './pages/Contact';
// Components
import { AppContextProvider } from './context/AppContext';
import { CarDetails } from './pages/CarDetails';
import { UserDetails } from './pages/UserDetails';
import PrivateRoute from './components/PrivateRoute';
import Openroute from './components/Openroute';
import { Poruke } from './components/Poruke';
// CSS File
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

function App() {
  return (
      <Router>
        <AppContextProvider>
          <Routes>
            <Route element={<Openroute />} >
              <Route path='/' element={<Home />} />
              <Route path='/info' element={<Info />} />
              <Route path='/search' element={<Pretrage />} />
              <Route path='/rezultati-pretrage' element={<RezultatiPretrage />} />
              <Route path='/user/:user' element={<UserDetails />} />
              <Route path='/user/:user/:car' element={<CarDetails />} />
              <Route path='/:car' element={<CarDetails />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/politika-privatnosti' element={<PolitikaPrivatnosti />} />
            </Route>
            
            <Route element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/sell' element={<Prodaj />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/poruke' element={<Poruke />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </Router>
  );
}

export default App;
