import { useContext } from 'react';
import AppContext from '../context/AppContext';
import './css/form.css'

const Login = ({ handleForgotModal }) => {
    const { loginUser, handleLoginChange, loginData } = useContext(AppContext);
    const { log_email, log_password } = loginData;

    return (
        <form onSubmit={loginUser}> 
            <div className="desktop-login">
                <div className="form-container">
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={log_email} onChange={handleLoginChange} placeholder='Email...' id='log_email' required/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" value={log_password} onChange={handleLoginChange} placeholder='Password' id='log_password' required/>
                    </div>
                </div>
                <span onClick={handleForgotModal} id='forgot'>Zaboravili ste lozinku?</span>
                <button>Prijavi se</button>
            </div>
        </form>
    )
}

export default Login