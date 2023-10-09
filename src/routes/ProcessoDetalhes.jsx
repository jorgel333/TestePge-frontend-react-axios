import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'

import React from 'react'

function ProcessoDetalhes(props) {

    const [processo, setProcesso] = useState([]);
    const id = props.match.params.id
    const getProcesso = async () => {
    try {
      const response = await blogFetch.get(
        `/ProcessosJudiciais/${id}`);
      
        const data = response.data;
      console.log(data)
        setProcesso(data);

    } catch (error) {
      
      console.log(error);
      
    }
  };

  useEffect(() =>{
    getProcesso();
  }, []);

  return (
    <div className='home'>
    <h1>Processos Judicial</h1>
    {processo.length === 0 ? <p>Carregando...</p> : (
      <div className='processos-list'>
        {processo.map((pro) => (
          <div className='processo' key={pro.numeroProcesso}>
            <h2>Tema: {pro.tema}</h2>
            <p>Número do Processo: {pro.numeroProcesso}</p>
            <p>Descrição: {pro.des}</p>
            <p>Valor da Causa: {pro.valorCausa}</p>
            <p>Advogado Responsável: {pro.advogadoResponsavel}</p>
            <p>Parte: {pro.parte}</p>
            <div>
              <strong>Documentos:</strong>
              <ul>
                {pro.documentos.map((documento, index) => (
                  <li key={index}>{documento}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  
  
  
  
  
    


  )
}

export default ProcessoDetalhes