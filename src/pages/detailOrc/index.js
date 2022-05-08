import React, {useState, useEffect} from 'react';
import api from "../../services/api";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import { FiAlignJustify, FiMonitor, FiPower } from 'react-icons/fi'
import { DateTime } from "react-intl-datetime-format";
import './styles.css';

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

export default function DetailOrc({ history }){
    const [orc, setOrc] = useState([]);


    const token = localStorage.getItem('token');

    useEffect(() => {
        async function loadORC(){
            const ppID = localStorage.getItem('pID');
            const response = await api.get(`/orcamentos?ppID=${ppID}`, {});

            const test = response.data;

            test.map(value => {
                let tt = value.products;

                setOrc(tt.itens);
            })
        }
        loadORC();
    });
    console.log(orc);

    async function handleLogout(){
        await localStorage.clear();

        history.push('/');
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
            <div>
                <h1>Detalhamento</h1>
                <div>
                    {orc.map((value, index) => {
                        {
                           
                        }
                    })}
                </div>
            </div>
        </div>
    )
}