import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import Info from './pages/Info';
import Pretrage from './pages/Pretrage';
import Prodaj from './pages/Prodaj';
import Profile from './pages/Profile';
// Components
import PrivateRoute from './components/PrivateRoute';
// CSS File
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Openroute from './components/Openroute';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
      <Router>
        <AppContextProvider>
        <Routes>
          <Route path='/info' element={<Info />} />
          <Route path='/search' element={<Pretrage />} />
          
          <Route element={<Openroute />} >
            <Route path='/' element={<Home />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/sell' element={<Prodaj />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
        </AppContextProvider>
      </Router>
  );
}

export default App;
