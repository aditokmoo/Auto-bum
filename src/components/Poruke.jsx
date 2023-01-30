import Navbar from './Navbar';

export const Poruke = () => {
    return (
        <div className="poruke-section">
            {window.location.pathname === '/poruke' ?
            <>
                <Navbar />
                <div className="container">
                    <h1>Poruke u izradi</h1>
                </div> 
            </>
            :
            <div className="container">
                <h1>Poruke u izradi</h1>
            </div> 
            }
        </div>
    )

}