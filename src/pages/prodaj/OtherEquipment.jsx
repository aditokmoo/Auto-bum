import { row_one, row_two, row_three, row_four } from "../../data/formSelectData";

export const OtherEquipment = () => {
	return (
		<div className="other-equipment">
			<h2>Ostala oprema</h2>
			<div className="form-container">
				{/*1st row */}
				<div className="row">
					{row_one.map((row, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" />
							<label>{row}</label>
						</div>
					))}
				</div>

				{/*2nd Row */}
				<div className="row">
					{row_two.map((row, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" />
							<label>{row}</label>
						</div>
					))}
				</div>

				{/*3rd row*/}
				<div className="row">
					{row_three.map((row, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" />
							<label>{row}</label>
						</div>
					))}
				</div>

				{/* 4th row */}
				<div className="row">
					{row_four.map((row, index) => (
						<div className="input-container" key={index}>
							<input type="checkbox" />
							<label>{row}</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
