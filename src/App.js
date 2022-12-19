import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import Info from './pages/Info';
import Pretrage from './pages/Pretrage';
import Kupi from './pages/Kupi';
import Prodaj from './pages/Prodaj';
import Profile from './pages/Profile';
// Components
import PrivateRoute from './components/PrivateRoute';
// CSS File
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Openroute from './components/Openroute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Openroute />} >
            <Route path='/' element={<Home />} />
            <Route path='/info' element={<Info />} />
            <Route path='/search' element={<Pretrage />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/buy' element={<Kupi />} />
            <Route path='/sell' element={<Prodaj />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
