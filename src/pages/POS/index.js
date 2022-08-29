import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {FiAlignJustify, FiChevronLeft, FiMonitor, FiPower} from 'react-icons/fi';
import './styles.css';
import {slide as Menu} from "react-burger-menu";
import logo from "../../assets/Astronaut-and-Saturn-cartoon-illustration-vector-removebg-preview 1.png";
import api from '../../services/api';

//MUI
import { ProductsPosGrid } from '../../components/ProductsGrid/productsgrid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

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

const status = {
  Criado: 2,
  Vendido: 3,
  Cancelado: 4,
  Devolucao: 5
}

export default function POS() {
    const [Products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [reference, setReference] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [valor, setValor] = useState('');
    const [name, setName] = useState('');
    const [rItem, setRItem] = useState('');
    const [arItem, setARItem] = useState('');
    const [valorTotal, setValorTotal] = useState(0);
    
    /*const calculate = async (Products) => {
      let val;
      
      for(let i = 0; i < Products.length; i++){
        val += Products[i].sum;
        
        setValorTotal(val);
      }
      
      return;
      
    }*/
  
    //calculate(Products);
    
    const saveORC = async () => {
  
      //calculate(Products);
      
      const orc = {
        user_id: Number(localStorage.getItem('user_id')),
        produtos: Products,
        statuss: status.Criado,
        valor_total: valorTotal
      }
      
      console.log(orc);
  
      const response = await api.post(`/orcamentos`, orc, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
    }
    
    const removeItem = async (reference, id) => {
      let search;
      if(reference) search = reference;
      search = id;
      
      for(let i = 0; i < Products.length; i++){
        if(reference){
          if(reference === Products[i].reference){
            Products.splice(i, Products[i]);
          }
        }
        if(id){
          if(id === Products[i].id){
            Products.splice(i, Products[i]);
          }
        }
      }
    }
    
    
    
    const addItemInArray = async (response) => {
      
      let custo = Number(quantidade) * response.data[0].Value;
      
      let base = {
        'id': response.data[0].id,
        'reference': response.data[0].reference,
        'name': response.data[0].name,
        'quantidade': quantidade,
        'value': `R$${custo}`,
        'sum': custo
      }
      
      setProducts(arr => [...Products, base]);
      
    }
   
    
    
    const consult = async (reference, id) => {
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
  
      setValor(`R$${response.data[0].Value}`);
      setName(response.data[0].name);
      setReference(response.data[0].reference);
  
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
        
        setValor(`R$${response.data[0].Value}`);
        setName(response.data[0].name);
        setReference(response.data[0].reference);
        
    }
    
    const save = () => {
    
    }

    const clear = () => {
      setProducts([]);
    }
  
    useEffect(() => {
      const sum = async () => {
        const sumall = Products.map(item => item.sum).reduce((prev, curr) => prev + curr, 0);
        setValorTotal(sumall);
        return;
      }
      
      sum();
    }, [Products]);
    
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
                        <input placeholder='nome' value={name} />
                        <input placeholder='quantidade' type='number' value={quantidade} onChange={e => {setQuantidade(e.target.value); console.log(quantidade)}}/>
                        <input placeholder='valor' value={valor} disabled/>
                        <button type='submit'>Adicionar</button>
                    </form>
  
                  <button className='consult' type='button' onClick={() => {consult(reference, id)}} >Consultar</button>
                </div>
            </div>
  
          <div className='dd' >
            <div className='box'>
              <ProductsPosGrid rows={Products}/>
              <table style={{marginTop: '18px'}}>
                <th>
                  <p style={{fontSize: '20px'}}>Valor Total:</p>
                </th>
                <th>
                  <p></p>
                </th>
                <td>
                  <p style={{fontSize: '20px'}}>R${valorTotal}</p>
                </td>
              </table>
              <input disabled className='put' placeholder={'id'} value={rItem} onChange={e => setRItem(e.target.value)}/>
              <input disabled className='put' style={{marginTop: '5px'}} placeholder={'Referencia'} value={arItem} onChange={e => setARItem(e.target.value)}  />
              <button disabled className='consult' onClick={() => removeItem(rItem, arItem)}>Apagar Item</button>
              
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '18px',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button style={{backgroundColor: "#945ee8", borderColor: "#945ee8"}} onClick={() => saveORC()}>Salvar</Button>
                  <Button style={{backgroundColor: "#945ee8", borderColor: "#945ee8"}} onClick={() => clear()}>Apagar</Button>
                  <Button style={{backgroundColor: "#945ee8"}}>Imprimir</Button>
                </ButtonGroup>
              </Box>
            </div>
          </div>
          
        </div>
    );
}