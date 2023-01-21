import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import { RezultatiPretrage } from './pages/home/RezultatiPretrage';
import Info from './pages/Info';
import Pretrage from './pages/Pretrage';
import Prodaj from './pages/Prodaj';
import Profile from './pages/Profile';
// Components
import { AppContextProvider } from './context/AppContext';
import { CarDetails } from './pages/CarDetails';
import PrivateRoute from './components/PrivateRoute';
import Openroute from './components/Openroute';
// CSS File
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <Router>
        <AppContextProvider>
        <Routes>
          <Route path='/info' element={<Info />} />
          <Route path='/search' element={<Pretrage />} />
          <Route path='/rezultati-pretrage' element={<RezultatiPretrage />} />
          
          <Route element={<Openroute />} >
            <Route path='/' element={<Home />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/sell' element={<Prodaj />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/:car' element={<CarDetails />} />
          </Route>
        </Routes>
        </AppContextProvider>
      </Router>
  );
}

export default App;
