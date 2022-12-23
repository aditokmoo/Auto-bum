import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { cities } from '../../data/formSelectData';

export const UserData = () => {
	const { userData } = useContext(AppContext);

	return (
		userData && (
			<div className="user-data-section">
				<h2>Podaci</h2>
				<div className="form-container">
					<div className="input-container">
						<label>Ime</label>
						<input type="text" placeholder={userData.reg_name} disabled />
					</div>
					<div className="input-container">
						<label htmlFor="name">Prezime</label>
						<input type="text" placeholder={userData.reg_lname} disabled />
					</div>
					<div className="input-container">
						<label htmlFor="name">Broj telefona</label>
						<input type="number" placeholder={userData.reg_number} disabled />
					</div>
					<div className="input-container">
						<label htmlFor="name">Lokacija vozila</label>
						<select id="veh_city">
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
