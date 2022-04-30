import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import { FiAlignJustify, FiMonitor, FiPower } from 'react-icons/fi'
import './styles.css';

export default function Home() {
    return(
        <div className="list">
            <header>
                <button className='button'><FiAlignJustify /></button>
                <img src={logo} alt="Logo" />
                <Link className="button" to="/product"><FiMonitor /> POS</Link>
                <button type="button">
                    <FiPower size={18} color="#FFF" />
                </button>
            </header>
        </div>
    );
}