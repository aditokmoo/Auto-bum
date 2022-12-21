import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import './css/form.css'

const Register = ({ onRegisterChange }) => {
    const [ registerData, setRegisterData ] = useState({
        reg_username: '',
        reg_email: '',
        reg_password: '',
        reg_city: '',
    })
    const { reg_username, reg_email, reg_password, reg_city } = registerData;
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
           
            const register = await createUserWithEmailAndPassword(auth, reg_email, reg_password, reg_city);
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
            navigate('/home');

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
            <div className="form-container">
                <div className="input-container">
                    <label htmlFor="name">Username</label>
                    <input type="text" value={reg_username} onChange={handleRegChange} placeholder='Username...' id='reg_username' />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={reg_email} onChange={handleRegChange} placeholder='Email...' id='reg_email' />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={reg_password} onChange={handleRegChange} placeholder='Password...' id='reg_password' />
                </div>
                <div className="input-container">
                    <label htmlFor="city">Lokacija</label>
                    <select value={reg_city} id='reg_city' onChange={handleRegChange}>
                        <option value="Sarajevo">Sarajevo</option>
                        <option value="Banja Luka">Banja Luka</option>
                        <option value="Mostar">Mostar</option>
                        <option value="Tuzla">Tuzla</option>
                        <option value="Zenica">Zenica</option>
                        <option value="Bihac">Bihac</option>
                        <option value="Bugojno">Bugojno</option>
                        <option value="Doboj">Doboj</option>
                        <option value="Gorazde">Gorazde</option>
                        <option value="Livno">Livno</option>
                        <option value="Travnik">Travnik</option>
                        <option value="Vlasenica">Vlasenica</option>
                        <option value="Zavidovici">Zavidovici</option>
                        <option value="Trebinje">Trebinje</option>
                        <option value="Brcko">Brcko</option>
                        <option value="Bijeljina">Bijeljina</option>
                        <option value="Prijedor">Prijedor</option>
                        <option value="Gracanica">Gracanica</option>
                        <option value="Foca">Foca</option>
                        <option value="Visegrad">Visegrad</option>
                        <option value="Rogatica">Rogatica</option>
                        <option value="Cazin">Cazin</option>
                        <option value="Kakanj">Kakanj</option>
                        <option value="Konjic">Konjic</option>
                        <option value="Modrica">Modrica</option>
                        <option value="Odzak">Odzak</option>
                        <option value="Sanski Most">Sanski Most</option>
                        <option value="Srebrenik">Srebrenik</option>
                        <option value="Teocak">Teocak</option>
                        <option value="Zvornik">Zvornik</option>
                        <option value="Bosanska Krupa">Bosanska Krupa</option>
                        <option value="Bosanska Gradiska">Bosanska Gradiska</option>
                        <option value="Bosanski Petrovac">Bosanski Petrovac</option>
                        <option value="Bosanski Samac">Bosanski Samac</option>
                        <option value="Bratunac">Bratunac</option>
                        <option value="Celinac">Celinac</option>
                        <option value="Derventa">Derventa</option>
                        <option value="Doboj Jug">Doboj Jug</option>
                        <option value="Doboj Istok">Doboj Istok</option>
                        <option value="Drvar">Drvar</option>
                        <option value="Foca-Ustikolina">Foca-Ustikolina</option>
                        <option value="Gornji Vakuf-Uskoplje">Gornji Vakuf-Uskoplje</option>
                        <option value="Jajce">Jajce</option>
                        <option value="Kiseljak">Kiseljak</option>
                        <option value="Knezevo">Knezevo</option>
                        <option value="Kotor Varos">Kotor Varos</option>
                        <option value="Lopare">Lopare</option>
                        <option value="Lukavac">Lukavac</option>
                        <option value="Maglaj">Maglaj</option>
                        <option value="Mali Zvornik">Mali Zvornik</option>
                        <option value="Milici">Milici</option>
                        <option value="Mrkonjic Grad">Mrkonjic Grad</option>
                        <option value="Neum">Neum</option>
                        <option value="Odzak-Modrica">Odzak-Modrica</option>
                        <option value="Pale">Pale</option>
                        <option value="Pelagicevo">Pelagicevo</option>
                        <option value="Petrovac">Petrovac</option>
                        <option value="Plinica">Plinica</option>
                        <option value="Prnjavor">Prnjavor</option>
                        <option value="Rasavci">Rasavci</option>
                        <option value="Sipovo">Sipovo</option>
                        <option value="Sokolac">Sokolac</option>
                        <option value="Tesanj">Tesanj</option>
                        <option value="Tomislavgrad">Tomislavgrad</option>
                        <option value="Travnik-Vitez">Travnik-Vitez</option>
                        <option value="Trnovo">Trnovo</option>
                        <option value="Turbe">Turbe</option>
                        <option value="Velika Kladusa">Velika Kladusa</option>
                        <option value="Visoko">Visoko</option>
                        <option value="Vitez">Vitez</option>
                        <option value="Vlasic">Vlasic</option>
                        <option value="Vozuca">Vozuca</option>
                        <option value="Zepce">Zepce</option>
                    </select>
                </div>
            </div>
            
            <button>Kreiraj nalog</button>
        </form>
    )
}

export default Register