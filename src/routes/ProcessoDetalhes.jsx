import blogFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';

function ProcessoDetalhes() {
  const [processo, setProcesso] = useState([]);
  const { numeroProcesso } = useParams();

  const getProcesso = async () => {
    try {
      const response = await blogFetch.get(`/ProcessosJudiciais/${numeroProcesso}`);
      const data = response.data;
      setProcesso(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProcesso();
  }, []);

  const handleRemoveDocument = async (documentoId) => {
    try {
      // Implemente a lógica para remover o documento
      // Isso pode envolver uma solicitação ao servidor
    } catch (error) {
      console.log(`Erro ao remover documento: ${error}`);
    }
  };

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
                  <li key={index}>
                    <a
                      href={`https://localhost:7099/api/Documentos/${documento.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {documento.nomeDocumento}
                    </a>
                    <button onClick={() => handleRemoveDocument(documento.id)} className='btn'>
                      Remover
                    </button>
                  </li>
                ))
              ) : (
                <li>Nenhum documento disponível</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcessoDetalhes;