import { useState, useContext, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import AppContext from "../../context/AppContext"
import { cities } from "../../data/formSelectData"
import { db } from "../../firebase.config";
import { toast } from "react-toastify";

export const UrediProfil = () => {
    const { userData, setUserData } = useContext(AppContext);
    const auth = getAuth();

    // Destructure user data
    const { reg_name, reg_lname, reg_email, reg_number, reg_city } = userData;
    
    const [ profileFormData, setProfileFormData ] = useState({
        ime: reg_name,
        prezime: reg_lname,
        broj_telefona: reg_number,
        grad: reg_city
    })
    
    // Destructure Form Data
    const { ime, prezime, broj_telefona, grad } = profileFormData

    // Handle Edit Change
    const handleEditChange = (e) => {
        setProfileFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    // Submit Edit Change
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        // Get Cars Collection
        const carsCollection = collection(db, 'cars');
        const cars = await getDocs(carsCollection);

        // Check if all required inputs are not empty
        if(!ime.length || !prezime.length || !broj_telefona.length) {
            alert('Sva polja moraju bit ispunjena da bi sacuvali podatke')
        } else {
            // Change Profile Data
            try {
                if(auth.currentUser.displayName !== ime) {
                    // Update display name in Firebase auth
                    await updateProfile(auth.currentUser, {
                        displayName: ime
                    })
                }

                // Update data in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    reg_name: ime,
                    reg_lname: prezime,
                    reg_city: grad,
                    reg_number: broj_telefona
                })

                // Update data in cars collection
                cars.forEach( async (car) => {
                    const carRef = doc(db, 'cars', car.id);

                    if(auth.currentUser.uid === car.data().uid) {
                        await updateDoc(carRef, {
                            ime,
                            prezime,
                            broj_telefona
                        })
                    }
                });

                // Update user data
                setUserData(prevState => ({
                    ...prevState,
                    reg_name: ime,
                    reg_lname: prezime,
                    reg_number: broj_telefona,
                    reg_city: grad
                }))


                toast.success('Profil uređen', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });

            } catch (error) {
                toast.error(error, {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });   
            }
        }
    }

    return (
        <div className="uredi-profil">
            <form onSubmit={handleEditSubmit}>
                <div className="form-container">
                    {/* IME */}
                    <div className="input-container">
                        <label htmlFor="ime">Ime *</label>
                        <input type="text" name="ime" id="ime" value={ime} onChange={handleEditChange} />
                    </div>

                    {/* PREZIME */}
                    <div className="input-container">
                        <label htmlFor="prezime">Prezime *</label>
                        <input type="text" name="prezime" id="prezime" value={prezime} onChange={handleEditChange} />
                    </div>

                    {/* EMAIL */}
                    <div className="input-container">
                        <label htmlFor="email">Email adresa</label>
                        <input type="email" name="email" id="email" value={reg_email} disabled/>
                    </div>

                    {/* BROJ TELEFONA */}
                    <div className="input-container">
                        <label htmlFor="broj_telefona">Telefon *</label>
                        <input type="number" name="broj_telefona" id="broj_telefona" value={broj_telefona} onChange={handleEditChange} />
                    </div>
                    
                    {/* GRAD */}
                    <div className="input-container">
                        <label htmlFor="grad">Grad</label>
                        <select id='grad' value={grad} onChange={handleEditChange}>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                                
                    <div className="input-container">
                        <button>Sačuvaj</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}