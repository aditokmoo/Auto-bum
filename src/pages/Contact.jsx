import Navbar from '../components/Navbar'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai'
import './css/contact.css'

export const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="contact-section">
                <div className="container">
                    <h3>Imate li pitanja?</h3>
                    <p>Ukoliko imate pitanje o oglašavanju ili kupovini na našem portalu ili Vam je potrebna bilo kakva pomoć, kontaktirajte nas putem sajta ili nekim od drugih načina i odgovorićemo u što kraćem roku.</p>
                    <h5>Telefon</h5>
                    <p>066/811-312</p>
                    <h5>Email adresa</h5>
                    <p>marketing@autobum.ba</p>
                    <h5>Društvene mreže</h5>
                    <ul>
                        <li><a href="https://www.facebook.com/AUTOBUM.BA/"><FaFacebookF /></a></li>
                        <li><a href="https://www.instagram.com/autobum.ba/"><AiOutlineInstagram /></a></li>
                        <li><a href="https://www.youtube.com/channel/UC5e6tcbNkUSD6sv38SYjX9Q"><AiFillYoutube /></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}