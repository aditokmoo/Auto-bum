import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function Register({ onRegisterChange }) {
    const [ registerData, setRegisterData ] = useState({
        reg_username: '',
        reg_email: '',
        reg_password: ''
    })
    const { reg_username, reg_email, reg_password } = registerData;
    const navigate = useNavigate();

    const handleRegChange = (e) => {
        setRegisterData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
           
            const register = await createUserWithEmailAndPassword(auth, reg_email, reg_password);
            const login = await signInWithEmailAndPassword(auth, reg_email, reg_password);

            const register_user = register.user;
            const login_user = login.user;

            updateProfile(auth.currentUser, {
                displayName: reg_username
            });
            
            const registerDataCopy = {...registerData}
            delete registerDataCopy.reg_password;
            registerDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'users', register_user.uid), registerDataCopy);
     
            onRegisterChange(false);
            navigate('/home')

        } catch (error) {
            toast.error(error.message, {
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
    <form onSubmit={registerUser}>
        <input type="text" value={reg_username} onChange={handleRegChange} placeholder='Username...' id='reg_username' />
        <input type="email" value={reg_email} onChange={handleRegChange} placeholder='Email...' id='reg_email' />
        <input type="password" value={reg_password} onChange={handleRegChange} placeholder='Password...' id='reg_password' />
        <button>Kreiraj nalog</button>
    </form>
  )
}

export default Register