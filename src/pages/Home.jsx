import Navbar from '../components/Navbar';
import { Cars } from './home/Cars';
import { Filters } from './home/Filters';
import { FaSearch } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import './css/home.css';
import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

const Home = () => {
	const { getCarsCollection } = useContext(AppContext);

	useEffect(() => {
		getCarsCollection();
	}, [])

	return (
		<>
			<Navbar />
			<header>
				<div className="header">
					<div className="container">
						<div className="home-section">
							<form>
								<AiFillCar className="car_icon" />
								<input type="text" placeholder="Audi A4 B8 2.0TDI" />
								<button>
									<FaSearch />
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="section">
					<div className="container">
						<Filters />
						<Cars />
					</div>
				</div>
			</header>
		</>
	);
};

export default Home;
