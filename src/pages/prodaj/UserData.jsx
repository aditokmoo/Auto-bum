import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { cities } from '../../data/formSelectData';

export const UserData = () => {
	const { userData, handleCarFormChange } = useContext(AppContext);

	return (
		userData && (
			<div className="user-data-section">
				<h2>Podaci</h2>
				<div className="form-container">
					<div className="input-container">
						<label>Ime</label>
						<select id="ime" onChange={handleCarFormChange}>
							<option value={userData.reg_name}>{userData.reg_name}</option>
						</select>
					</div>
					<div className="input-container">
						<label htmlFor="name">Prezime</label>
						<select id="prezime" onChange={handleCarFormChange}>
							<option value={userData.reg_lname}>{userData.reg_lname}</option>
						</select>
					</div>
					<div className="input-container">
						<label htmlFor="name">Broj telefona</label>
						<select id="broj_telefona" onChange={handleCarFormChange}>
							<option value={userData.reg_number}>{userData.reg_number}</option>
						</select>
					</div>
					<div className="input-container">
						<label htmlFor="name">Lokacija vozila</label>
						<select id="lokacija_vozila" onChange={handleCarFormChange}>
							<option value={userData.reg_city}>{userData.reg_city}</option>
							{cities.map(
								(city, index) =>
									city !== userData.reg_city && (
										<option key={index} value={city}>
											{city}
										</option>
									)
							)}
						</select>
					</div>
				</div>
			</div>
		)
	);
};
