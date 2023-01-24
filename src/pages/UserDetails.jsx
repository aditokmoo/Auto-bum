import { useEffect } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import { BsArrowLeft } from 'react-icons/bs';

export const UserDetails = () => {

    const params = useParams();

    useEffect(() => {
        console.log(params.user)
    }, [])

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
        </>
    )
}