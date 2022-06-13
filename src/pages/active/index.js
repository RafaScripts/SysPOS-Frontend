import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import './styles.css';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';

export default function Active({ History }){
    const [token, setToken] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try{

            const response = await api.post('/active');

            alert(response.data);

        }catch (err){
            alert('ocoreu um erro: ' + err);
        }
    }

    return(
        <div className='login'>
            <section className='form'>
                <img className='img' src={logo} alt='logo' />
                <h1 className='title'>token:</h1>
                <form onSubmit={handleLogin}>
                    <input placeholder={'Token'} type='text' value={token} onChange={e => setToken(e.target.value)} />
                    <button className='button' type='submit'>Entrar</button>
                </form>
            </section>
        </div>
    );
}