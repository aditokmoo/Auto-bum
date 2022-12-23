import { useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AppContext from '../context/AppContext';
import './css/profile.css'

const Profile = () => {
    const { userData, getCollection, logOut } = useContext(AppContext);
    const auth = getAuth();

    useEffect(() => {
        // Calling USER Collection function
        getCollection();
    }, [])

    return (
        <>
            <Navbar />
            {userData &&
                <section className="profile">
                    <div className="container">
                        <h1>Moj Nalog</h1>
                        <div className="profile-section">
                            <div className="section-1">
                                <div className="img-box">
                                    <img src="https://www.autobum.ba/img/avatar.png" alt="" />
                                </div>
                                <h3>{userData.reg_name}</h3>
                                <h4>{userData.reg_city}</h4>
                                <ul>
                                    <li><Link className='link active'>Moja vozila</Link></li>
                                    <li><Link className='link'>Poruke</Link></li>
                                    <li><Link className='link'>Spašeni artikli</Link></li>
                                    <li><Link className='link'>Uredi profil</Link></li>
                                    <li><Link to='/' className='link' onClick={logOut}>Odjavi se</Link></li>
                                </ul>
                            </div>
                            <div className="section-2"></div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Profile