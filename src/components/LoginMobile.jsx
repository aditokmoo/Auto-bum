import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { BsArrowLeftShort } from 'react-icons/bs';
import './css/form.css';

export const LoginMobile = ({ handleForgotModal, handleTabClick }) => {
	const { loginUser, handleLoginChange, loginData } = useContext(AuthContext);
	const { log_email, log_password } = loginData;

	return (
		<form onSubmit={loginUser}>
			<div className="form-section mobile login-section">
				<Link to="/home">
					<BsArrowLeftShort id="icon" />
				</Link>
				<h2>
					Auto <span>Bum.</span>
				</h2>
				<div className='form-container-mobile'>
					<div className="input-container">
						<label htmlFor="email">Email adresa</label>
						<input
							type="email"
							value={log_email}
							onChange={handleLoginChange}
							placeholder="Email..."
							id="log_email"
							required
						/>
					</div>
					<div className="input-container">
						<label htmlFor="password">Lozinka</label>
						<input
							type="password"
							value={log_password}
							onChange={handleLoginChange}
							placeholder="Password"
							id="log_password"
							required
						/>
					</div>
				</div>
				<p onClick={handleForgotModal} id="forgot">
					Zaboravili ste lozinku?<span onClick={() => handleTabClick(2)}> Restartujte je</span>
				</p>
				<div className="btn">
                    <button>Prijavi se</button>
                </div>
			</div>
		</form>
	);
};
