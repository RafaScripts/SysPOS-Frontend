import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function POS() {
    const [products, setProducts] = useState([]);
    const [valor_total, setValorTotal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [valor_final, setValorFinal] = useState(0);
    const [orcamento, setOrcamento] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/itens');
            setProducts(response.data);
        }
        loadProducts();
    }, []);

    const options = products.map(product => (
        <option key={product.id} value={product.id}>{product.name}</option>
    ));


    return(
        <div className='base'>
            <header>
                <p>Ponto de Venda</p>
                <Link className='button' to='/home'> <FiChevronLeft /> </Link>
            </header>
            <form onSubmit={() => {}}>
                <input placeholder='reference'/>
                <input placeholder='nome'/>
                <select>
                    {options}
                </select>
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
            <div>
                <button>Finalizar</button>
                <button>Imprimir</button>
                <button>Cancelar</button>
            </div>

        </div>
    );
}