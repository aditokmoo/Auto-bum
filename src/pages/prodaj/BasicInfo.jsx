import React from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { cars, yearType, fuelType, cubicType, ownerShipType, climateType, gearType } from '../../data/formSelectData';

export const BasicInfo = () => {
	const { carFormData, handleCarFormChange } = useContext(AppContext);
	// Destructure carFormData
	const { proizvodjac, model, godiste, kilometraza, cijena, gorivo, hp, kubikaza, vlasnistvo, klima, mjenjac } = carFormData;

	return (
		<div className="basic-info">
			<h2>Osnovne informacije</h2>

			<div className="form-container">
				{/* Proizvodjac */}
				<div className="input-container">
					<label>Proizvođač *</label>
					<select id='proizvodjac' onChange={handleCarFormChange} required>
						<option value="">Izaberite proizvođača</option>
						{cars.map((car, index) => (
							<option key={index} value={car.name}>
								{car.name}
							</option>
						))}
					</select>
				</div>
				{/* Model */}
				<div className="input-container">
					<label>Model *</label>
					<select id='model' onChange={handleCarFormChange} required>
						<option value="">Izaberite model</option>
						{cars.map(
							(car) =>
							car.name === proizvodjac &&
							car.models.map((model, modelIndex) => (
								<option key={modelIndex} value={model}>
									{model}
								</option>
							))
						)}
					</select>
				</div>
				{/* Godiste */}
				<div className="input-container">
					<label>Godište *</label>
					<select id='godiste' onChange={handleCarFormChange} required>
						<option value="">Izaberite godište</option>
						{yearType.map((year, index) => (
							<option key={index} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				{/* Kilometraža */}
				<div className="input-container">
					<label>Kilometraža ( km ) *</label>
					<input type="number" name='kilometraza' id='kilometraza' value={kilometraza} onChange={handleCarFormChange} placeholder="Unesite kilometražu" required/>
				</div>
				{/* Cijena */}
				<div className="input-container">
					<label>Cijena ( KM ) *</label>
					<input type="number" name='cijena' id='cijena' value={cijena} onChange={handleCarFormChange} placeholder="Unesite cijenu" required/>
				</div>
				{/* Gorivo */}
				<div className="input-container">
					<label>Gorivo *</label>
					<select id='gorivo' onChange={handleCarFormChange} required>
						<option value="">Izaberite filter</option>
						{fuelType.map((fuel, index) => (
							<option key={index} value={fuel}>
								{fuel}
							</option>
						))}
					</select>
				</div>
				{/* Konjska snaga */}
				<div className="input-container">
					<label>Konjska snaga *</label>
					<input type="number" name='hp' id='hp' value={hp} onChange={handleCarFormChange} placeholder="Konjska snaga" required/>
				</div>
				{/* Kubikaža */}
				<div className="input-container">
					<label>Kubikaža ccm *</label>
					<select id='kubikaza' onChange={handleCarFormChange} required>
						<option value="">Izaberite filter</option>
						{cubicType.map((cubic, index) => (
							<option key={index} value={cubic}>
								{cubic}
							</option>
						))}
					</select>
				</div>
				{/* Vlasništvo */}
				<div className="input-container">
					<label>Vlasništvo *</label>
					<select id='vlasnistvo' onChange={handleCarFormChange} required>
						<option value="">Izaberite filter</option>
						{ownerShipType.map((owner, index) => (
							<option key={index} value={owner}>
								{owner}
							</option>
						))}
					</select>
				</div>
				{/* Klima */}
				<div className="input-container">
					<label>Klima *</label>
					<select id='klima' onChange={handleCarFormChange} required>
						<option value="">Izaberite filter</option>
						{climateType.map((climate, index) => (
							<option key={index} value={climate}>
								{climate}
							</option>
						))}
					</select>
				</div>
				{/* Mjenjač */}
				<div className="input-container">
					<label>Mjenjač *</label>
					<select id='mjenjac' onChange={handleCarFormChange} required>
						<option value="">Izaberite filter</option>
						{gearType.map((gear, index) => (
							<option key={index} value={gear}>
								{gear}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};
