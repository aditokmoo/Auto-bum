import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, serverTimestamp, query, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
	// State for storing current user cars
	const [ userCars, setUserCars ] = useState();
	// State for storing firebase cars from user
	const [ profileCars, setProfileCars ] = useState();
	// State for storing cars that are filtered on profile
	const [ profileFilterCars, setProfileFilterCars ] = useState(null);
	// State for storing search value
	const [ searchFormData, setSearchFormData ] = useState();
	// State for storing search data items
	const [ searchData, setSearchData ] = useState([]);
	// State for mobile search modal
	const [ searchModal, setSearchModal ] = useState(false);
	// State for storing car images in firebase/storage
	const [ carFormImageFile, setCarFormImageFile ] = useState([]);
	// State for storing Cars ID from firebase/firestore
	const [ carID, setCarID ] = useState();
	// State for showing LOADING OVERLAY
	const [ showOverlay, setShowOverlay ] = useState(false);
	// State for adding images at prodaja section
	const [ imgSrc, setImgSrc ] = useState([]);
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
	// window pathname
	const location = window.location.pathname

	useEffect(() => {
		/* Check if user is logged in then add that user to currentUser 
		state and call function that gets cars collection from firebase */
		auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			}

			getCarsCollection();
		});
	}, []);

	// For storing search data to localStorage
	useEffect(() => {
		const searchDataFromLocalStorage = localStorage.getItem('searchData');
		const valueDataFromLocalStorage = localStorage.getItem('searchValue');

		if(searchDataFromLocalStorage) {
			setSearchData(JSON.parse(searchDataFromLocalStorage))
			setSearchFormData(JSON.parse(valueDataFromLocalStorage))
		}

		if(window.location.pathname !== '/rezultati-pretrage') {
			setSearchData(null)
			localStorage.clear()
		}
	}, [location])

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

		// Car Array to fetch data from collection
		const carObj = [];
		// Cars Array to store all car data from cars collection
		const cars = [];
		// My Cars Array to store all cars from logged in user
		const myCars = [];
		// Cars id
		const carsId = [];

		// Loop fetched collection data to be stored in Car Object
		querySnap.forEach((doc) => {
			const docData = doc.data();
			// Set id for cars
			carsId.push(doc.id);
			// Storing Car Object in Car Object array
			return carObj.push({
				id: doc.id,
				data: docData
			});

		});

		setCarID(carsId)

		// Loop car object array to store them in Cars and My Cars array
		carObj.forEach((car) => {
			// Storing car data in Cars array
			cars.push(car);
			// Stroing user car data in My Cars array
			if(auth.currentUser && auth.currentUser.uid === car.data.uid) {
				myCars.push(car)
			}
		});

		setProfileCars(myCars)
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
			ime: userData.reg_name,
			prezime: userData.reg_lname,
			broj_telefona: userData.reg_number,
			lokacija_vozila: userData.reg_city,
			uid: auth.currentUser.uid,
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

	// Handle Search Change
	const handleSearchChange = (e) => {
		setSearchFormData(e.target.value)
	}

	// Handle Search Submit
	const handleSearchSubmit = (e) => {
		e.preventDefault();

		const dataArr = []

		carsData.forEach(({data, id}) => {
			if(data.naslov_oglasa.toLowerCase().includes(searchFormData.toLowerCase())) {
				dataArr.push({
					id,
					data,
				})
			}
		})

		localStorage.setItem('searchData', JSON.stringify(dataArr));
		localStorage.setItem('searchValue', JSON.stringify(searchFormData))
		setSearchData(dataArr)
		setSearchModal(false)

		navigate('/rezultati-pretrage');
	}

	// Handle Profile Filter Change
	const handleProfileCarsFilter = (e) => {
		const cars = [];
		let carData;
		const option = e.target.value;

		if(window.location.pathname === '/profile') {
			carData = profileCars
		} else {
			carData = userCars
		}

		carData.forEach(({data, id}) => {
			if(option === data.proizvodjac) {
				cars.push({
					id,
					data
				});
			}

			if(option === '') {
				cars.push({
					id,
					data
				});
			}
		})

		setProfileFilterCars(cars);
	}

	return (
		<AppContext.Provider
			value={{
				userData,
				imgSrc,
				carsData,
				profileCars,
				carFormData,
				showOverlay,
				carID,
				searchData,
				searchFormData,
				profileFilterCars,
				userCars,
				searchModal,
				setCurrentUser,
				setSearchModal,
				setProfileFilterCars,
				setUserCars,
				handleProfileCarsFilter,
				handleSearchChange,
				handleSearchSubmit,
				setUserData,
				handleImageChange,
				handleCarFormChange,
				handleCarFormSubmit,
				setImgSrc,
				handleImageDelete,
				getCarsCollection,
				getUserCollection
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;