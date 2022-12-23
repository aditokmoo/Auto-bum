// Grad Filter
export const cities = [
	'Sarajevo',
	'Banja Luka',
	'Tuzla',
	'Mostar',
	'Bihac',
	'Zenica',
	'Doboj',
	'Prijedor',
	'Vlasenica',
	'Brcko',
	'Trebinje',
	'Bijeljina',
	'Gradačac',
	'Kakanj',
	'Kalesija',
	'Kladanj',
	'Konjic',
	'Livno',
	'Modrica',
	'Mrkonjic Grad',
	'Neum',
	'Odžak',
	'Pale',
	'Posusje',
	'Prnjavor',
	'Rogatica',
	'Srebrenica',
	'Teslic',
	'Travnik',
	'Višegrad'
];

// Godište Filter
export const yearType = [];
let currentYear = new Date().getFullYear();
// Loop to get years
for (let year = 1980; year <= currentYear; year++) {
	yearType.push(year);
}

// Gorivo Filter
export const fuelType = [ 'Dizel', 'Benzin', 'Plin', 'Hibrid', 'Elektro' ];

// Kubikaza
export const cubicType = [];
// Loop to get cubics
for (let cubic = 0.6; cubic <= 7.5; cubic += 0.1) {
	cubicType.push(cubic.toFixed(1));
}

// Vlasništvo
export const ownerShipType = [ 'Domaće tablice', 'Strane tablice', 'Odjavljen', 'Na ime kupca' ];

// Klima
export const climateType = [ 'Automatska', 'Manuelna', 'Nema klimu' ];

// Mjenjac
export const gearType = [ 'Manuelni', 'Polu-automatski', 'Automatski', 'CVT' ];

// Auta Filter
export const cars = [
	{
		name: 'Toyota',
		models: [
			'Corolla',
			'Camry',
			'Prius',
			'RAV4',
			'Tacoma',
			'Highlander',
			'4Runner',
			'Land Cruiser',
			'Avalon',
			'Yaris'
		]
	},
	{
		name: 'Audi',
		models: [
			'Audi A3',
			'Audi A4',
			'Audi A5',
			'Audi A6',
			'Audi A7',
			'Audi A8',
			'Audi Q3',
			'Audi Q5',
			'Audi Q7',
			'Audi Q8',
			'Audi TT',
			'Audi R8',
			'Audi RS 3',
			'Audi RS 5',
			'Audi RS 7',
			'Audi S3',
			'Audi S4',
			'Audi S5',
			'Audi S6',
			'Audi S7',
			'Audi e-tron',
			'Audi e-tron Sportback',
			'Audi e-tron GT',
			'Audi e-tron GT RS',
			'Audi Q2',
			'Audi Q4 e-tron',
			'Audi Q4 e-tron Sportback',
			'Audi Q4 e-tron GT',
			'Audi Q4 e-tron GT RS',
			'Audi Q6 e-tron',
			'Audi Q6 e-tron Sportback',
			'Audi Q6 e-tron GT',
			'Audi Q6 e-tron GT RS',
			'Audi E-Tron Vision Gran Turismo',
			'Audi PB18 e-tron'
		]
	}
];

// Emisioni standard
export const standards = [ 'Euro1', 'Euro2', 'Euro3', 'Euro4', 'Euro5', 'Euro6' ];

// Broj brzina mjenjaca
export const gearNumShifts = [];

for (let gearShift = 1; gearShift <= 10; gearShift++) {
	gearNumShifts.push(gearShift);
}

// Broj vrata
export const numberOfDors = [ '2/3', '4/5' ];

// Strana volana
export const steeringSide = [ 'Lijeva', 'Desna' ];

// Boja spoljasnosti
export const outsideColor = [
	'Bež',
	'Bijela',
	'Crna',
	'Crvena',
	'Ljubicasta',
	'Narandzasta',
	'Siva',
	'Plava',
	'Smeđa',
	'Srebrena',
	'Zelena',
	'Zlatna',
	'Žuta'
];

// Oštecenje
export const damages = [ 'Da', 'Ne' ];

// Karoserija
export const bodys = [
	'Limuzina',
	'Malo auto',
	'Karavan',
	'Kombi',
	'Terenac',
	'Kabriolet',
	'Sportski/Kupe',
	'Off-road',
	'Caddy',
	'Pick-Up',
	'Oldtimer',
	'Ostalo'
];

// Pogon
export const drives = [ 'Prednji', 'Zadnji', '4x4' ];

// Sjedeca mjesta
export const numOfSittingPlaces = [];
// Loop to get number of sitting places
for (let sittingPlace = 1; sittingPlace <= 8; sittingPlace++) {
	numOfSittingPlaces.push(sittingPlace);
}

// OSTALE INFORMACIJE
export const row_one = [
	'Metalik boja',
	'Parking senzori',
	'Head-on-display',
	'Kamera',
	'Xenon',
	'Led zadnja svijetla',
	'Vazdušno vješanje',
	'El. sjedišta',
	'Naslon za ruku',
	'Sportsko vješanje',
	'Paljenje bez ključa',
	'Grijanje sjedišta'
];

export const row_two = [
	'Led prednja svijetla',
	'Tempomat',
	'Alu. felge',
	'Multimedija',
	'Volan - drvo/koža',
	'Daljinsko zaključavanje',
	'Webasto',
	'Dječije sjedište',
	'Servo volan',
	'Touch screen',
	'Multi-funkcionalni volan',
	'Senzor za kišu'
];

export const row_three = [
	'DPF filter',
	'Panorama krov',
	'Navigacija',
	'Glasovne komande',
	'Grijanje volana',
	'Bluetooth',
	'Start-stop',
	'El. gepek',
	'Šiber',
	'Kuka za vuču',
	'Kožni volan',
	'Svjetla za maglu'
];

export const row_four = [
	'Automatsko parkiranje',
	'Dnevna svjetla',
	'Ventilacija sjedišta',
	'Sjedišta podesiva po visini',
	'Sportska sjedišta',
	'Usb',
	'El. podizači',
	'Dvd/tv',
	'Masažna sjedišta',
	'Ambijentalno osvjetljenje',
	'El. retrovizori',
	'Radio/kasetofon'
];
