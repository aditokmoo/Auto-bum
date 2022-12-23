import React from 'react';
import { useState } from 'react';
import { cars, yearType, fuelType, cubicType, ownerShipType, climateType, gearType } from '../../data/formSelectData';

export const BasicInfo = () => {
	const [ carName, setCarName ] = useState();

	return (
		<div className="basic-info">
			<h2>Osnovne informacije</h2>
			<form>
				<div className="form-container">
					{/* Proizvodjac */}
					<div className="input-container">
						<label>Proizvođač *</label>
						<select name="manufacturer" onChange={(e) => setCarName(e.target.value)}>
							<option value="">Izaberite proizvođača</option>
							{cars.map((car, index) => <option key={index} value={car.name}>{car.name}</option>)}
						</select>
					</div>
					{/* Model */}
					<div className="input-container">
						<label>Model *</label>
						<select>
							<option value="">Izaberite model</option>
							{cars.map((car) => car.name === carName && car.models.map((model, modelIndex) => <option key={modelIndex} value={model}>{model}</option>))}
						</select>
					</div>
					{/* Godiste */}
					<div className="input-container">
						<label>Godište *</label>
						<select>
							<option value="">Izaberite godište</option>
							{yearType.map((year, index) => <option key={index} value={year}>{year}</option>)}
						</select>
					</div>
					{/* Kilometraža */}
					<div className="input-container">
						<label>Kilometraža ( km ) *</label>
						<input type="number" placeholder="Unesite kilometražu" />
					</div>
					{/* Cijena */}
					<div className="input-container">
						<label>Cijena ( KM ) *</label>
						<input type="number" placeholder="Unesite cijenu" />
					</div>
					{/* Gorivo */}
					<div className="input-container">
						<label>Gorivo *</label>
						<select>
							<option value="">Izaberite filter</option>
							{fuelType.map((fuel, index) => <option key={index} value={fuel}>{fuel}</option>)}
						</select>
					</div>
					{/* Konjska snaga */}
					<div className="input-container">
						<label>Konjska snaga *</label>
						<input type="number" placeholder="Konjska snaga" />
					</div>
					{/* Kubikaža */}
					<div className="input-container">
						<label>Kubikaža ccm *</label>
						<select>
							<option value="">Izaberite filter</option>
							{cubicType.map((cubic, index) => <option key={index} value={cubic}>{cubic}</option>)}
						</select>
					</div>
					{/* Vlasništvo */}
					<div className="input-container">
						<label>Vlasništvo *</label>
						<select>
							<option value="">Izaberite filter</option>
							{ownerShipType.map((owner, index) => <option key={index} value={owner}>{owner}</option>)}
						</select>
					</div>
					{/* Klima */}
					<div className="input-container">
						<label>Klima *</label>
						<select>
							<option value="">Izaberite filter</option>
							{climateType.map((climate, index) => <option key={index} value={climate}>{climate}</option>)}
						</select>
					</div>
					{/* Mjenjač */}
					<div className="input-container">
						<label>Mjenjač *</label>
						<select>
							<option value="">Izaberite filter</option>
							{gearType.map((gear, index) => <option key={index} value={gear}>{gear}</option>)}
						</select>
					</div>
				</div>
			</form>
		</div>
	);
};
