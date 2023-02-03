import Navbar from '../components/Navbar'
import './css/politikaPrivatnosti.css'

export const PolitikaPrivatnosti = () => {
    return (
        <>
            <Navbar />
            <div className="politika-privatnosti-section">
                <div className="container">
                    <h4>Politika privatnosti</h4>
                    <p>Zaštita privatnosti naših korisnika prilikom korištenja Internet stranice www.autobum.ba od iznimnog je značaja za sistem I ogranizaciju firme auto oglasi “AUTO BUM”</p>
                    <p>AUTO BUM sve korisnike stranice www.autobum.ba smatra svojim partnerima s kojima sarađujemo u skladu sa dobrim poslovnim običajima, uz puno poštivanje svih prava naših korisnika. Za korišćenje maksimalnog potencijala sistema AUTO BUM, koriste se i neki lični podaci korisnika a sve u skladu sa propisima i standardima.</p>

                    <h4>Podaci koje prikupljamo</h4>
                    <p>Podaci koje www.autobum.ba prikuplja i čuva na svojim serverima su samo oni podaci koji su potrebi radi korištenja stranice www.autobum.ba, kao i radi profesionalnih odnosa između www.autobum.ba i korisnika, te korisnika međusobno.</p>
                    <p>Određeni podaci mogu se u skladu da odredbama Zakona o zaštiti ličnih podataka i odredbama GDPR-a smatrati ličnima, a takvi su:</p>

                    <ul>
                        <li>Ime i prezime</li>
                        <li>E-mail adresa</li>
                        <li>Broj telefona</li>
                        <li>Lokacija</li>
                    </ul>

                    <h4>Zaštita podataka svih korisnika</h4>
                    <p>Neovisno o tome što www.autobum.ba ima privatne i komercijalne korisnike, za zaštitu podataka i jednih i drugih poduzeli smo tehničke i organizacijske mjere, posebno protiv gubitka, manipulacije i neovlaštenog pristupa. Postupak zaštite podataka kontinuirano prilagođavamo tehničkom razvoju.</p>

                    <h4>Prikupljanje i obrada osobnih podataka</h4>
                    <p>Posebno značajnim smatramo istaknuti to da se osobni podaci naših korisnika pohranjuju uvijek i isključivo na dobrovoljnoj osnovi. To znači, samo onda kada nam naši korisnici, u okviru registracije kod upita, izričito ustupe svoje lične podatke. Način ustupanja tih podataka podrazumijeva da svaki korisnik sam, dobrovoljno unese podatke o sebi prilikom registracije, a obim unesenih ličnih podataka ovisi isključivo o korisniku.</p>
                    <p>www.autobum.ba ne vrši obradu podataka korisnika, a svako prikupljanje podataka izvršeno je isključivo uz suglasnost i pristanak naših korisnika i služi isključivo da bi naši korisnici mogli koristiti opcije stranice www.autobum.ba</p>
                    <p>Podatke naših korisnika nikada ne šaljemo trećim licima.</p>
                    <p>Svaki naš korisnik nalog  može povući u bilo kojem trenutku bez roka i sa stupanjem na snagu odmah.</p>
                    <p>AUTO BUM je sistem koji ne koristi nikakve dodatne sisteme koji mogu prikupljati podatke o njihovim korisnicima.</p>
                    <p>Sajt se može koristiti bez ostavljanja ličnih podataka!</p>
                </div>
            </div>
        </>
    )
}