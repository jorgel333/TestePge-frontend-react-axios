import React from 'react'
import blogFetch from '../axios/config';
import { useState } from 'react';

import './ClientesAdvogados.css'


const ClientesAdvogados = () => {
    
    const [nomeAdvogado, setNomeAdvogado] = useState()
    const [cpfAdvogado, setCpfAdvogado] = useState()
    const [oab, setOab] = useState()
    const [cpfCliente, setCpfCliente] = useState()
    const [nomeCliente, setNomeCliente] = useState()
    
    

    const createPostAdvogado = async (e) => {
        e.preventDefault();
      
    var post = {nomeAdvogado, cpfAdvogado, oab};
  
    console.log(post)
        await blogFetch.post("/Advogados/cadastrar-advogado", post
        );
    };

    const createPostCliente = async (e) => {
        e.preventDefault();
      
    var post = {nomeCliente, cpfCliente};
  
    console.log(post)
        await blogFetch.post("/Clientes/cadastrar-cliente", post
        );
    };

  return (
    <div className='novo-processo'>
  <h2>Clientes e Advogados</h2>
  <div className="form-container">
    <form onSubmit={(e) => createPostAdvogado(e)} className="form">
      <h3>Cadastrar Advogado</h3>
      <div className="form-control">
        <label htmlFor="nome">Nome</label>
        <input 
          type="text" 
          name="nomeA"
          placeholder='Digite o nome do advogado'
          onChange={(e) => setNomeAdvogado(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="cpf">CPF</label>
        <input 
          type="text" 
          name="cpf"
          placeholder='Digite o CPF do cliente'
          onChange={(e) => setCpfAdvogado(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="oab">OAB</label>
        <input 
          type="text" 
          name="oab"
          placeholder='Digite o número da OAB do advogado'
          onChange={(e) => setOab(e.target.value)}
        />
      </div>
      <input 
        type="submit" 
        value="Cadastrar" 
        className="btn"
      />
    </form>
    <form onSubmit={(e) => createPostCliente(e)} className="form">
      <h3>Cadastrar Cliente</h3>
      <div className="form-control">
        <label htmlFor="nome">Nome</label>
        <input 
          type="text" 
          name="nome"
          placeholder='Digite o nome do cliente'
          onChange={(e) => setNomeCliente(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="cpf">CPF</label>
        <input 
          type="text" 
          name="cpf"
          placeholder='Digite o CPF do cliente'
          onChange={(e) => setCpfCliente(e.target.value)}
        />
      </div>
      <input 
        type="submit" 
        value="Cadastrar" 
        className="btn"
      />
    </form>
  </div>
</div>

  )
}

export default ClientesAdvogados