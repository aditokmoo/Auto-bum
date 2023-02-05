import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { cars } from '../../data/formSelectData';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';
import { useEffect } from 'react';

export const MojaVozila = () => {
	const { profileCars, handleProfileCarsFilter, profileFilterCars, setProfileFilterCars } = useContext(AppContext);

	const [ profileCar, setProfileCar ] = useState([]);

	useEffect(() => {
		getProfileCar();
		setProfileFilterCars(null)
	}, [])

	const getProfileCar = () => {
		const carData = [];

		profileCars.forEach(({data, id}) => {
			carData.push({
				id,
				data
			})
		})

		setProfileCar(carData);
	}

	return (
		<div className="moja-vozila">
			<div className="nav">
				<h3>Količina: {profileCars.length}</h3>
				<div className="form-container">
					{/* Proizvodjac */}
					<div className="input-container">
						<select id="proizvodjac" onChange={handleProfileCarsFilter}>
							<option value="">Proizvođač</option>
							{cars.map((car, index) => (
								<option key={index} value={car.name}>
									{car.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="moja-vozila-section">
				<div className="container">
					<div className="profile-cars">
						{profileFilterCars ?
							profileFilterCars.map(({data: {storageImages, naslov_oglasa, godiste, gorivo, kilometraza, cijena}, id}, index) => {
								return (
									<Link to={`/${id}`} key={index} id='car-link'>
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
								);
							})
						:
						profileCar.map(({data: {storageImages, naslov_oglasa, godiste, gorivo, kilometraza, cijena}, id }, index) => {
							return (
								<Link to={`/${id}`} key={index} id='car-link'>
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
							);
						})
						}
					</div>
				</div>
			</div>
		</div>
	);
};
