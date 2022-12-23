import { useEffect, useContext } from 'react';
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

function Prodaj() {
	const { getCollection } = useContext(AppContext);

	useEffect(() => {
		// Calling USER Collection function
		getCollection();
	}, []);

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
								{/* SECTION FOR ADDING IMAGES */}
								<AddImage />
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
									<form>
										<button>Objavi oglas</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Prodaj;
