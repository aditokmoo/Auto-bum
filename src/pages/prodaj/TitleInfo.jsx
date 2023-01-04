import React from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

export const TitleInfo = () => {
	const { handleCarFormChange, formError } = useContext(AppContext);

	return (
		<div className="desc-section">
			<h2>Naslov i opis</h2>
			<div className="form-container">
				<div className="input-container">
					<label htmlFor="title">Naslov oglasa *</label>
					<input type="text" maxLength="30" id="naslov_oglasa" onChange={handleCarFormChange} placeholder="Naslov Vašeg oglasa" required/>
				</div>
				<div className="input-container">
					<label htmlFor="desc">Opis oglasa</label>
					<textarea id='opis_oglasa' maxLength="500" onChange={handleCarFormChange} placeholder="Upišite opis oglasa"/>
				</div>
			</div>
		</div>
	);
};
