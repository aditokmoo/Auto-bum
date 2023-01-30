import { useContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { HiUserCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi'
import { BsArrowLeftShort } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'
import AppContext from '../context/AppContext';
import Spinner from '../shared/Spinner';
import './css/navigation.css'
import './css/mobile/nav-res.css'
import { LoginMobile } from './LoginMobile';

const Navbar = () => {
  const { showOverlay } = useContext(AppContext);
  const [ activeTab, setActiveTab ] = useState(0);
  const [showModal, setShowModal ] = useState(false);
  const [showMobileModal, setShowMobileModal ] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const auth = getAuth();

  // Login and Register modal
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowMobileModal(false)
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

  const checkMobileAuth = () => {
    if(!auth.currentUser) {
      setShowMobileModal(true)
    }
  }

  return (
    <>
      <nav>
        <div className="container">
            <div className="nav-section">
                <BiMenu className='icon menu' />
                <h2><Link to={auth.currentUser ? '/home' : '/'} style={{textDecoration: 'none', color: '#000'}}>Auto <span>Bum.</span></Link></h2>
                <AiOutlineSearch className='icon search' />

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

            <div className={window.location.pathname === '/sell' ? "mobile-nav deactivated" : "mobile-nav"}>
              <ul>
                <li><Link to='/home' className='link active'><AiFillHome id='icon' /> Početna</Link></li>
                <li><Link to='/search' className='link'><AiOutlineSearch id='icon' /> Pretraga</Link></li>
                <li><Link to={auth.currentUser && '/sell'} onClick={checkMobileAuth} className='link'><HiPlus id='icon' /> Objavi oglas</Link></li>
                <li><Link to='/poruke' className='link'><MdMessage id='icon' /> Poruke</Link></li>
                <li><Link to='/profile' className='link'><HiUserCircle id='icon' /> Moj Nalog</Link></li>
              </ul>
            </div>
        </div>
      </nav>
      
      {showModal &&
      <div className="form">
        <div className="overlay"></div>
        <div className="form-section desktop">
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

        <div className={activeTab === 0 ? 'mobile-login-modal show' : 'mobile-login-modal'}>
            <LoginMobile />
        </div>
      </div>
      }

      {showMobileModal &&
      <div className="form">
        <div className="form-section mobile">
            <Link to='/home'><BsArrowLeftShort id='icon' /></Link>
             <h2>Auto <span>Bum.</span></h2>
             <p>Niste prijavljeni. Da bi ste nastavili izaberite jednu od opcija.</p>
             <div className="btns">
                <div>
                  <button className='btn login' onClick={() => handleTabClick(0)}>Prijavi se</button>
                  <p><span>Imam</span> nalog</p>
                </div>
                <div>
                  <button className='btn register' onClick={() => handleTabClick(1)}>Napravi novi nalog</button>
                  <p><span>Nemam</span> nalog</p>
                </div>
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