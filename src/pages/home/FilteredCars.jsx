import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';

export const FilteredCars = ({ filterCarData, filterCarID }) => {
	return (
		<div className="cars-container">
			<div className="cars">
				{filterCarData ? (
					filterCarData.map((car, index) => (
						<Link to={`/${filterCarID[index]}`} key={index} id="car-link">
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
					))
				) : (
					<h1>No Car Found</h1>
				)}
			</div>
		</div>
	);
};
