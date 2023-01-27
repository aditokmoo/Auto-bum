import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';
import AppContext from '../../context/AppContext';
// Icons
import { MdPhoneInTalk } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { BsFillShareFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'

export const Cars = () => {
	const { carsData, carID } = useContext(AppContext);

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
								<h3 className='mobile-h3'>{naslov_oglasa.length > 16 ? naslov_oglasa.slice(0, 16) + '...' : naslov_oglasa}</h3>
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

								<div className="mobile-attachment">
									<ul>
										<li>Pozovi <MdPhoneInTalk id='icon'/></li>
										<li><AiOutlineStar id='icon'/></li>
										<li><BsFillShareFill id='icon'/></li>
										<li><MdMessage id='icon'/></li>
									</ul>
								</div>
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};
