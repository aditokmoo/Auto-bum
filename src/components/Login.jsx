import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import './css/form.css'

const Login = ({ handleForgotModal }) => {
    const { state, loginUser, handleLoginChange } = useContext(AuthContext);

    return (
        <form onSubmit={loginUser}> 
            <div className="desktop-login">
                <div className="form-container">
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={state.EMAIL} onChange={handleLoginChange} placeholder='Email...' id='log_email' name='EMAIL' required/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" value={state.PASSWORD} onChange={handleLoginChange} placeholder='Password' id='log_password' name='PASSWORD' required/>
                    </div>
                </div>
                <span onClick={handleForgotModal} id='forgot'>Zaboravili ste lozinku?</span>
                <button>Prijavi se</button>
            </div>
        </form>
    )
}

export default Login