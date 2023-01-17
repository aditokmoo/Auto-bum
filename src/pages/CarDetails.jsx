import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { BsArrowLeft } from 'react-icons/bs';
import { FaCity, FaCalendarAlt, FaRoad, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { GiGasPump, GiGearStickPattern } from 'react-icons/gi';
import { TbEngine } from 'react-icons/tb';
import { IoIosPricetags } from 'react-icons/io';
import { AiFillCar, AiOutlineStar } from 'react-icons/ai';
import { ostalo_info } from '../data/formSelectData';
import './css/details.css';

export const CarDetails = () => {
	const [ carDetails, setCarDetails ] = useState();
	const [ equipDetails, setEquipDetails ] = useState();

	const params = useParams();

	useEffect(() => {
		getCarDetails();
	}, []);

	const getCarDetails = async () => {
		const carDoc = doc(db, 'cars', params.car);
		const getCarDoc = await getDoc(carDoc);
		const data = getCarDoc.data();

		const equipData = [];

		ostalo_info.forEach(row => {
			Object.entries(data).filter(([key, value]) => {
				if(row.id === key && value === true) {
					equipData.push(row.name);
				}
				return equipData;
			})
		})

		setEquipDetails(equipData)

		setCarDetails(data);
	};

	return (
		<div className="details">
			<div className="nav">
				<Link to="/home" id="back-icon">
					<BsArrowLeft />
				</Link>
				<h3>Detalji artikla</h3>
			</div>
			{carDetails && (
				<div className="container">
					<div className="details-section">
						<div className="section-1">
							<h1>{carDetails.naslov_oglasa}</h1>
							<div className="image">
								<img src={carDetails.storageImages[0]} alt="" />
							</div>
							<div className="slider">
								{carDetails.storageImages.map((image, index) => (
									<div className="slide" key={index}>
										<img src={image} alt="" />
									</div>
								))}
							</div>
						</div>
						<div className="section-2">
							<h1>{carDetails.cijena}KM</h1>
							<div className="item">
								<span>
									<IoIosPricetags id="icon" /> Proizvođač
								</span>
								<span>{carDetails.proizvodjac}</span>
							</div>
							<div className="item">
								<span>
									<AiFillCar id="icon" /> Model
								</span>
								<span>{carDetails.model}</span>
							</div>
							<div className="item">
								<span>
									<FaCity id="icon" /> Grad
								</span>
								<span>{carDetails.lokacija_vozila}</span>
							</div>
							<div className="details-info-1">
								<ul>
									<li>
										<p>
											<FaCalendarAlt id="icon" />
										</p>
										<p>Godište</p>
										<p>{carDetails.godiste}</p>
									</li>
									<li>
										<p>
											<GiGasPump id="icon" />
										</p>
										<p>Gorivo</p>
										<p>{carDetails.gorivo}</p>
									</li>
									<li>
										<p>
											<FaRoad id="icon" />
										</p>
										<p>Kilometraža</p>
										<p>{carDetails.kilometraza}</p>
									</li>
									<li>
										<p>
											<GiGearStickPattern id="icon" />
										</p>
										<p>Mjenjač</p>
										<p>{carDetails.mjenjac}</p>
									</li>
									<li>
										<p id="custom-icon">
											cm<span>3</span>
										</p>
										<p>Kubikaža</p>
										<p>{carDetails.kubikaza}</p>
									</li>
									<li>
										<p id="custom-icon">kw</p>
										<p>Kilovati</p>
										<p>{carDetails.kilovati}</p>
									</li>
									<li>
										<p>
											<TbEngine id="icon" />
										</p>
										<p>Konjskih snaga</p>
										<p>{carDetails.hp}</p>
									</li>
								</ul>
							</div>
							<div className="details-info-2">
								<ul>
									<li>
										<p>
											<FaUserAlt id="icon" />
										</p>
										<p>Prodavac</p>
										<p>{carDetails.ime + ' ' + carDetails.prezime}</p>
									</li>
									<li>
										<p>
											<FaPhoneAlt id="icon" />
										</p>
										<p>Telefon</p>
										<p>{carDetails.broj_telefona}</p>
									</li>
								</ul>
							</div>
							<div className="btns">
								<button className="btn-1">
									<AiOutlineStar />
								</button>
								<button className="btn-2">Pošalji poruku</button>
							</div>
						</div>
					</div>
					<div className="info-section">
						<h1>Informacije</h1>
						<div className="info">
							<h3>Opšte informacije</h3>
							<ul>
								<li>
									<p>Proizvođač</p>
									<p>{carDetails.proizvodjac}</p>
								</li>
								<li>
									<p>Model</p>
									<p>{carDetails.model}</p>
								</li>
								<li>
									<p>Godište</p>
									<p>{carDetails.godiste}</p>
								</li>
								<li>
									<p>Kilometraža</p>
									<p>{carDetails.kilometraza}</p>
								</li>
								<li>
									<p>Gorivo</p>
									<p>{carDetails.gorivo}</p>
								</li>
								<li>
									<p>Konjska Snaga</p>
									<p>{carDetails.hp}</p>
								</li>
								<li>
									<p>Kubikaža ccm</p>
									<p>{carDetails.kubikaza}</p>
								</li>
								<li>
									<p>Vlasništvo</p>
									<p>{carDetails.vlasnistvo}</p>
								</li>
								<li>
									<p>Klima</p>
									<p>{carDetails.klima}</p>
								</li>
								<li>
									<p>Mjenjač</p>
									<p>{carDetails.mjenjac}</p>
								</li>
							</ul>
						</div>
						<div className="info">
							<h3>Dodatne informacije</h3>
							<ul>
								{carDetails.kilovati &&
								<li>
									<p>Kilovati</p>
									<p>{carDetails.kilovati}</p>
								</li>
								}
								{carDetails.standard &&
								<li>
									<p>Emisioni Standard</p>
									<p>{carDetails.standard}</p>
								</li>
								}
								{carDetails.broj_brzina &&
								<li>
									<p>Broj brzina mjenjača</p>
									<p>{carDetails.broj_brzina}</p>
								</li>
								}
								{carDetails.broj_vrata &&
								<li>
									<p>Broj vrata</p>
									<p>{carDetails.broj_vrata}</p>
								</li>
								}
								{carDetails.strana_volana &&
								<li>
									<p>Strana Volana</p>
									<p>{carDetails.strana_volana}</p>
								</li>
								}
								{carDetails.boja &&
								<li>
									<p>Boja Spoljašnosti</p>
									<p>{carDetails.boja}</p>
								</li>
								}
								{carDetails.karoserija &&
								<li>
									<p>Karoserija</p>
									<p>{carDetails.karoserija}</p>
								</li>
								}
								{carDetails.pogon &&
								<li>
									<p>Pogon</p>
									<p>{carDetails.pogon}</p>
								</li>
								}
								{carDetails.sjedeca_mjesta &&
								<li>
									<p>Sjedeća mjesta</p>
									<p>{carDetails.sjedeca_mjesta}</p>
								</li>
								}
							</ul>
						</div>
						{equipDetails === [] &&
						<div className="info">
							<h3 id='custom-h3'>Oprema</h3>
							<div className="items">
								{equipDetails.map((oprema, index) => (
									<p key={index}>{oprema}</p>	
								))
								}
							</div>
						</div>
						}

						{carDetails.opis_oglasa &&
						<div className="opis">
							<h3 id='custom-h3'>Detaljan opis</h3>
							<p>{carDetails.opis_oglasa}</p>
						</div>
						}
					</div>
				</div>
			)}
		</div>
	);
};
