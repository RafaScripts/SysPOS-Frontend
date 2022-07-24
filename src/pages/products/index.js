import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import {FiAlignJustify, FiMonitor, FiPower, FiEdit } from 'react-icons/fi';
import './styles.css';
import moment from 'moment';

// MUI
import { DataGrid } from '@mui/x-data-grid';
import {ProductsGrid} from "../../components/ProductsGrid/productsgrid";

const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'reference', headerName: 'Referência', width: 130 },
    { field: 'produto', headerName: 'Produto', width: 130 },
    { field: 'quantidade', headerName: 'Quantidade', width: 80 },
    { field: 'value', headerName: 'Preço', width: 80 },
    { field: 'value_cust', headerName: 'Preço de Custo', width: 80 },
    { field: 'CEST', headerName: 'CEST', width: 80 },
    { field: 'NCM', headerName: 'NCM', width: 130 },
    { field: 'IPI', headerName: 'IPI', width: 80 },
    { field: 'created_at', headerName: 'Cadastrado', width: 130 },
    { field: 'cEAN', headerName: 'cEAN', width: 80 },
    { field: 'updated_at', headerName: 'Atualizado', width: 130 },
    { field: 'vendor_id', headerName: 'Fornecedor', width: 30 }
];

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

export default function Products({history}){
    const [products, setProducts] = useState([]);
    const [reference, setReference] = useState('');
    const [search, setSearch] = useState([]);

    const editIcon = (
        <Link to={'/home'}>
            <FiEdit color="#a77dff" />
        </Link>
    );

    let items = [
        <Link className='item' to='/home'>Home</Link>,
        <Link className='item' to='/pos' >Ponto de Venda</Link>,
        <Link className='item' to='/orcamentos' >Orçamentos</Link>,
        <Link className='item' to='/produtos' >Produtos</Link>,
        <Link className='item' to='/' >Importar CSV</Link>,
        <Link className='item' to='/' >Importar XML</Link>,
        <Link className='item' to='/' >Usuarios</Link>,
        <Link className='item' to='/' >Fiscal</Link>,
        <Link className='item' to='/' >Relatorios</Link>

    ];

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/itens', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data)
            setProducts(response.data);
        }
        loadProducts();
    }, []);

    let list = [];
    let i = 0;

    for(i; i < products.length; i++){
        const base = {
            "id": `${products[i].id}`,
            "reference": `${products[i].reference}`,
            "produto": `${products[i].name}`,
            "quantidade": `${products[i].quantidade}`,
            "value": `R$${products[i].Value}`,
            "CEST":`${products[i].CEST}`,
            "IPI": `${products[i].IPI}`,
            "NCM": `${products[i].NCM}`,
            "cEAN": `${products[i].cEAN}`,
            "value_cust": `R$${products[i].value_cust}`,
            "created_at": `${moment(products[i].created_at).format('DD/MM/YYYY')}`,
            "updated_at": `${moment(products[i].update_at).format('DD/MM/YYYY')}`,
            "vendor_id": `${products[i].vendor_id}`
        }
        list.push(base)
    }

    async function handleLogout() {
        await localStorage.clear();

        history.push('/');
    }

    async function validateFields(reference) {
        if(reference === ''){
            alert('Preencha o campo com a referência do produto');
            return false;
        }
    }

    async function handleSearch(e) {
        const test = validateFields(reference);
        if(test){
            localStorage.setItem('reference', reference);
            history.push('/produtos/edit');
        }
    }

    async function handleSearchClear(){
        await setSearch([]);
    }

    return (
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

            <h2 className="title">Produtos: </h2>
            <hr />

            <div className="PRD">
                <form onSubmit={handleSearch}>
                    <input placeholder='referencia' value={reference} onChange={e => setReference(e.target.value)}/>
                    <button className='button' type="submit">Pesquisar</button>
                </form>

                <ProductsGrid rows={list} />

            </div>
        </div>
    );
}