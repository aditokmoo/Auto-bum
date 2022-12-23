import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // State for storing firebase user collection data
    const [ userData, setUserData ] = useState(null);
    // State for storing firebase current user
    const [ currentUser, setCurrentUser ] = useState(null);
    // Login data state
    const [loginData, setLoginData] = useState({
        log_email: '',
        log_password: '',
    });
    // Register data state
    const [ registerData, setRegisterData ] = useState({
        reg_name: '',
        reg_lname: '',
        reg_number: '',
        reg_email: '',
        reg_password: '',
        reg_city: '',
    });
    // Email data state for forgot password form
    const [email, setEmail] = useState('');
    // State for adding images at prodaja section
    const [imgSrc, setImgSrc] = useState([]);

    // Get auth from firestore
    const auth = getAuth();
    // Get Navigate
    const navigate = useNavigate();
    // Destructuring login data and register data
    const { log_email, log_password } = loginData;
    const { reg_name, reg_lname, reg_number, reg_email, reg_password, reg_city } = registerData;

    useEffect(() => {
        // Check if user is logged in then add that user to currentUser state
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user);
            }
        })
    }, [])

    // Handle Forgot Password Form Function
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get Auth from firebase
            const auth = getAuth();
            // Firebase method for reseting password with email
            await sendPasswordResetEmail(auth, email);
            toast.success('Email je poslan')
        } catch (error) {
            toast.error('Reset lozinke nije poslan');
        }
    }

    // Handle Change In Register Form
    const handleRegChange = (e) => {
        // Set register data state to collect input values and stored them in that state
        setRegisterData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    // User Register Function  
    const registerUser = async (e) => {
        e.preventDefault();

        try {
            // Get Auth from firebase
            const auth = getAuth();
            // Firebase method for creating user
            const register = await createUserWithEmailAndPassword(auth, reg_email, reg_password, reg_city, reg_lname, reg_number);
            // Firebase method for login user - here used to auto-login user after registration
            const login = await signInWithEmailAndPassword(auth, reg_email, reg_password);

            // Destructure register and login user
            const register_user = register.user;
            const login_user = login.user;

            updateProfile(auth.currentUser, {
                displayName: reg_name
            });
            
            // Creating copy of registered user data
            const registerDataCopy = {...registerData}
            // Deleting password from user data copy
            delete registerDataCopy.reg_password;
            // Setting timestamp in user data
            registerDataCopy.timestamp = serverTimestamp();

            // And setting copy (modified) data in db
            await setDoc(doc(db, 'users', register_user.uid), registerDataCopy);
            // Redirect to home page after registration
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

    // Handle Change In Login Form
    const handleLoginChange = (e) => {
        // Set login data state to collect input values and stored them in that state
        setLoginData(prevState => ({
          ...prevState,
          [e.target.id]: e.target.value
        }))
    }
    
    // User Login Function
    const loginUser = async (e) => {
        e.preventDefault();

        try {
            // Firebase method for login
            const userCredential = await signInWithEmailAndPassword(auth, log_email, log_password)
            // Check if user exits
            if(userCredential.user) {
                // Clear inputs after login
                setLoginData({
                    log_email: '',
                    log_password: '',
                });
                // Redirect to Home page after login
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

    // Add Images
    const addImages = (e) => {
        // Define File Reader
        const reader = new FileReader();
        // To read file as data URL
        reader.readAsDataURL(e.target.files[0]);
        // On reader load set in imgsrc state previous added image and new image
        reader.onload = () => {
            setImgSrc([...imgSrc, reader.result])
        }
    }

    // Delete added images by comparing there image src
    const handleImageDelete = (itemSrc) => setImgSrc(prevImgSrc => prevImgSrc.filter(src => src !== itemSrc))

    // Get USER Colletion data and add that data to userData state
    const getCollection = async () => {
        // Get user Collection
        const userCollection = await getDocs(collection(db, "users"));
            // Loop user collection
            userCollection.forEach((doc) => {
                // Check if current user is equal with user collection data
                if(currentUser.uid === doc.id) {
                    // Store it in user data state
                    setUserData(doc.data());
                }
        });
    }

    // Logout from profile function
    const logOut = () => {
        try {
            auth.signOut();
            navigate('/')            
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

    return <AppContext.Provider value={{
        userData,
        imgSrc,
        loginData,
        registerData,
        email,
        setEmail,
        handleForgotPasswordSubmit,
        handleLoginChange,
        handleRegChange,
        registerUser,
        loginUser,
        setImgSrc,
        addImages,
        handleImageDelete,
        getCollection,
        logOut,
    }}>
        {children}
    </AppContext.Provider>
}

export default AppContext