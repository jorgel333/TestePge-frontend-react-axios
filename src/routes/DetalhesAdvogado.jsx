import React, { useState, useEffect } from 'react';
import blogFetch from '../axios/config';
import { useParams } from 'react-router-dom';

function DetalhesAdvogado() {
  const [advogado, setAdvogado] = useState({});
  const { id } = useParams();

  const getAdvogado = async () => {
    try {
      const response = await blogFetch.get(`/Advogados/${id}`);
      const data = response.data;
      setAdvogado(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdvogado();
  }, []);

  return (
    <div>
      <h1>Detalhes do Advogado</h1>
      <p>Nome: {advogado.nome}</p>
      <p>CPF: {advogado.cpf}</p>
      <p>OAB: {advogado.oab}</p>
      <h2>Processos</h2>
      {Array.isArray(advogado.processos) ? (
        <ul>
            {advogado.processos.map((processo, index) => (
            <li key={processo.numeroProcesso}>
                <p>Número do Processo: {processo.numeroProcesso}</p>
                <p>Tema: {processo.tema}</p>
                <p>Valor da Causa: {processo.valorCausa}</p>
                <p>Parte: {processo.nomeParte}</p> {/* Usar nomeParte aqui */}
                {index < advogado.processos.length - 1 && (
                <hr />
                )}
            </li>
            ))}
        </ul>
        ) : (
        <p>Carregando...</p>
        )}
    </div>
  );
}

export default DetalhesAdvogado;
