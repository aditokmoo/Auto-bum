import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Register data state
	const [ registerData, setRegisterData ] = useState({
		reg_name: '',
		reg_lname: '',
		reg_number: '',
		reg_email: '',
		reg_password: '',
		reg_city: ''
	});
    // Login data state
	const [ loginData, setLoginData ] = useState({
		log_email: '',
		log_password: ''
	});
	// Destructuring loginData and registerData
	const { log_email, log_password } = loginData;
    const { reg_name, reg_lname, reg_number, reg_email, reg_password, reg_city } = registerData;
    
    const navigate = useNavigate();
    // Get Auth from firebase
    const auth = getAuth();
    
    // Handle Change In Register Form
	const handleRegChange = (e) => {
		// Set register data state to collect input values and stored them in that state
		setRegisterData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value
		}));
	};

	// User Register Function
	const registerUser = async (e) => {
		e.preventDefault();

		try {
			// Firebase method for creating user
			const register = await createUserWithEmailAndPassword(
				auth,
				reg_email,
				reg_password,
				reg_city,
				reg_lname,
				reg_number
			);
			// Firebase method for login user - here used to auto-login user after registration
			const login = await signInWithEmailAndPassword(auth, reg_email, reg_password);

			// Destructure register and login user
			const register_user = register.user;
			const login_user = login.user;

			updateProfile(auth.currentUser, {
				displayName: reg_name
			});

			// Creating copy of registered user data
			const registerDataCopy = { ...registerData };
			// Deleting password from user data copy
			delete registerDataCopy.reg_password;
			// Setting timestamp in user data
			registerDataCopy.timestamp = serverTimestamp();

			// And setting copy (modified) data in db
			await setDoc(doc(db, 'users', register_user.uid), registerDataCopy);

			// Clear register form input
			setRegisterData(prevState => ({
				...prevState,
				[e.target.id]: ''
			}))

			// Redirect to home page after registration
			navigate('/home');
		} catch (error) {
			toast.error(error.message, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});
		}
	};

    // Handle Change In Login Form
	const handleLoginChange = (e) => {
		// Set login data state to collect input values and stored them in that state
		setLoginData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value
		}));
	};

	// User Login Function
	const loginUser = async (e) => {
		e.preventDefault();

		try {
			// Firebase method for login
			const userCredential = await signInWithEmailAndPassword(auth, log_email, log_password);
			// Check if user exits
			if (userCredential.user) {
				// Clear inputs after login
				setLoginData({
					log_email: '',
					log_password: ''
				});
				// Redirect to Home page after login
				navigate('/home');
			}
		} catch (error) {
			toast.error(error.message.includes('wrong-password') ? 'Lozinka nije ispravna' : 'Email nije ispravan', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});
		}
	};

    return <AuthContext.Provider value={{
        loginData,
        registerData,
        loginUser,
        registerUser,
        handleLoginChange,
        handleRegChange,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;