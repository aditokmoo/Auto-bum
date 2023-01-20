import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import { FilteredCars } from './home/FilteredCars';
import { Cars } from './home/Cars';
import { Filters } from './home/Filters';
import { FaSearch } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './css/home.css';

const Home = () => {
	const { getCarsCollection, carsData } = useContext(AppContext);
	const [ filterCarData, setFilterCarData ] = useState(null);
	const [ filterCarID, setFilterCarID ] = useState(null);
 	const [ filterFormData, setFilterFormData ] = useState({
		proizvodjac: null,
		model: null,
		godiste: null,
		gorivo: null,
		kilometraza: null,
		cijena: null,
	});

	useEffect(() => {
		getCarsCollection();
	}, [])

	const handleFilterChange = (e) => {
		setFilterFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value
		}))
	}

	const handleFilterSubmit = (e) => {
		e.preventDefault();

		const filterData = [];
		const filterID = [];
		let checkOnlyTrue = false;

		carsData.forEach(({ id, data }) => {
			let error = false;

			if(filterFormData.proizvodjac) {
				if(filterFormData.proizvodjac !== data.proizvodjac) {
					error = true
				}
			}

			if(filterFormData.model) {
				if(filterFormData.model !== data.model) {
					error = true
				}
			}

			if(filterFormData.godiste) {
				if(filterFormData.godiste !== data.godiste) {
					error = true
				}
			}

			if(filterFormData.gorivo) {
				if(filterFormData.gorivo !== data.gorivo) {
					error = true
				}
			}

			if(filterFormData.kilometraza) {
				const fix_kilometraza = data.kilometraza.split('.').join('');
				const form_kilometraza = filterFormData.kilometraza.split('.').join('');

				if(parseInt(fix_kilometraza) > parseInt(form_kilometraza)) {
					error = true
				}
			}

			if(filterFormData.cijena) {
				const fix_cijena = data.cijena.split('.').join('');
				const form_cijena = filterFormData.cijena.split('.').join('');

				if(parseInt(fix_cijena) > parseInt(form_cijena)) {
					error = true
				}
			}

			if(!error) {
				filterData.push(data)
                filterID.push(id)

                setFilterCarData(filterData)
                setFilterCarID(filterID)

				checkOnlyTrue = true;
			}
		})

		if(!checkOnlyTrue) {
			setFilterCarData(null)
			
			toast.error('Izabrano auto ne postoji', {
				position: 'bottom-right',
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});
		}
	}

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
						<Filters handleFilterChange={handleFilterChange} filterCarData={filterCarData} handleFilterSubmit={handleFilterSubmit} filterFormData={filterFormData} />
						{filterCarData ? <FilteredCars filterCarData={filterCarData} filterCarID={filterCarID} /> : <Cars />}
					</div>
				</div>
			</header>
		</>
	);
};

export default Home;
