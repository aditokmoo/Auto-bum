import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import './css/form.css'

function Login({ onLoginChange, showForgotModal }) {
    const [loginData, setLoginData] = useState({
        log_email: '',
        log_password: '',
    })
    const { log_email, log_password } = loginData;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData(prevState => ({
          ...prevState,
          [e.target.id]: e.target.value
        }))
    }
    
    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, log_email, log_password)

            if(userCredential.user) {
                onLoginChange(false);
                navigate('/home');
            }

        } catch (error) {
            toast.error(error.message.includes('wrong-password') ? 'Lozinka nije ispravna': 'Email nije ispravan', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <form onSubmit={loginUser}> 
            <div className="form-container">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={log_email} onChange={handleChange} placeholder='Email...' id='log_email' />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Lozinka</label>
                    <input type="password" value={log_password} onChange={handleChange} placeholder='Password' id='log_password' />
                </div>
            </div>
            <span onClick={showForgotModal} id='forgot'>Zaboravili ste lozinku?</span>
            <button>Prijavi se</button>
        </form>
    )
}

export default Login