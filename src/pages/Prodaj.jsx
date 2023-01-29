import { useEffect, useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import { AddImage } from './prodaj/AddImage';
import { BasicInfo } from './prodaj/BasicInfo';
import { OtherInfo } from './prodaj/OtherInfo';
import { OtherEquipment } from './prodaj/OtherEquipment';
import { TitleInfo } from './prodaj/TitleInfo';
import { UserData } from './prodaj/UserData';
import { MdDirectionsCar } from 'react-icons/md';
import { AiFillDribbbleCircle } from 'react-icons/ai';
import { FaMotorcycle, FaTruck, FaTractor } from 'react-icons/fa';
import './css/prodaj.css';
import './css/mobile/prodaj-res.css';

function Prodaj() {
	const { getUserCollection, carFormData, handleCarFormSubmit } = useContext(AppContext);
	const [ infoActive, setInfoActive ] = useState(false);

	useEffect(() => {
		// Calling USER Collection function
		getUserCollection();
	}, []);

	const checkIsInfoActive = () => {
		if(carFormData.images.length < 1) {
			alert('dodaj slike')
		} else {
			setInfoActive(true)
		}
	}

	return (
		<div>
			<Navbar />
			<section>
				<div className="container">
					<div className="sell-section">
						<div className="nav">
							<h1>Objava oglasa</h1>
							<ul>
								<li className="active">
									<span>
										<MdDirectionsCar className="icon" />
									</span>
									<span>Automobili</span>
								</li>
								<li>
									<span>
										<FaMotorcycle className="icon" />
									</span>
									<span>Motori</span>
								</li>
								<li>
									<span>
										<FaTruck className="icon" />
									</span>
									<span>Transport</span>
								</li>
								<li>
									<span>
										<AiFillDribbbleCircle className="icon" />
									</span>
									<span>Felge i gume</span>
								</li>
								<li>
									<span>
										<FaTractor className="icon" />
									</span>
									<span>Poljoprivreda</span>
								</li>
							</ul>
						</div>

						<div className="section">
							<div className="auto-section">
								<form onSubmit={handleCarFormSubmit}>
									{/* SECTION FOR ADDING IMAGES */}
									<div className={infoActive ? 'add-images info-hide' : 'add-images'}>
										<AddImage  checkIsInfoActive={checkIsInfoActive} infoActive={infoActive} />
									</div>

									<div className={infoActive ? 'add-info info-active' : 'add-info'}>
										{/* BASIC INFO SECTION */}
										<BasicInfo />

										{/* OTHER INFO SECTION */}
										<OtherInfo />

										{/* OTHER EQUIPMENT SECTION */}
										<OtherEquipment />

										{/* Description and Title SECTION */}
										<TitleInfo />

										{/* USER DATA SECTION */}
										<UserData />

										{/* BUTTON SECTION */}
										<div className="button-section">
											<button type='submit'>Objavi oglas</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Prodaj;
