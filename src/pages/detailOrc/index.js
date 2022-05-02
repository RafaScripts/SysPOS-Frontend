import React, {useState, useEffect} from 'react';
import api from "../../services/api";

export default async function DetailOrc(){
    const [orc, setOrc] = useState([]);
    const [itens, setItens] = useState([]);
    const id = localStorage.getItem('id')

    const token = localStorage.getItem('token');

    const response = await api.get(`/orcamentos?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    setOrc(response.data);
    setItens(response.data.produtos.itens);

    return(
        <div>
            {orc.map(val => {
                <div>
                    <input placeholder={val.user_id}/>
                    <input placeholder={val.statuss}/>
                    <input placeholder='Referencia / id' />
                    <table>
                        <tr>
                            <th>id / Referencia</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                        {itens.map(vall => {
                            <tr key={vall.item_id}>
                                <td>teste</td>
                            </tr>
                        })}
                    </table>
                </div>
            })}
        </div>
    )
}