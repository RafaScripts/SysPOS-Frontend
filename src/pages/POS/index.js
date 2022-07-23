import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {FiAlignJustify, FiChevronLeft, FiMonitor, FiPower} from 'react-icons/fi';
import './styles.css';
import {slide as Menu} from "react-burger-menu";
import logo from "../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png";
import api from '../../services/api';

//MUI
import { ProductsPosGrid } from '../../components/ProductsGrid/productsgrid';

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
    <Link className='item' to='/' >Importar CSV</Link>,
    <Link className='item' to='/' >Importar XML</Link>,
    <Link className='item' to='/' >Usuarios</Link>,
    <Link className='item' to='/' >Fiscal</Link>,
    <Link className='item' to='/' >Relatorios</Link>

]

const filter = {
    reference: 'reference',
    id: 'id'
}

export default function POS() {
    const [Products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [reference, setReference] = useState('');
    
    console.log(Products);
    
    const addItemInArray = async (response) => {
      console.log(response.data);
      
      let base = {
        'id': response.data[0].id,
        'reference': response.data[0].reference,
        'quantidade': 1,
        'value': 'R$2,00'
      }
      
      console.log(base);
      
      setProducts(...Products, base);
      
      console.log(Products);
    }

    const searchProduct = async (e) => {
        e.preventDefault();
        let search;
        let value;

        if(reference){
            search = filter.reference;
        }

        if(reference){ value = reference };

        value = id;

        search = filter.id;
        
        let token = localStorage.getItem('token');

        const response = await api.get(`/itens?${search}=${value}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if(response){
          addItemInArray(response);
        }
        
        
    }

    return(
        <div className='base'>
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
                <Link className='button' to={'/home'}>
                    <FiChevronLeft size={26} color="#FFF" />
                </Link>
            </header>
            <div className='addItem'>
                <div className='boxContent'>
                    <form onSubmit={searchProduct}>
                        <input placeholder='id' value={id} onChange={e => setId(e.target.value)} />
                        <input placeholder='reference' value={reference} onChange={e => setReference(e.target.value)}/>
                        <input placeholder='nome'/>
                        <input placeholder='quantidade'/>
                        <input placeholder='valor' value={'R$14'} disabled/>
                        <button type='submit'>Adicionar</button>
                    </form>
                </div>
            </div>

            <ProductsPosGrid/>
          
          


        </div>
    );
}