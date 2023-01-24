import { useEffect } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import avatar_image from './images/avatar-image.png'
import './css/userDetails.css'

export const UserDetails = () => {
    const [ userDetails, setUserDetails ] = useState();
    const params = useParams();

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const userDoc = doc(db, 'users', params.user);
        const getUserDoc = await getDoc(userDoc);
        const data = getUserDoc.data();

        setUserDetails(data);
    }

    return (
        <>
            <div className="details">
                <div className="nav">
                    <Link to="/home" id="back-icon">
                        <BsArrowLeft />
                    </Link>
                    <h3>Profil korisnika</h3>
                </div>
            </div>
            <div className="userDetails">
                <div className="container">
                    {userDetails &&
                        <div className="user-section">
                            <h1>{userDetails.reg_name + ' ' + userDetails.reg_lname}</h1>
                             <div className="user">
                                <div className="image">
                                    <img src={avatar_image} alt="" />
                                </div>
                                <div className="details">
                                    <ul>
                                        <li>
                                            <p>Lokacija</p>
                                            <p>{userDetails.reg_city}</p>
                                        </li>
                                        <li>
                                            <p>Adresa</p>
                                            <p>Nije navedeno</p>
                                        </li>
                                        <li>
                                            <p>Telefon</p>
                                            <p>{userDetails.reg_number}</p>
                                        </li>
                                        <li>
                                            <p>Tip korisnika</p>
                                            <p>Korisnik</p>
                                        </li>
                                    </ul>
                                    <button className="btn" onClick={() => alert('Nije u funkciji')}>Pošalji poruku</button>
                                </div>
                             </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}