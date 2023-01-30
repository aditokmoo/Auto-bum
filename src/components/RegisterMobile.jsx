import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { cities } from '../data/formSelectData';
import { BsArrowLeftShort } from 'react-icons/bs';
import './css/form.css';

export const RegisterMobile = () => {
	const { handleRegChange, registerUser, registerData } = useContext(AppContext);
	const { reg_name, reg_lname, reg_number, reg_email, reg_password, reg_city } = registerData;

	return (
		<form onSubmit={registerUser}>
			<div className="form-section mobile register-section">
				<Link to="/home">
					<BsArrowLeftShort id="icon" />
				</Link>
				<h2>
					Auto <span>Bum.</span>
				</h2>
				<div className="form-container-mobile">
					<div className="input-container">
						<label htmlFor="reg_name">Name</label>
						<input
							type="text"
							value={reg_name}
							onChange={handleRegChange}
							placeholder="Name..."
							id="reg_name"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="reg_lname">Last name</label>
						<input
							type="text"
							value={reg_lname}
							onChange={handleRegChange}
							placeholder="Last name..."
							id="reg_lname"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							value={reg_email}
							onChange={handleRegChange}
							placeholder="Email..."
							id="reg_email"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="reg_number">Phone Number</label>
						<input
							type="number"
							value={reg_number}
							onChange={handleRegChange}
							placeholder="Phone number..."
							id="reg_number"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="reg_password">Password</label>
						<input
							type="password"
							value={reg_password}
							onChange={handleRegChange}
							placeholder="Password..."
							id="reg_password"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="city">Lokacija</label>
						<select id="reg_city" onChange={handleRegChange} required>
							<option value="">Grad</option>
							{cities.map((city, index) => (
								<option key={index} value={city}>
									{city}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="btn">
					<button>Napravi novi nalog</button>
				</div>
			</div>
		</form>
	);
};
