import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';

const ForgotPassword = ({ handleTabClick }) => {
    const { handleForgotPasswordSubmit, email, setEmail } = useContext(AuthContext);

    return (
        <form onSubmit={handleForgotPasswordSubmit}>
            <div className="form-container">
                <div className="forgot-input-container">
                    <label htmlFor="email">Email adresa</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email...' id='forgot_email' />
                </div>
                <button>Pošalji</button>
                <p>Natrag na <span onClick={() => handleTabClick(0)}>prijavu</span></p>
            </div>
        </form>
    )
}

export default ForgotPassword