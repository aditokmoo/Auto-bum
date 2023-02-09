import { useContext } from "react"
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"
import AppContext from "../../context/AppContext"
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';

export const RezultatiPretrage = () => {
    const { searchData, searchFormData } = useContext(AppContext);

    return (
        <>
            <Navbar />
            <div className="rezultati-pretrage">
                <div className="container">
                    <h1>Rezultati pretrage: <span>{searchFormData}</span></h1>
                    <div className="cars-container">
                        <div className="cars">
                        {searchData && 
                            searchData.map(({data: {storageImages, naslov_oglasa, lokacija_vozila, godiste, kilometraza, gorivo, cijena}, id}, index) => (
                                <Link to={`/${id}`} key={index} id='link'>
                                    <div className="car-item">
                                    <div className="image">
                                        <img src={storageImages[0]} alt="" />
                                    </div>
                                    <div className="car-info">
                                        <h3>{naslov_oglasa}</h3>
                                        <span>{lokacija_vozila}</span>
                                        <ul>
                                            <li><FaCalendarAlt /> {godiste}</li>
                                            <li><FaRoad /> {kilometraza}</li>
                                            <li><GiGasPump /> {gorivo}</li>
                                        </ul>
                                        <div className="price">
                                            <h2>{cijena} KM</h2>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}