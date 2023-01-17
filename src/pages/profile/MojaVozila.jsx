import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { cars } from '../../data/formSelectData';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';
import { useEffect } from 'react';

export const MojaVozila = () => {
	const { profileCars } = useContext(AppContext);

	const [ profileCarData, setProfileCarData ] = useState([]);
	const [ profileCarID, setProfileCarID ] = useState([]);

	useEffect(() => {
		getProfileCar();
	}, [])

	const getProfileCar = () => {
		const carDataArr = [];
		const carIDArr = [];

		profileCars.forEach((car) => {
			carDataArr.push(car.data);
			carIDArr.push(car.id);
		})

		setProfileCarData(carDataArr);
		setProfileCarID(carIDArr);
	}

	return (
		<div className="moja-vozila">
			<div className="nav">
				<h3>Količina: {profileCars.length}</h3>
				<div className="form-container">
					{/* Proizvodjac */}
					<div className="input-container">
						<select id="proizvodjac">
							<option value="">Proizvođač</option>
							{cars.map((car, index) => (
								<option key={index} value={car.name}>
									{car.name}
								</option>
							))}
						</select>
					</div>

					{/* Sortiraj */}
					<div className="input-container">
						<select id="sortiraj">
							<option value="najnovije">Najnovije prvo</option>
							<option value="najstarije">Najstarije prvo</option>
						</select>
					</div>
				</div>
			</div>
			<div className="moja-vozila-section">
				<div className="container">
					<div className="cars">
						{profileCarData &&
							profileCarData.map((car, index) => {
								return (
									<Link to={`/${profileCarID[index]}`} key={index}>
										<div className="car">
											<div className="image-section">
												<img src={car.storageImages[0]} alt="" />
											</div>
											<div className="info-section">
												<h3>{car.naslov_oglasa}</h3>
												<div className="details">
													<span>
														<FaCalendarAlt className="icon" /> {car.godiste}
													</span>
													<span>
														<GiGasPump className="icon" /> {car.gorivo}
													</span>
													<span>
														<FaRoad className="icon" /> {car.kilometraza}
													</span>
												</div>
												<div className="price">
													<span>{car.cijena} KM</span>
												</div>
											</div>
										</div>
									</Link>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
