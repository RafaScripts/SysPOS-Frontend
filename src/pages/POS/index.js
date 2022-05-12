import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import './styles.css';

export default function POS() {
    return(
        <div className='base'>
            <header>
                <p>Ponto de Venda</p>
                <Link to='/home'> <FiChevronLeft /> </Link>
            </header>
            <form onSubmit={() => {}}>
                <input placeholder='reference'/>
                <input placeholder='nome'/>
                <input placeholder='quantidade'/>
                <button type='submit'>Adicionar</button>
            </form>
            <div className='content'>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nome</th>
                            <th>quantidade</th>
                            <th>preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Coca-Cola</td>
                            <td>1</td>
                            <td>R$ 3,00</td>
                        </tr>
                        <tr>
                            <th>Valor total</th>
                            <td></td>
                            <td></td>
                            <th>R$ 3,00</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}