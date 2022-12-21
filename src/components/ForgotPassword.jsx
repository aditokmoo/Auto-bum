import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = ({ showLoginModal }) => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();

            await sendPasswordResetEmail(auth, email);
            toast.success('Email je poslan')
        } catch (error) {
            toast.error('Reset lozinke nije poslan');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="forgot-input-container">
                    <label htmlFor="email">Email adresa</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email...' id='forgot_email' />
                </div>
                <button>Pošalji</button>
                <p>Natrag na <span onClick={showLoginModal}>prijavu</span></p>
            </div>
        </form>
    )
}

export default ForgotPassword