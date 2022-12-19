import React from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import './css/home.css'

function Home() {
  return (
    <>
      <Navbar />
      <header>
        <div className="container">
          <div className="home-section">
            <form>
              <AiFillCar className='car_icon' />
              <input type="text" placeholder='Audi A4 B8 2.0TDI' />
              <button><FaSearch /></button>
            </form>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home