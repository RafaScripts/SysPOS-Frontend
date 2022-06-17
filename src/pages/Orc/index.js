import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import { FiAlignJustify, FiMonitor, FiPower, FiEye, FiTrash2 } from 'react-icons/fi'
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
    <Link className='item' to='/pos' >Ponto de Venda</Link>,
    <Link className='item' to='/orcamentos' >Orçamentos</Link>,
    <Link className='item' to='/produtos' >Produtos</Link>,
    <Link className='item' to='/' >Importar CSV</Link>,
    <Link className='item' to='/' >Importar XML</Link>,
    <Link className='item' to='/' >Usuarios</Link>,
    <Link className='item' to='/' >Fiscal</Link>,
    <Link className='item' to='/' >Relatorios</Link>

]

export default function Orc({ history }) {
    const [orcamentos, setOrcamentos] = useState([]);
    const [id, setId] = useState('');
    const [page, setPage] = useState('');
    console.log(page);
    console.log(id);

    useEffect(() => {
        async function loadOrc(){
            const token = localStorage.getItem('token')
            const response = await api.get(`/orcamentos?pages=${page}&id=${id}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setOrcamentos(response.data);
        }
        loadOrc();
    }, []);

    async function handleLogout(){
        await localStorage.clear();

        history.push('/');
    }

    async function GoToDetail(id, products_id, username, status, statuss){
        await localStorage.setItem('username', username);
        await localStorage.setItem('status', status);
        await localStorage.setItem('statuss', statuss);
        await localStorage.setItem('ppID', products_id);
        await localStorage.setItem('oID', id);

        history.push('/orcamento/detail');
    }

    async function deleteOrc(id, products_id){
        const token = localStorage.getItem('token')
        await api.delete(`/orcamentos?id${id}&ppID${products_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        history.push('/orcamentos');
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
            <div className='ORC'>
                <h2>Orçamentos:</h2>
                <hr/>

                <div>
                    <select>
                        <option value={page} onChange={e => setPage(e.target.value)}>1</option>
                        <option value={page} onChange={e => setPage(e.target.value)}>2</option>
                    </select>
                    <form>
                        <input type="search" onChange={e => setId(e.target.value)} placeholder="Pesquisar por id" />
                    </form>
                </div>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vendedor</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Valor Total</th>
                            <th>Ver</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentos.map(orcamento => (
                            <tr key={orcamento.id}>
                                <td>{orcamento.id}</td>
                                <td>{orcamento.username}</td>
                                <td><DateTime>{orcamento.created_at}</DateTime></td>
                                <td>{orcamento.status}</td>
                                <td>{orcamento.valor_total}</td>
                                <td>
                                    <button className='button' type="button" onClick={() => GoToDetail(orcamento.id, orcamento.products_id, orcamento.username, orcamento.status, orcamento.statuss)}>
                                        <FiEye size={18} color="#FFF" />
                                    </button>
                                </td>
                                <td>
                                    <button className='button' type="button" onClick={() => deleteOrc(orcamento.id, orcamento.products_id)}>
                                        <FiTrash2 size={18} color="#FFF" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}