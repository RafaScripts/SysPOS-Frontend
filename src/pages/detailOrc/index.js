import React, {useState, useEffect} from 'react';
import api from "../../services/api";
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png';
import {FiAlignJustify, FiEye, FiMonitor, FiPower} from 'react-icons/fi';
//import pdf from 'html-pdf';
//import fs from 'fs';
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
    <Link className='item' to='/produtos' >Produtos</Link>,
    <Link className='item' to='/' >Importar CSV</Link>,
    <Link className='item' to='/' >Importar XML</Link>,
    <Link className='item' to='/' >Usuarios</Link>,
    <Link className='item' to='/' >Fiscal</Link>,
    <Link className='item' to='/' >Relatorios</Link>

]

export default function DetailOrc({ history }){
    const [orc, setOrc] = useState([]);
    const [reference, setReference] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

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
    }, []);
    //console.log(orc);

    const sumall = orc.map(item => item.valor).reduce((prev, curr) => prev + curr, 0);
    //console.log(sumall);

    async function handleLogout(){
        await localStorage.clear();

        history.push('/');
    }

    async function productInsert(e){
        alert('ok')
    }


    async function print(){
        /*
        let empresa = 'Elétrica Luz';

        let endereco = 'Av. Alagoas, 452 | Vitória da Conquista - BA';

        let base = `
        <h1>{empresa}</h1>
        <h2>{endereco}</h2>
        <h3>Recibo</h3>
        <table>
          <tr>
             <th>Produto</th>
             <th>Valor</th>
          </tr>
          <tr>
             <td></td>
             <td>Valor</td>
          </tr>
          <tr>
             <th>Valor Total</th>
             <th>R$</th>
          </tr>
        </table>
        `
        */
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
                    <form onSubmit={productInsert}>
                        <input placeholder='referencia' value={reference} onChange={e => setReference(e.target.value)}/>
                        <select>
                            <option>xxxxx</option>
                            <option>wwwww</option>
                        </select>
                        <input placeholder='quantidade' value={quantidade} onChange={e => setQuantidade(e.target.value)}/>
                        <input placeholder='valor' value={valor} onChange={e => setValor(e.target.value)}/>
                        <button className='button' type='submit'>Inserir</button>
                    </form>

                    <table className='table'>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                        {orc.map(val => {
                            return(
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.quantidade}</td>
                                    <td>{val.valor}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <th>valor total:</th>
                            <th>  </th>
                            <th>  </th>
                            <th>R$: {sumall}</th>
                        </tr>
                    </table>
                    <button onClick={print}>Imprimir</button>
                </div>
            </div>
        </div>
    );
}