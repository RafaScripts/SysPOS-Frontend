import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import {FiAlignJustify, FiMonitor, FiPower, FiXCircle } from 'react-icons/fi';
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

export default function Products({history}){
    const [products, setProducts] = useState([]);
    const [reference, setReference] = useState('');
    const [search, setSearch] = useState([]);

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

            setProducts(response.data);
        }
        loadProducts();
    }, []);
    

    async function handleLogout() {
        await localStorage.clear();

        history.push('/');
    }

    async function handleSearch(e) {
        e.preventDefault();

        if(reference === ''){
            alert('Por favor, preencha o campo de busca!');
        }else{
            const response = await api.get(`/itens?reference=${reference}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSearch(response.data);
            console.log(search);
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

                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Referencia</th>
                            <th>Descricao</th>
                            <th>Quantidade</th>
                            <th>Preco</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.reference}</td>
                                <td>{product.name}</td>
                                <td>{product.quantidade}</td>
                                <td>{product.Value}</td>
                                <td>
                                    <button className='button' type="button" onClick={() => handleSearchClear()}>
                                        <FiXCircle size={18} color="#FFF" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
<<<<<<< Updated upstream
                            <th>Referência</th>
=======
                            <th>Referencia</th>
>>>>>>> Stashed changes
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.reference}</td>
                                <td>{product.name}</td>
                                <td>{product.quantidade}</td>
                                <td>{product.Value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}