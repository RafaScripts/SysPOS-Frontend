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
    //console.log(orc);

    const token = localStorage.getItem('token');

    useEffect(() => {
        async function loadORC(){
            const ppID = localStorage.getItem('ppID');
            const response = await api.get(`/orcamentos?ppID=${ppID}`, {});

            const test = response.data;

            setOrc(test.products);
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

        let data = {
            id: reference,
            produto: 'xxxx',
            quantidade: quantidade,
            valor: Number(quantidade) * Number(valor)
        };

        const addItem = () => {
            const id = Math.max(...orc.map(item => item.id), 0) + 1;
            setOrc([...orc, data]);
        }

        addItem();
        /*setOrc([...orc, data]);*/

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

    async function updateOrc(){
        const ppID = localStorage.getItem('ppID');
        const oID = localStorage.getItem('oID');

        let data = {
            produtos: orc,
            valor_total: sumall
        }

        const response = await api.put(`/orcamentos?ppID=${ppID}&id=${oID}`, data);

        const test = response.data;
        alert('Orçamento atualizado com sucesso!');
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
                <Link className="button" to="/product"><FiMonitor /> POS</Link>
                <button className='bb' type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#FFF" />
                </button>
            </header>
            <div>
                <h1>Detalhamento: {localStorage.getItem('oID')}</h1>
                <div>
                    <form>
                        <input placeholder='referencia' value={reference} onChange={e => setReference(e.target.value)}/>
                        <input placeholder='nome' value={nome} onChange={e => setNome(e.target.value)} disabled={true}/>
                        <input placeholder='quantidade' value={quantidade} onChange={e => setQuantidade(e.target.value)}/>
                        <input placeholder='valor' value={valor} onChange={e => setValor(e.target.value)}/>
                        <button className='button' type="button" onClick={() => productInsert(reference, quantidade, valor)}>Inserir</button>
                    </form>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orc.map((value, index, array) => (
                                <tr key={index} >
                                    <td >{value.id}</td>
                                    <td>{value.produto}</td>
                                    <td>{value.quantidade}</td>
                                    <td>{value.valor}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>valor total:</th>
                                <th>  </th>
                                <th>  </th>
                                <th>R$: {sumall}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <button onClick={print}>Imprimir</button>
                    <button className='button' type="button" onClick={() => updateOrc()}>Atualizar</button>
                    <button className='button' type="button" onClick={() => history.push('/orcamentos')}>voltar</button>
                </div>
            </div>
        </div>
    );
}