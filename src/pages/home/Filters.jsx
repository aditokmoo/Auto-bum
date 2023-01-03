import { MdDirectionsCar } from 'react-icons/md';
import { AiFillDribbbleCircle } from 'react-icons/ai';
import { FaMotorcycle, FaTruck, FaTractor, FaTools, FaChevronRight } from 'react-icons/fa';
import { cars, yearType, fuelType } from '../../data/formSelectData';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export const Filters = () => {
	const { carFormData } = useContext(AppContext);
	// Destructure carFormData
	const {
		proizvodjac,
		model,
		godiste,
		kilometraza,
		cijena,
		gorivo,
		hp,
		kubikaza,
		vlasnistvo,
		klima,
		mjenjac
	} = carFormData;

	return (
		<div className="filter">
			<div className="tabs">
				<ul>
					<li className="active">
						<MdDirectionsCar className="icon" />
					</li>
					<li>
						<FaMotorcycle className="icon" />
					</li>
					<li>
						<FaTruck className="icon" />
					</li>
					<li>
						<FaTractor className="icon" />
					</li>
					<li>
						<AiFillDribbbleCircle className="icon" />
					</li>
					<li>
						<FaTools className="icon" />
					</li>
				</ul>
			</div>

			{/* CAR FORM FILTER SECTION */}
			<div className="car-filter">
				<form>
					<div className="form-container">
						{/* Proizvodjac */}
						<div className="input-container">
							<label>Proizvodjac</label>
							<select id="proizvodjac">
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
							<label>Model</label>
							<select id="model">
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

						{/* GODIŠTE */}
						<div className="input-container">
							<label>Godište *</label>
							<select id="godiste">
								<option value="">Izaberite godište</option>
								{yearType.map((year, index) => (
									<option key={index} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>

						{/* GORIVO */}
						<div className="input-container">
							<label>Gorivo *</label>
							<select id="gorivo">
								<option value="">Izaberite filter</option>
								{fuelType.map((fuel, index) => (
									<option key={index} value={fuel}>
										{fuel}
									</option>
								))}
							</select>
						</div>

						{/* KILOMETRAZA */}
						<div className="input-container">
							<label>Kilometraža do (km)</label>
							<input type="number" placeholder="Kilometraža do" />
						</div>

						{/* CIJENA */}
						<div className="input-container">
							<label>Cijena do (KM)</label>
							<input type="number" placeholder="Cijena do" />
						</div>

                        <Link to='/search' id='searchLink'>Detaljna pretraga <FaChevronRight className='icon' /></Link>

                        <div className="input-container">
                            <button>Broj rezultata</button>
                        </div>
					</div>
				</form>
			</div>
		</div>
	);
};
