import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AppContext from '../context/AppContext';
import { UrediProfil } from './profile/UrediProfil';
import { MojaVozila } from './profile/MojaVozila';
import { SpaseniArtikli } from './profile/SpaseniArtikli';
import './css/profile.css'
import './css/mobile/profile-res.css'

const Profile = () => {
    const { userData, getUserCollection, logOut } = useContext(AppContext);
    const [ activeTab, setActiveTab ] = useState(0);

    useEffect(() => {
        // Calling USER Collection function
        getUserCollection();
    }, [])

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <Navbar />
            {userData &&
                <section className="profile">
                    <div className="container">
                        <h1>Moj Nalog</h1>
                        <div className="profile-section">
                            <div className="section-1">
                                <div className="profile-head">
                                    <div className="img-box">
                                        <img src="https://www.autobum.ba/img/avatar.png" alt="" />
                                    </div>
                                    <div className="profile-text-head">
                                        <h3>{userData.reg_name + ' ' + userData.reg_lname}</h3>
                                        <h4>{userData.reg_city}</h4>
                                    </div>
                                </div>
                                <ul>
                                    <li><Link className={activeTab === 0 ? 'link active' : 'link'} onClick={() => handleTabClick(0)}>Moja vozila</Link></li>
                                    <li><Link to='/poruke' className='link'>Poruke</Link></li>
                                    <li><Link className={activeTab === 1 ? 'link active' : 'link'} onClick={() => handleTabClick(1)}>Spašeni artikli</Link></li>
                                    <li><Link className={activeTab === 2 ? 'link active' : 'link'} onClick={() => handleTabClick(2)}>Uredi profil</Link></li>
                                    <li><Link to='/' className='link' onClick={logOut}>Odjavi se</Link></li>
                                </ul>
                            </div>

                            <div className="section-2">
                                <div className={activeTab === 0 ? 'section active' : 'section'}>
                                    <MojaVozila />
                                </div>
                                <div className={activeTab === 1 ? 'section active' : 'section'}>
                                    <SpaseniArtikli />
                                </div>
                                <div className={activeTab === 2 ? 'section active' : 'section'}>
                                    <UrediProfil />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default Profile