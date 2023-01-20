import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';
import AppContext from '../../context/AppContext';
import { useEffect } from 'react';

export const Cars = ({filterCarData}) => {
	const { carsData, carID } = useContext(AppContext);
	const { cars, setCars } = useState();

	return (
		<div className="cars">
			{carsData &&
				carsData.map(({data: { storageImages, naslov_oglasa, godiste, gorivo, kilometraza, cijena}}, index) => (
					<Link to={`/${carID[index]}`} key={index} id='car-link'>
						<div className="car">
							<div className="image-section">
								<img src={storageImages[0]} alt="" />
							</div>
							<div className="info-section">
								<h3>{naslov_oglasa}</h3>
								<div className="details">
									<span>
										<FaCalendarAlt className="icon" /> {godiste}
									</span>
									<span>
										<GiGasPump className="icon" /> {gorivo}
									</span>
									<span>
										<FaRoad className="icon" /> {kilometraza}
									</span>
								</div>
								<div className="price">
									<span>{cijena} KM</span>
								</div>
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};
