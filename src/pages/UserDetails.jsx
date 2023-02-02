import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { db } from '../firebase.config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FaCalendarAlt, FaRoad } from 'react-icons/fa';
import { GiGasPump } from 'react-icons/gi';
import { BsArrowLeft } from 'react-icons/bs';
import avatar_image from './images/avatar-image.png';
import { cars } from '../data/formSelectData';
import './css/userDetails.css';

export const UserDetails = () => {
	const { handleProfileCarsFilter, profileFilterCars } = useContext(AppContext)
	const [ userDetails, setUserDetails ] = useState();
	const [ userCars, setUserCars ] = useState();
	const params = useParams();

	useEffect(() => {
		getUserDetails();
		getUserCars();
	}, []);

	const getUserDetails = async () => {
		const userDoc = doc(db, 'users', params.user);
		const getUserDoc = await getDoc(userDoc);
		const data = getUserDoc.data();

		setUserDetails(data);
	};

	const getUserCars = async () => {
		const cars = collection(db, 'cars');
		const getCars = await getDocs(cars);

		const data = [];
		const userCarsData = [];

		getCars.forEach((doc) => {
			const docData = doc.data();

			return data.push({
                id: doc.id,
                data: docData
            });
		});

		data.forEach(({data, id}) => {
			if (data.uid === params.user) {
				userCarsData.push({
                    data,
                    id
                });
			}
		});

		setUserCars(userCarsData);
	};

	return (
		<div>
			<div className="details">
				<div className="nav">
					<Link to='/home' id="back-icon">
						<BsArrowLeft />
					</Link>
					<h3>Profil korisnika</h3>
				</div>
			</div>
			<div className="userDetails">
				<div className="container">
					{userDetails && (
						<div className="user-section">
							<h1>{userDetails.reg_name + ' ' + userDetails.reg_lname}</h1>
							<div className="user">
								<div className="image">
									<img src={avatar_image} alt="" />
								</div>
								<div className="details">
									<ul>
										<li>
											<p>Lokacija</p>
											<p>{userDetails.reg_city}</p>
										</li>
										<li>
											<p>Adresa</p>
											<p>Nije navedeno</p>
										</li>
										<li>
											<p>Telefon</p>
											<p>{userDetails.reg_number}</p>
										</li>
										<li>
											<p>Tip korisnika</p>
											<p>Korisnik</p>
										</li>
									</ul>
									<button className="btn" onClick={() => alert('Nije u funkciji')}>
										Pošalji poruku
									</button>
								</div>
							</div>
						</div>
					)}
					{userCars && (
						<div>
							<div className="nav">
								<h3>Količina: {userCars.length}</h3>
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

							<div className="details-section">
								<div className="cars">
									{profileFilterCars ? profileFilterCars.map(({data: { storageImages, naslov_oglasa, godiste, gorivo, kilometraza, cijena }, id}, index) => (
                                            <Link to={`${id}`} key={index} id="car-link">
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
										)
									) 
									:
									profileFilterCars.map(({data: { storageImages, naslov_oglasa, godiste, gorivo, kilometraza, cijena }, id}, index) => (
										<Link to={`${id}`} key={index} id="car-link">
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
									)
								)
									}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
