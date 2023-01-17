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
	},
	{
		name: 'VW',
		models: [ 'Arteon', 'Atlas', 'Golf', 'GTI', 'Jetta', 'Passat', 'Polo', 'Tiguan', 'Touareg' ]
	},
	{
		name: 'Mercedes',
		models: [
			'A-Class',
			'B-Class',
			'C-Class',
			'CLA-Class',
			'CL-Class',
			'CLS-Class',
			'E-Class',
			'G-Class',
			'GLA-Class',
			'GLC-Class',
			'GLE-Class',
			'GLS-Class',
			'S-Class',
			'SLC-Class',
			'SL-Class',
			'AMG GT',
			'AMG GT R',
			'AMG GT S',
			'AMG GT C',
			'AMG GT 4-Door Coupe',
			'AMG GT Roadster',
			'AMG GT Black Series',
			'AMG GT3',
			'AMG GT4',
			'AMG GT73',
			'AMG GT83',
			'AMG GT R PRO',
			'AMG GT R PRO AMG GT',
			'AMG GT R AMG GT',
			'AMG GT S AMG GT',
			'AMG GT C AMG GT',
			'AMG GT C Roadster AMG GT',
			'AMG GT R Roadster AMG GT'
		]
	},
	{
		name: 'BMW',
		models: [
			"1 Series",
			"2 Series",
			"3 Series",
			"4 Series",
			"5 Series",
			"6 Series",
			"7 Series",
			"8 Series",
			"i3",
			"i8",
			"X1",
			"X2",
			"X3",
			"X4",
			"X5",
			"X6",
			"X7",
			"Z4",
			"X5 M",
			"X6 M",
			"M2",
			"M3",
			"M4",
			"M5",
			"M6",
			"X5 M",
			"X6 M",
			"M8",
			"X3 M",
			"X4 M",
			"M235i",
			"M340i",
			"M440i",
			"M550i",
			"M760i",
			"Alpina B7",
			"iNext",
			"iX3",
			"i4"
		]
	},
	{
		name: 'Alfa Romeo',
		models: ["Giulia", "Stelvio", "Giulietta", "4C", "Tonale","Giulietta", "159", "Brera", "Spider", "MiTo","8C","GTV","147","156","166","Crosswagon","GT"]
	},
	{
		name: 'Citroen',
		models: ["C5 Aircross", "C3", "C4 Cactus", "C3 Aircross", "Berlingo", "C5", "C4", "C4 Picasso","C1","C3 Picasso","C-Elysée","C-Crosser","C-Zero","C-Triomphe","C-Quatre","C-X25","C-X7"]
	},
	{
		name: 'Hyundai',
		models: ["Accent", "Elantra", "Sonata", "Veloster", "Ioniq", "Kona", "Tucson", "Santa Fe", "Palisade", "Venue","Kona Electric","NEXO","Ioniq Electric","Ioniq Plug-in","Ioniq Hybrid","Sonata Plug-in Hybrid","Santa Fe Hybrid"]
	},
	{
		name: 'Jeep',
		models: ["Wrangler", "Grand Cherokee", "Cherokee", "Renegade", "Compass", "Gladiator", "Wrangler Unlimited","Grand Wagoneer"]
	},
	{
		name: 'Mazda',
		models: ["CX-5", "CX-30", "CX-3", "MX-5", "3", "6", "CX-9", "CX-8", "BT-50", "CX-4"]
	},
	{
		name: 'Opel',
		models: ["Corsa", "Astra", "Insignia", "Crossland X", "Grandland X", "Mokka", "Adam", "Zafira","Vectra","Meriva","Signum","Cascada","GT","Vivaro","Movano","Calypso"]
	},
	{
		name: 'Nissan',
		models: ["Altima", "Sentra", "Versa", "Maxima", "Leaf", "Rogue", "Murano", "Pathfinder", "Armada", "Kicks","GT-R","370Z","Juke","Xterra","NV","NV200"]
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
export const ostalo_info = [
	{
		id: 'metalik_boja',
		name: 'Metalik boja'
	},
	{
		id: 'parking_senzori',
		name: 'Parking senzori'
	},
	{
		id: 'kamera',
		name: 'Kamera'
	},
	{
		id: 'xenon',
		name: 'Xenon'
	},
	{
		id: 'led_zadnja_svjetla',
		name: 'Led zadnja svijetla'
	},
	{
		id: 'vazdusno_vjesanje',
		name: 'Vazdušno vješanje'
	},
	{
		id: 'el_sjediste',
		name: 'El. sjedišta'
	},
	{
		id: 'naslon_za_ruku',
		name: 'Naslon za ruku'
	},
	{
		id: 'sportsko_vjesanje',
		name: 'Sportsko vješanje'
	},
	{
		id: 'paljenje_bez_kljuca',
		name: 'Paljenje bez ključa'
	},
	{
		id: 'grijanje_sjedista',
		name: 'Grijanje sjedišta'
	},
	{
		id: 'torba_za_skije',
		name: 'Torba za skije'
	},
	{
		id: 'led_prednja_svjetla',
		name: 'Led prednja svijetla'
	},
	{
		id: 'tempomat',
		name: 'Tempomat'
	},
	{
		id: 'alu_felge',
		name: 'Alu. felge'
	},
	{
		id: 'multimedija',
		name: 'Multimedija'
	},
	{
		id: 'volan_drvo_koza',
		name: 'Volan - drvo/koža'
	},
	{
		id: 'daljinsko_zakljucavanje',
		name: 'Daljinsko zaključavanje'
	},
	{
		id: 'webasto',
		name: 'Webasto'
	},
	{
		id: 'djecije_sjediste',
		name: 'Dječije sjedište'
	},
	{
		id: 'servo_volan',
		name: 'Servo volan'
	},
	{
		id: 'touch_screen',
		name: 'Touch screen'
	},
	{
		id: 'multi_funkcionalni_volan',
		name: 'Multi-funkcionalni volan'
	},
	{
		id: 'senzor_za_kišu',
		name: 'Senzor za kišu'
	},
	{
		id: 'dpf_filter',
		name: 'DPF filter'
	},
	{
		id: 'panorama_krov',
		name: 'Panorama krov'
	},
	{
		id: 'navigacija',
		name: 'Navigacija'
	},
	{
		id: 'glasovne_komande',
		name: 'Glasovne komande'
	},
	{
		id: 'grijanje_volana',
		name: 'Grijanje volana'
	},
	{
		id: 'bluetooth',
		name: 'Bluetooth'
	},
	{
		id: 'start_stop',
		name: 'Start-stop'
	},
	{
		id: 'el_gepek',
		name: 'El. gepek'
	},
	{
		id: 'šiber',
		name: 'Šiber'
	},
	{
		id: 'kuka_za_vucu',
		name: 'Kuka za vuču'
	},
	{
		id: 'kozni_volan',
		name: 'Kožni volan'
	},
	{
		id: 'svjetla_za_maglu',
		name: 'Svjetla za maglu'
	},
	{
		id: 'automatsko_parkiranje',
		name: 'Automatsko parkiranje'
	},
	{
		id: 'dnevna_svjetla',
		name: 'Dnevna svjetla'
	},
	{
		id: 'ventilacija_sjedista',
		name: 'Ventilacija sjedišta'
	},
	{
		id: 'sjedista_podesiva_po_visini',
		name: 'Sjedišta podesiva po visini'
	},
	{
		id: 'sportska_sjedista',
		name: 'Sportska sjedišta'
	},
	{
		id: 'usb',
		name: 'Usb'
	},
	{
		id: 'el_podizaci',
		name: 'El. podizači'
	},
	{
		id: 'dvd_tv',
		name: 'Dvd/tv'
	},
	{
		id: 'masazna_sjedista',
		name: 'Masažna sjedišta'
	},
	{
		id: 'ambijentalno_osvjetljenje',
		name: 'Ambijentalno osvjetljenje'
	},
	{
		id: 'el_retrovizori',
		name: 'El. retrovizori'
	},
	{
		id: 'radio_kastofon',
		name: 'Radio/kasetofon'
	}
];