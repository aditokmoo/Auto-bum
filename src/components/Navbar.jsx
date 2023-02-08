import { useContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import { LoginMobile } from './LoginMobile';
import { RegisterMobile } from './RegisterMobile';
import ForgotPassword from './ForgotPassword';
import { HiUserCircle } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineSearch, AiFillHome, AiOutlineLock, AiOutlineInfoCircle } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi'
import { BsArrowLeftShort, BsInstagram, BsYoutube } from 'react-icons/bs'
import { MdMessage, MdOutlinePermContactCalendar } from 'react-icons/md'
import { GrFormClose } from 'react-icons/gr'
import { TiSocialFacebookCircular } from 'react-icons/ti'
import AppContext from '../context/AppContext';
import Spinner from '../shared/Spinner';
import './css/navigation.css'
import './css/mobile/nav-res.css'
import { MobileForgotPassword } from './MobileForgotPassword';

const Navbar = () => {
  const { showOverlay, handleSearchSubmit, handleSearchChange, searchModal, setSearchModal } = useContext(AppContext);
  const [ activeTab, setActiveTab ] = useState(0);
  const [ showSideBar, setShowSideBar ] = useState(false);
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
      document.body.style.overflowY = 'hidden';
    }
  }

  useEffect(() => {
    if(!showMobileModal) {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  return (
    <>
      <nav>
        <div className="container">
            <div className="nav-section">
                <div className="mobile-top-nav">
                  <BiMenu className='icon menu' onClick={() => setShowSideBar(true)} />
                  <h2><Link to={auth.currentUser ? '/home' : '/'} style={{textDecoration: 'none', color: '#000'}}>Auto <span>Bum.</span></Link></h2>
                  <AiOutlineSearch className='icon search' onClick={() => setSearchModal(true)} />
                </div>

                <ul className='f-list'>
                  <Link to='/info' className='link'>Informacije</Link>
                  <Link to='/search' className='link'>Pretrage</Link>
                  <Link to={auth.currentUser && '/sell'} onClick={checkAuth} className='link'>Prodaj</Link>
                  {auth.currentUser && 
                    <Link to='/profile' id='user' className='link'><HiUserCircle id="profile-icon" /> Moj Nalog</Link>
                  }

                  {!auth.currentUser &&
                  <>
                  <li><Link id='login' onClick={() => handleTabClick(0)}><HiUserCircle id="profile-icon" /> Prijavi se</Link></li>
                  <li><Link id='register' onClick={() => handleTabClick(1)}>Napravi novi nalog</Link></li>
                </>}
                </ul> 
            </div>

            {showSideBar &&
              <div className="mobile-side-nav">
                <div className="overlay"></div>
                <div className="side-nav">
                  <h2>Auto <span>Bum.</span></h2>
                  <GrFormClose id='close-icon' onClick={() => setShowSideBar(false)} />
                <ul>
                  <li><MdOutlinePermContactCalendar id='icon' /><Link to='/contact' id='link'> Kontaktirajte nas</Link></li>
                  <li><TiSocialFacebookCircular id='icon' /><a href='https://www.facebook.com/AUTOBUM.BA/' id='link'> Facebook stranica</a></li>
                  <li><BsInstagram id='icon' /><a href='https://www.instagram.com/autobum.ba/' id='link'> Instagram stranica</a></li> 
                  <li><BsYoutube id='icon' /><a href='https://www.youtube.com/channel/UC5e6tcbNkUSD6sv38SYjX9Q' id='link'> Youtube kanal</a></li> 
                  <li><AiOutlineLock id='icon' /><Link to='/politika-privatnosti' id='link'> Politika privatnosti</Link></li>
                </ul>
                <li><AiOutlineInfoCircle id='icon' /><Link to='/info' id='link'> O aplikaciji</Link></li>
              </div>
              </div>
            }

            <div className={window.location.pathname === '/sell' ? "mobile-nav deactivated" : "mobile-nav"}>
              <ul>
                <li><Link to='/home' className={window.location.pathname === '/home' || window.location.pathname === '/' ? 'link active' : 'link'}><AiFillHome id='icon' /> Početna</Link></li>
                <li><Link to='/search' className={window.location.pathname === '/search' ? 'link active' : 'link'}><AiOutlineSearch id='icon' /> Pretraga</Link></li>
                <li><Link to={auth.currentUser && '/sell'} onClick={checkMobileAuth} className={window.location.pathname === '/sell' ? 'link active' : 'link'}><HiPlus id='icon' /> Objavi oglas</Link></li>
                <li><Link to={auth.currentUser && '/poruke'} onClick={checkMobileAuth} className={window.location.pathname === '/poruke' ? 'link active' : 'link'}><MdMessage id='icon' /> Poruke</Link></li>
                <li><Link to={auth.currentUser && '/profile'} onClick={checkMobileAuth} className={window.location.pathname === '/profile' ? 'link active' : 'link'}><HiUserCircle id='icon' /> Moj Nalog</Link></li>
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
            <LoginMobile handleTabClick={handleTabClick} />
        </div>

        <div className={activeTab === 1 ? 'mobile-register-modal show' : 'mobile-register-modal'}>
            <RegisterMobile />
        </div>

        <div className={activeTab === 2 ? 'mobile-forgot-password-modal show' : 'mobile-forgot-password-modal'}>
          <MobileForgotPassword />
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

      {searchModal &&
        <div className="search-modal">
          <div className="input">
              <BsArrowLeftShort id='icon' onClick={() => setSearchModal(false)} />
              <form onSubmit={handleSearchSubmit}>
                <input type="text" placeholder='Ukucajte pretragu' onChange={handleSearchChange} />
              </form>
          </div>
        </div>
      }

      {showForgotModal &&
        <div className="form">
          <div className="overlay"></div>
          <div className="form-section desktop">
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