import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { row_one, row_two, row_three, row_four } from "../../data/formSelectData";

export const OtherEquipment = () => {
	const { handleCarFormChange, checked } = useContext(AppContext);

	return (
		<div className="other-equipment">
			<h2>Ostala oprema</h2>
			<div className="form-container">
				{/*1st row */}
				<div className="row">
					{row_one.map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/*2nd Row */}
				<div className="row">
					{row_two.map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/*3rd row*/}
				<div className="row">
					{row_three.map((item, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" id={item.id} onChange={handleCarFormChange} />
							<label>{item.name}</label>
						</div>
					))}
				</div>

				{/* 4th row */}
				<div className="row">
					{row_four.map((item, index) => (
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
