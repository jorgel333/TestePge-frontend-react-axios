import blogFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import React from 'react';

function ProcessoDetalhes() {

    const [processo, setProcesso] = useState([]);
    const {numeroProcesso} = useParams();
    const getProcesso = async () => {
    try {
      console.log(numeroProcesso)
      const response = await blogFetch.get(
        `/ProcessosJudiciais/${numeroProcesso}`);
      
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
      <h1>Processo Judicial</h1>
      {Object.keys(processo).length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <div className='processo'>
          <h2>Tema: {processo.tema}</h2>
          <p>Número do Processo: {processo.numeroProcesso}</p>
          <p>Descrição: {processo.descricao}</p>
          <p>Valor da Causa: {processo.valorCausa}</p>
          <p>Advogado Responsável: {processo.advogadoResponsavel}</p>
          <p>Parte: {processo.parte}</p>
          <div>
            <strong>Documentos:</strong>
            <ul>
              {Array.isArray(processo.documentos) ? (
                processo.documentos.map((documento, index) => (
                  <li key={index}>{documento}</li>
                ))
              ) : (
                <li>Nenhum documento disponível</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProcessoDetalhes