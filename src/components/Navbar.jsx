import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import { HiUserCircle } from 'react-icons/hi';
import './css/navigation.css'
import ForgotPassword from './ForgotPassword';

function Navbar() {
  const [showModal, setShowModal ] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  
  const auth = getAuth();

  const showRegisterModal = () => {
    setShowRegister(true)
    setShowLogin(false);
    setShowModal(true);
    setShowForgot(false);
  }

  const showLoginModal = () => {
    setShowRegister(false)
    setShowLogin(true);
    setShowModal(true);
    setShowForgot(false);
  }

  const showForgotModal = () => {
    setShowForgot(true);
    setShowModal(false);
    setShowRegister(false)
    setShowLogin(true);
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
                      <Link to='/sell' className='link'>Prodaj</Link>
                      <Link to='/buy' className='link'>Kupi</Link>
                      {auth.currentUser ? 
                        <Link to='/profile' id='user' className='link'><HiUserCircle id="profile-icon" /> Moj Nalog</Link>
                        :
                        <>
                          <li><Link id='login' onClick={showLoginModal}><HiUserCircle id="profile-icon" /> Prijavi se</Link></li>
                          <li><Link id='register' onClick={showRegisterModal}>Napravi novi nalog</Link></li>
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
            <button onClick={showLoginModal} className={showLogin ? 'active' : ''}>
              <h5>Prijava</h5>
            </button>
            <button onClick={showRegisterModal} className={showRegister ? 'active' : ''}>
              <h5>Napravi novi nalog</h5>
            </button>
          </div>

          <div className={showRegister ? 'register-modal show' : 'register-modal'}>
            <h2>Napravi novi nalog sa emailom</h2>
            <Register onRegisterChange={setShowRegister} loginShow={setShowLogin} />
          </div>

          <div className={showLogin ? 'login-modal show' : 'login-modal'}>
            <h2>Prijavi se sa emailom</h2>
            <Login onLoginChange={setShowLogin} showForgotModal={showForgotModal} />
          </div>
        </div>
      </div>
      }

      {showForgot &&
        <div className="form">
          <div className="overlay"></div>
          <div className="form-section">
            <FaTimes id="closeModal" onClick={() => setShowForgot(false)} />
            <div className='forgot-modal'>
              <h3>Zaboravljena lozinka</h3>
              <h2>Unesite email za restart lozinke</h2>
              <ForgotPassword showLoginModal={showLoginModal} />
            </div>
          </div>
        </div>
      }

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </> 
  )
}

export default Navbar