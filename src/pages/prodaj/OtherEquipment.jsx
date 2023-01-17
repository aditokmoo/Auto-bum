import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ostalo_info } from "../../data/formSelectData";

export const OtherEquipment = () => {
	const { handleCarFormChange } = useContext(AppContext);

	return (
		<div className="other-equipment">
			<h2>Ostala oprema</h2>
			<div className="form-container">
				{/*1st row */}
				<div className="row">
					{ostalo_info.slice(0, 12).map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/*2nd Row */}
				<div className="row">
					{ostalo_info.slice(12, 24).map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/*3rd row*/}
				<div className="row">
					{ostalo_info.slice(24, 36).map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/* 4th row */}
				<div className="row">
					{ostalo_info.slice(36, 48).map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
