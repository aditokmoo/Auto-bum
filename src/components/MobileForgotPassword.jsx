import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link } from "react-router-dom"
import { BsArrowLeftShort } from 'react-icons/bs'

export const MobileForgotPassword = () => {
    const { handleForgotPasswordSubmit, email, setEmail } = useContext(AppContext);
	
	return (
        <form onSubmit={handleForgotPasswordSubmit}>
			<div className="form-section mobile forgot-password-section">
				<Link to="/home">
					<BsArrowLeftShort id="icon" />
				</Link>
				<h2>
					Auto <span>Bum.</span>
				</h2>
				<h4>Zaboravili ste lozinku?</h4>
				<p>Javite nam se na broj 066811312 viber ili whats up pa cemo Vam pomoći oko reseta lozinke!</p>
				<div className='form-container-mobile'>
					<div className="input-container">
						<label htmlFor="email">Email adresa</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email...' id='forgot_email' />
					</div>
				</div>
				<div className="btn">
                    <button>Pošalji</button>
                </div>
			</div>
		</form>
    )
}