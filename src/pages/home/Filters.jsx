import { MdDirectionsCar } from 'react-icons/md';
import { AiFillDribbbleCircle } from 'react-icons/ai';
import { FaMotorcycle, FaTruck, FaTractor, FaTools, FaChevronRight } from 'react-icons/fa';
import { cars, yearType, fuelType } from '../../data/formSelectData';
import { Link } from 'react-router-dom';

export const Filters = ({ handleFilterChange, handleFilterSubmit, filterFormData }) => {
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
				<form onSubmit={handleFilterSubmit}>
					<div className="form-container">
						{/* Proizvodjac */}
						<div className="input-container">
							<label>Proizvodjac</label>
							<select id="proizvodjac" onChange={handleFilterChange}>
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
							<select id="model" onChange={handleFilterChange}>
								<option value="">Izaberite model</option>
								{cars.map(
									(car) =>
										car.name === filterFormData.proizvodjac &&
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
							<select id="godiste" onChange={handleFilterChange}>
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
							<select id="gorivo" onChange={handleFilterChange}>
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
							<input type="text" id='kilometraza' placeholder="Kilometraža do" onChange={handleFilterChange} />
						</div>

						{/* CIJENA */}
						<div className="input-container">
							<label>Cijena do (KM)</label>
							<input type="text" id='cijena' placeholder="Cijena do" onChange={handleFilterChange} />
						</div>

                        <Link to='/search' id='searchLink'>Detaljna pretraga <FaChevronRight className='icon' /></Link>

                        <div className="input-container">
                            <button>Pretraži</button>
                        </div>
					</div>
				</form>
			</div>
		</div>
	);
};
