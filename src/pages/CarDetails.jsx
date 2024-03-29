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
import checkIcon from './images/check-green.png';
import Slider from 'react-slick';
import './css/details.css';
import './css/mobile/details-res.css';

export const CarDetails = () => {
	const [ carDetails, setCarDetails ] = useState();
	const [ equipDetails, setEquipDetails ] = useState(null);
	const [ slideImage, setSlideImage ] = useState();

	const params = useParams();

	useEffect(() => {
		getCarDetails();
	}, []);

	const getCarDetails = async () => {
		const carDoc = doc(db, 'cars', params.car);
		const getCarDoc = await getDoc(carDoc);
		const data = getCarDoc.data();

		const equipData = [];

		ostalo_info.forEach((row) => {
			Object.entries(data).forEach(([ key, value ]) => {
				if (row.id === key && value === true) {
					equipData.push(row.name);
				}
			});
		});

		setEquipDetails(equipData);
		setCarDetails(data);
	};

	const handleSlide = (index) => {
		setSlideImage(carDetails.storageImages[index]);
	};

	const settingsDesktop = {
		focusOnSelect: true,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 200
	};

	const settingsMobile = {
		infinite: false,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<div className="details">
			<div className="nav">
				{carDetails && (
					<Link to="/home" id="back-icon">
						<BsArrowLeft />
					</Link>
				)}
				<h3>Detalji artikla</h3>
			</div>
			{carDetails && (
				<div className="container">
					<div className="details-section">
						<div className="section-1">
							<h1>{carDetails.naslov_oglasa}</h1>
							<div className="image image-desktop">
								<img src={slideImage ? slideImage : carDetails.storageImages[0]} alt="" />
							</div>

							<div className="image-mobile">
								<Slider {...settingsMobile}>
									{carDetails.storageImages.map((image, index) => (
										<div className="image" key={index} onClick={() => handleSlide(index)}>
											<img src={image} />
										</div>
									))}
								</Slider>
							</div>

							<div className="slider-container">
								<Slider {...settingsDesktop}>
									{carDetails.storageImages.map((image, index) => (
										<div className="slide" key={index} onClick={() => handleSlide(index)}>
											<img src={image} alt="" />
										</div>
									))}
								</Slider>
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
										<p>{carDetails.kilovati ? carDetails.kilovati : 'Nije navedeno'}</p>
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
										<p>
											<Link to={`/user/${carDetails.uid}`} id="link">
												{carDetails.ime + ' ' + carDetails.prezime}
											</Link>
										</p>
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
								<button className="btn-1" onClick={() => alert('Nije u funkciji')}>
									<AiOutlineStar />
								</button>
								<button className="btn-2" onClick={() => alert('Nije u funkciji')}>
									Pošalji poruku
								</button>
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
								{carDetails.kilovati && (
									<li>
										<p>Kilovati</p>
										<p>{carDetails.kilovati}</p>
									</li>
								)}
								{carDetails.standard && (
									<li>
										<p>Emisioni Standard</p>
										<p>{carDetails.standard}</p>
									</li>
								)}
								{carDetails.broj_brzina && (
									<li>
										<p>Broj brzina mjenjača</p>
										<p>{carDetails.broj_brzina}</p>
									</li>
								)}
								{carDetails.broj_vrata && (
									<li>
										<p>Broj vrata</p>
										<p>{carDetails.broj_vrata}</p>
									</li>
								)}
								{carDetails.strana_volana && (
									<li>
										<p>Strana Volana</p>
										<p>{carDetails.strana_volana}</p>
									</li>
								)}
								{carDetails.boja && (
									<li>
										<p>Boja Spoljašnosti</p>
										<p>{carDetails.boja}</p>
									</li>
								)}
								{carDetails.karoserija && (
									<li>
										<p>Karoserija</p>
										<p>{carDetails.karoserija}</p>
									</li>
								)}
								{carDetails.pogon && (
									<li>
										<p>Pogon</p>
										<p>{carDetails.pogon}</p>
									</li>
								)}
								{carDetails.sjedeca_mjesta && (
									<li>
										<p>Sjedeća mjesta</p>
										<p>{carDetails.sjedeca_mjesta}</p>
									</li>
								)}
							</ul>
						</div>

						{equipDetails && (
							<div className="info">
								<h3 id="custom-h3">Oprema</h3>
								<div className="items">
									{equipDetails.map((oprema, index) => (
										<p key={index}>
											<img src={checkIcon} alt="" /> {oprema}
										</p>
									))}
								</div>
							</div>
						)}

						{carDetails.opis_oglasa && (
							<div className="opis">
								<h3 id="custom-h3">Detaljan opis</h3>
								<p>{carDetails.opis_oglasa}</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
