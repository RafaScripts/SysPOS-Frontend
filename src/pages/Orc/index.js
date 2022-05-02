import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import { FiAlignJustify, FiMonitor, FiPower, FiEye } from 'react-icons/fi'
import { DateTime } from "react-intl-datetime-format";
import './styles.css';
import api from '../../services/api';

var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        top: '36px'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        left: '0px',
        top: '103px'
    },
    bmMenu: {
        background: '#a77dff',
        margin: '0px',
        padding: '0px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '3em'
    },
    bmOverlay: {
        top: '16.4%',
        left: '0px'
    },
}

let items;

items = [
    <Link className='item' to='/' >Ponto de Venda</Link>,
    <Link className='item' to='/orcamentos' >Orçamentos</Link>,
    <Link className='item' to='/' >Produtos</Link>,
    <Link className='item' to='/' >Importar CSV</Link>,
    <Link className='item' to='/' >Importar XML</Link>,
    <Link className='item' to='/' >Usuarios</Link>,
    <Link className='item' to='/' >Fiscal</Link>,
    <Link className='item' to='/' >Relatorios</Link>

]

export default function Orc({ history }) {
    const [orcamentos, setOrcamentos] = useState([]);

    useEffect(() => {
        async function loadOrc(){
            const token = localStorage.getItem('token')
            const response = await api.get('/orcamentos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setOrcamentos(response.data);
        }
        loadOrc();
    });

    async function handleLogout(){
        await localStorage.clear();

        history.push('/');
    }

    async function GoToDetail(id){
        await localStorage.setItem('id', id);

        history.push('/orcamento/detail');
    }

    return(
        <div className="list">
            <header>
                <div id="outer-container">
                    <Menu styles={styles} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                        {items}
                    </Menu>
                    <main id="page-wrap">
                        <FiAlignJustify className='mmen' />
                    </main>
                </div>
                <img src={logo} alt="Logo" />
                <Link className="button" to="/product"><FiMonitor /> POS</Link>
                <button className='bb' type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#FFF" />
                </button>
            </header>

            <img className='backs' src={logo}/>
            <div className='ORC'>
                <h2>Orçamentos:</h2>
                <hr/>

                <table className='table'>
                    <tr>
                        <th>ID</th>
                        <th>Vendedor</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Valor Total</th>
                        <th>Ver</th>
                    </tr>
                    {orcamentos.map(val => {
                        return(
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.username}</td>
                                <td><DateTime>{val.created_at}</DateTime></td>
                                <td>COD:{val.statuss} {val.status}</td>
                                <td>{val.valor_total}</td>
                                <td><button className='bbb' onClick={() => GoToDetail(val.id)}><FiEye className='eye'/></button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}