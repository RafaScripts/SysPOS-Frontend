import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import { FiAlignJustify, FiMonitor, FiPower } from 'react-icons/fi'
import './styles.css';

//MUI
import { Input } from '@mui/material';

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
    <Link className='item' to='/pos' >Ponto de Venda</Link>,
    <Link className='item' to='/orcamentos' >Orçamentos</Link>,
    <Link className='item' to='/produtos' >Produtos</Link>,
    <Link className='item' to='/csv' >Importar CSV</Link>,
    <Link className='item' to='/' >Importar XML</Link>,
    <Link className='item' to='/' >Usuarios</Link>,
    <Link className='item' to='/' >Fiscal</Link>,
    <Link className='item' to='/' >Relatorios</Link>

]

export default function ImportCSV({ history }) {

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
                <Link className="button" to="/pos"><FiMonitor /> POS</Link>
                <button className='bb' type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#FFF" />
                </button>
            </header>

            <img className='backs' src={logo}/>

            <h2>Importar Produtos em CSV</h2>
            <hr />

            <p>Para importar Produtos por meio de lista .CSV use esta base para <a>preencher</a> <br />
                lembre-se de que o arquivo deve estar no formato .CSV e não .XLSX ou .XLS <br />
                lembre-se tambem de apagar a primeira linha do arquivo .CSV pois ela é o cabeçalho <br />
            </p>

            <hr />

            <div className="form">
                <form action="">
                    <input type="file" name="file" id="file" />
                    <Input type="file" />
                    <button type="submit">Importar</button>
                </form>
            </div>
        </div>
    );
}