import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import './css/profile.css'

const Profile = () => {
    const [ userData, setUserData ] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        getCollection();
    }, [])

    // Get User Data
    const getCollection = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if(doc.id === user.uid) {
                setUserData(doc.data());
            }
        });
    }

    // Logout function
    const logOut = () => {
        try {
            auth.signOut();
            navigate('/')            
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

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
                                <h3>{userData.reg_username}</h3>
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