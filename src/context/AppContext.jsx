import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, setDoc, doc, serverTimestamp, query, addDoc } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updateProfile
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { db } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	// State for storing firebase user collection data
	const [ userData, setUserData ] = useState(null);
	// State for storing firebase current user
	const [ currentUser, setCurrentUser ] = useState(null);
	// State for storing firebase cars collection data
	const [ carsData, setCarsData ] = useState();
	// State for storing car images in firebase/storage
	const [ carFormImageFile, setCarFormImageFile ] = useState([]);
	// State for showing LOADING OVERLAY
	const [ showOverlay, setShowOverlay ] = useState(false);
	// Login data state
	const [ loginData, setLoginData ] = useState({
		log_email: '',
		log_password: ''
	});
	// Register data state
	const [ registerData, setRegisterData ] = useState({
		reg_name: '',
		reg_lname: '',
		reg_number: '',
		reg_email: '',
		reg_password: '',
		reg_city: ''
	});
	// Destructuring loginData and registerData
	const { log_email, log_password } = loginData;
	const { reg_name, reg_lname, reg_number, reg_email, reg_password, reg_city } = registerData;

	// Email data state for forgot password form
	const [ email, setEmail ] = useState('');
	// State for adding images at prodaja section
	const [ imgSrc, setImgSrc ] = useState([]);
	// State for adding error message for form input
	const [ formError, setFormError ] = useState('');
	// State for storing Car Form Data
	const [ carFormData, setCarFormData ] = useState({
		alu_felge: false,
		ambijentalno_osvjetljenje: false,
		automatsko_parkiranje: false,
		bluetooth: false,
		boja: '',
		broj_brzina: '',
		broj_telefona: '',
		broj_vrata: '',
		cijena: '',
		daljinsko_zakljucavanje: false,
		djecije_sjediste: false,
		dnevna_svjetla: false,
		images: [],
		dpf_filter: false,
		dvd_tv: false,
		el_podizaci: false,
		el_retrovizori: false,
		el_sjediste: false,
		glasovne_komande: false,
		godiste: '',
		gorivo: '',
		grijanje_sjedista: false,
		hp: '',
		ime: '',
		kamera: false,
		karoserija: '',
		kilometraza: '',
		klima: '',
		kozni_volan: false,
		kubikaza: '',
		led_prednja_svjetla: false,
		led_zadnja_svjetla: false,
		lokacija_vozila: '',
		masazna_sjedista: false,
		metalik_boja: false,
		mjenjac: '',
		model: '',
		multi_funkcionalni_volan: false,
		multimedija: false,
		naslon_za_ruku: false,
		naslov_oglasa: '',
		navigacija: false,
		opis_oglasa: '',
		oštecenje: '',
		paljenje_bez_kljuca: false,
		panorama_krov: false,
		parking_senzori: false,
		pogon: '',
		prezime: '',
		proizvodjac: '',
		radio_kastofon: false,
		senzor_za_kišu: false,
		servo_volan: false,
		sjedeca_mjesta: '',
		sjedista_podesiva_po_visini: false,
		sportska_sjedista: false,
		sportsko_vjesanje: false,
		standard: '',
		start_stop: false,
		strana_volana: '',
		svjetla_za_maglu: false,
		tempomat: false,
		touch_screen: false,
		usb: false,
		vazdusno_vjesanje: false,
		ventilacija_sjedista: false,
		vlasnistvo: '',
		volan_drvo_koza: false,
		webasto: false,
		xenon: false,
		šiber: false
	});

	// Get auth from firestore
	const auth = getAuth();
	// Get Navigate
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is logged in then add that user to currentUser state
		auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			}
		});
	}, []);

	// Handle Forgot Password Form Function
	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault();

		try {
			// Get Auth from firebase
			const auth = getAuth();
			// Firebase method for reseting password with email
			await sendPasswordResetEmail(auth, email);
			toast.success('Email je poslan');
		} catch (error) {
			toast.error('Reset lozinke nije poslan');
		}
	};

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
			// Get Auth from firebase
			const auth = getAuth();
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

	// Delete added images by comparing there image src
	const handleImageDelete = (itemSrc, id) => {
		setCarFormData((prevState) => ({
			...prevState,
			images: carFormData.images.filter((src) => src !== itemSrc)
		}));

		// Need to finish delete images from database state but first need to set to every image id so I have something to compare
		setCarFormImageFile(() => carFormImageFile.filter((item) => itemSrc.id !== item.id));
	};

	// Get USER Colletion data and add that data to userData state
	const getUserCollection = async () => {
		// Get user Collection
		const userCollection = await getDocs(collection(db, 'users'));
		// Loop user collection
		userCollection.forEach((doc) => {
			// Check if current user is equal with user collection data
			if (currentUser.uid === doc.id) {
				// Store it in user data state
				setUserData(doc.data());
			}
		});
	};

	// GET CARS Collection data and add that data to carsData state
	const getCarsCollection = async () => {
		// Get cars collection
		const carsCollection = collection(db, 'cars');

		// Define query
		const q = query(carsCollection);

		// Execute query
		const querySnap = await getDocs(q);

		const carObj = [];
		const cars = [];

		querySnap.forEach((doc) => {
			const docData = doc.data();

			return carObj.push({
				id: doc.id,
				data: docData
			});
		});

		carObj.map((car) => cars.push(car.data));

		setCarsData(cars);
	};

	// Handle Image Change Function - Add img src to carFormData images
	const handleImageChange = (e) => {
		// Define File Reader
		const reader = new FileReader();
		// To read file as data URL
		reader.readAsDataURL(e.target.files[0]);
		// On reader load set in imgsrc state previous added image and new image
		reader.onload = () => {
			setCarFormData((prevState) => ({
				...prevState,
				images: [ ...carFormData.images, { id: e.target.files[0].name, image: reader.result } ]
			}));

			if (e.target.files[0]) {
				setCarFormImageFile([ ...carFormImageFile, { id: e.target.files[0].name, image: e.target.files[0] } ]);
			}
		};
	};

	// Handle Car Form Change Function - Add car data to carFormData State
	const handleCarFormChange = (e) => {
		// Check that input with type number isnt negative
		if(e.target.type === 'number' && e.target.value < 0) return
		// Set input data to carFormData State
		setCarFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value === 'on' ? e.target.checked : e.target.value
		}));
	};

	// Handle Car Form Submit Function - Add car data to firebase/firestore
	const handleCarFormSubmit = async (e) => {
		e.preventDefault();

		// Store image in firebase/storage
		const storeImage = (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
				const storageRef = ref(storage, 'images/' + fileName);
				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
						// If progress is finished hide progress
						if (progress < 100) {
							setShowOverlay(true);
						} else {
							setShowOverlay(false);
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgUrls = await Promise.all(
			[ ...carFormImageFile ].map((data) => storeImage(data.image))
		).catch((error) => {
			console.log(error);
		});

		// CarFormData state copy
		const carFormDataCopy = {
			...carFormData,
			storageImages: imgUrls,
			timestamp: serverTimestamp()
		};

		// Delete images from carFormData State
		delete carFormDataCopy.images;

		if (!carFormDataCopy.storageImages.length) {
			toast.error('Obavezna barem jedna slika', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});
		} else {
			addDoc(collection(db, 'cars'), carFormDataCopy);

			navigate('/home');

			// Not Working
			toast.success('Auto je objavljeno', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'light'
			});
		}

		// Clear Form Storage Images
		setCarFormImageFile([]);

		// Clear Form
		setCarFormData((prevState) => ({
			...prevState,
			alu_felge: false,
			ambijentalno_osvjetljenje: false,
			automatsko_parkiranje: false,
			bluetooth: false,
			boja: '',
			broj_brzina: '',
			broj_telefona: '',
			broj_vrata: '',
			cijena: '',
			daljinsko_zakljucavanje: false,
			djecije_sjediste: false,
			dnevna_svjetla: false,
			images: [],
			dpf_filter: false,
			dvd_tv: false,
			el_podizaci: false,
			el_retrovizori: false,
			el_sjediste: false,
			glasovne_komande: false,
			godiste: '',
			gorivo: '',
			grijanje_sjedista: false,
			hp: '',
			ime: '',
			kamera: false,
			karoserija: '',
			kilometraza: '',
			klima: '',
			kozni_volan: false,
			kubikaza: '',
			led_prednja_svjetla: false,
			led_zadnja_svjetla: false,
			lokacija_vozila: '',
			masazna_sjedista: false,
			metalik_boja: false,
			mjenjac: '',
			model: '',
			multi_funkcionalni_volan: false,
			multimedija: false,
			naslon_za_ruku: false,
			naslov_oglasa: '',
			navigacija: false,
			opis_oglasa: '',
			oštecenje: '',
			paljenje_bez_kljuca: false,
			panorama_krov: false,
			parking_senzori: false,
			pogon: '',
			prezime: '',
			proizvodjac: '',
			radio_kastofon: false,
			senzor_za_kišu: false,
			servo_volan: false,
			sjedeca_mjesta: '',
			sjedista_podesiva_po_visini: false,
			sportska_sjedista: false,
			sportsko_vjesanje: false,
			standard: '',
			start_stop: false,
			strana_volana: '',
			svjetla_za_maglu: false,
			tempomat: false,
			touch_screen: false,
			usb: false,
			vazdusno_vjesanje: false,
			ventilacija_sjedista: false,
			vlasnistvo: '',
			volan_drvo_koza: false,
			webasto: false,
			xenon: false,
			šiber: false
		}));
	};

	// Logout from profile function
	const logOut = () => {
		try {
			auth.signOut();
			navigate('/');
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

	return (
		<AppContext.Provider
			value={{
				userData,
				imgSrc,
				loginData,
				registerData,
				email,
				carsData,
				carFormData,
				showOverlay,
				formError,
				handleImageChange,
				handleCarFormChange,
				handleCarFormSubmit,
				setEmail,
				handleForgotPasswordSubmit,
				handleLoginChange,
				handleRegChange,
				registerUser,
				loginUser,
				setImgSrc,
				handleImageDelete,
				getCarsCollection,
				getUserCollection,
				logOut
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
