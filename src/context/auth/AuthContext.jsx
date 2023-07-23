import { createContext, useContext, useReducer, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AppContext from "../AppContext";
import { ACTIONS, AuthReducer } from "../../reducers/auth/AuthReducer";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const { setCurrentUser, setUserData } = useContext(AppContext);
    // Register data state
	const [ state, dispatch ] = useReducer(AuthReducer, {
		EMAIL: '',
		PASSWORD: ''
	})
	const [ registerData, setRegisterData ] = useState({
		reg_name: '',
		reg_lname: '',
		reg_number: '',
		reg_email: '',
		reg_password: '',
		reg_city: ''
	});
	// Email data state for forgot password form
	const [ email, setEmail ] = useState('');
	// Destructuring registerData
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
		dispatch({ type: e.target.name, payload: e.target.value })
	};

	// User Login Function
	const loginUser = async (e) => {
		e.preventDefault();

		try {
			// Firebase method for login
			const userCredential = await signInWithEmailAndPassword(auth, state.EMAIL, state.PASSWORD);
			// Check if user exits
			if (userCredential.user) {
				// Clear inputs after login
				dispatch({ type: ACTIONS.CLEAR_FORM, payload: '' })
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

	// Handle Forgot Password Form Function
	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault();

		try {
			// Firebase method for reseting password with email
			await sendPasswordResetEmail(auth, email);
			toast.success('Email je poslan');
			setEmail('')
		} catch (error) {
			toast.error('Reset lozinke nije poslan');
		}
	};

	// Logout from profile function
	const logOut = () => {
		try {
			auth.signOut();
			navigate('/');

			setUserData(null)
			setCurrentUser(null)
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

    return <AuthContext.Provider value={{
        registerData,
		email,
		state,
		setEmail,
        loginUser,
        registerUser,
        handleLoginChange,
        handleRegChange,
		handleForgotPasswordSubmit,
		logOut
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;