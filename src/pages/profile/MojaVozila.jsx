import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import AppContext from '../../context/AppContext';
import { cars } from '../../data/formSelectData';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';

export const MojaVozila = () => {
	const { profileCars } = useContext(AppContext);

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
						{profileCars &&
							profileCars.map((car, index) => {
								return (
									<div className="car" key={index}>
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
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
