import React from 'react';

export const TitleInfo = () => {
	return (
		<div className="desc-section">
			<h2>Naslov i opis</h2>
			<div className="form-container">
				<div className="input-container">
					<label htmlFor="title">Naslov oglasa *</label>
					<input type="text" id="title" placeholder="Naslov Vašeg oglasa" />
				</div>
				<div className="input-container">
					<label htmlFor="desc">Opis oglasa</label>
					<textarea id="desc" placeholder="Upišite opis oglasa" />
				</div>
			</div>
		</div>
	);
};
