import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import './styles.css';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';

export default function Login({ History }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try{

            const response = await api.post('/login', {email, password});

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('provider', response.data.provider);
            localStorage.setItem('Caixa', response.data.Caixa);
            localStorage.setItem('Operator', response.data.Operator);

        }catch (err){
            alert('ocoreu um erro: ' + err);
        }
    }

    return(
        <div className='login'>
            <section className='form'>
                <img className='img' src={logo} alt='logo' />
                <h1 className='title'>Login:</h1>
                <form onSubmit={handleLogin}>
                    <input placeholder={'Email'} type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder={'Senha'} type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <button className='button' type='submit'>Entrar</button>
                </form>
            </section>
        </div>
    );
}