import React, {useState} from 'react';
import api from '../../services/api'
import './styles.css';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {email, password};

    async function handleLogin(e) {
        e.preventDefault();

        try{

            const response = await api.post('/login', data);

            console.log(response.data);

            localStorage.setItem('user_id', response.data.user.id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('provider', response.data.user.Provider);
            localStorage.setItem('Caixa', response.data.user.Caixa);
            localStorage.setItem('Operator', response.data.user.Operator);

            history.push('/home');
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