import React from 'react'
import blogFetch from '../axios/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./NewPost.css";



const NewPost = () => {
  const navigate = useNavigate()

  const [tema, setTema] = useState()
  const [valorCausa, setValorCausa] = useState()
  const [descricao, setDescricao] = useState()
  const [clienteId, setClienteId] = useState()
  const [advogadoId, setAdvogadoId] = useState()

  const createPost = async (e) => {
      e.preventDefault();
    
  var post = {tema, valorCausa, descricao, clienteId, advogadoId};

      await blogFetch.post("/ProcessosJudiciais/criar-processo", post
      );
      navigate(`/`);

  };

  return (
    <div className='novo-processo'>
  <h2>Novo Processo</h2>
  <form onSubmit={(e) => createPost(e)}>
    <div className="form-control">
      <label htmlFor="tema">Tema</label>
      <input 
        type="text" 
        name="tema"
        placeholder='Digite o tema'
        onChange={(e) => setTema(e.target.value)}
      />
    </div>
    <div className="form-control">
      <label htmlFor="descricao">Descrição</label>
      <textarea 
        name="descricao" 
        id="descricao" 
        placeholder="Digite a descrição"
        onChange={(e) => setDescricao(e.target.value)}
      ></textarea>
    </div>
    <div className="form-control">
      <label htmlFor="valorCausa">Valor da Causa</label>
      <input 
        type="number" 
        step="0.01" 
        name="valorCausa"
        placeholder='Digite o valor da causa'
        onChange={(e) => setValorCausa(e.target.value)}
      />
    </div>
    <div className="form-control">
      <label htmlFor="advogadoId">Advogado</label>
      <input 
        type="number" 
        name="advogadoId"
        placeholder='Digite o Id do advogado'
        onChange={(e) => setAdvogadoId(e.target.value)}
      />
    </div>
    <div className="form-control">
      <label htmlFor="clienteId">Cliente</label>
      <input 
        type="number" 
        name="clienteId"
        placeholder='Digite o Id do cliente'
        onChange={(e) => setClienteId(e.target.value)}
      />
    </div>
    <input 
      type="submit" 
      value="Criar Processo" 
      className="btn"
    />
  </form>
</div>

  )
}

export default NewPost