import { useContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { HiUserCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import AppContext from '../context/AppContext';
import Spinner from '../shared/Spinner';
import './css/navigation.css'

const Navbar = () => {
  const { showOverlay } = useContext(AppContext);
  const [ activeTab, setActiveTab ] = useState(0);
  const [showModal, setShowModal ] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const auth = getAuth();

  // Login and Register modal
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowModal(true)
    setShowForgotModal(false);
  }

  // Forgot password modal
  const handleForgotModal = () => {
    setShowForgotModal(true);
    setShowModal(false);
  }

  // Set login modal active if user is not signed in
  const checkAuth = () => {
    if(!auth.currentUser) {
      setShowModal(true);
    }
  }

  return (
    <>
      <nav>
        <div className="container">
            <div className="nav-section">
                <h2><Link to={auth.currentUser ? '/home' : '/'} style={{textDecoration: 'none', color: '#000'}}>Auto <span>Bum.</span></Link></h2>
                  <ul className='f-list'>
                    <Link to='/info' className='link'>Informacije</Link>
                    <Link to='/search' className='link'>Pretrage</Link>
                    <Link to={auth.currentUser && '/sell'} onClick={checkAuth} className='link'>Prodaj</Link>
                    {auth.currentUser ? 
                      <Link to='/profile' id='user' className='link'><HiUserCircle id="profile-icon" /> Moj Nalog</Link>
                      :
                      <>
                        <li><Link id='login' onClick={() => handleTabClick(0)}><HiUserCircle id="profile-icon" /> Prijavi se</Link></li>
                        <li><Link id='register' onClick={() => handleTabClick(1)}>Napravi novi nalog</Link></li>
                      </>
                    }
                  </ul> 
            </div>
        </div>
      </nav>
      
      {showModal &&
      <div className="form">
        <div className="overlay"></div>
        <div className="form-section">
          <FaTimes id="closeModal" onClick={() => setShowModal(false)} />
          <div className="form_nav">
            <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>
              <h5>Prijava</h5>
            </button>
            <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
              <h5>Napravi novi nalog</h5>
            </button>
          </div>

          <div className={`register-modal ${activeTab === 1 ? 'show': ''}`}>
            <h2>Napravi novi nalog sa emailom</h2>
            <Register />
          </div>

          <div className={`login-modal ${activeTab === 0 ? 'show': ''}`}>
            <h2>Prijavi se sa emailom</h2>
            <Login handleForgotModal={handleForgotModal} />
          </div>
        </div>
      </div>
      }

      {showForgotModal &&
        <div className="form">
          <div className="overlay"></div>
          <div className="form-section">
            <FaTimes id="closeModal" onClick={() => setShowForgotModal(false)} />
            <div className='forgot-modal'>
              <h3>Zaboravljena lozinka</h3>
              <h2>Unesite email za restart lozinke</h2>
              <ForgotPassword handleTabClick={handleTabClick} />
            </div>
          </div>
        </div>
      }

      {showOverlay && 
				<div className="overlay">
					<Spinner />
				</div>
			}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </> 
  )
}

export default Navbar