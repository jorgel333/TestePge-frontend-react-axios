import React, { useState, useEffect } from 'react';
import blogFetch from '../axios/config';
import { useParams } from 'react-router-dom';

function DetalhesCliente() {
  const [cliente, setCliente] = useState({});
  const { id } = useParams();

  const getCliente = async () => {
    try {
      const response = await blogFetch.get(`/Clientes/${id}`);
      const data = response.data;
      setCliente(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCliente();
  }, []);

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <p>Nome: {cliente.nome}</p>
      <p>CPF: {cliente.cpf}</p>
      <h2>Processos</h2>
      {Array.isArray(cliente.processos) ? (
        <ul>
            {cliente.processos.map((processo, index) => (
            <li key={processo.numeroProcesso}>
                <p>Número do Processo: {processo.numeroProcesso}</p>
                <p>Tema: {processo.tema}</p>
                <p>Valor da Causa: {processo.valorCausa}</p>
                <p>Advogado: {processo.nomeAdvogado}</p>
                {index < cliente.processos.length - 1 && (
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

export default DetalhesCliente;