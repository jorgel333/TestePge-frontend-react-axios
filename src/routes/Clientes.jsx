import React from 'react'
import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Clientes.css';

function Clientes() {

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
      try {
        const response = await blogFetch.get(
          "/Clientes");
        
          const data = response.data;
        
          setClientes(data);
        console.log(data)
      } catch (error) {
        
        console.log(error);
        
      }
    };
  
    useEffect(() =>{
      getClientes();
    }, []);

  return (
    <div className='home'>
  <h1>Clientes Cadastrados</h1>
  {clientes.length === 0 ? <p>Carregando...</p> : (
    <table>
      <thead>
        <tr>
          <th>Nome do Cliente</th>
          <th>Mais Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.nome}</td>
            <td>
              <Link to = {`/clienteDetail/${cliente.id}`} className='btn'>
                Mais detalhes
                </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
  )
}

export default Clientes