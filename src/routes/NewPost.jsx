import React, { useState, useEffect } from 'react';
import blogFetch from '../axios/config';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // Importe o componente Select

import './NewPost.css';

const NewPost = () => {
  const navigate = useNavigate();

  const [tema, setTema] = useState();
  const [valorCausa, setValorCausa] = useState();
  const [descricao, setDescricao] = useState();
  const [clienteId, setClienteId] = useState(); // Altere para null para lidar com pesquisa
  const [advogadoId, setAdvogadoId] = useState(); // Altere para null para lidar com pesquisa

  const [advogados, setAdvogados] = useState([]);
  const [clientes, setClientes] = useState([]);

  const fetchData = async () => {
    try {
      const advogadosResponse = await blogFetch.get('/Advogados');
      const clientesResponse = await blogFetch.get('/Clientes');

      setAdvogados(advogadosResponse.data);
      setClientes(clientesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    const post = {
      tema,
      valorCausa,
      descricao,
      clienteId: clienteId.value, // Acesse o valor selecionado
      advogadoId: advogadoId.value, // Acesse o valor selecionado
    };

    await blogFetch.post('/ProcessosJudiciais/criar-processo', post);
    navigate('/');
  };

  return (
    <div className="novo-processo">
      <h2>Novo Processo</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="tema">Tema</label>
          <input
            type="text"
            name="tema"
            placeholder="Digite o tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            name="descricao"
            id="descricao"
            placeholder="Digite a descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="valorCausa">Valor da Causa</label>
          <input
            type="number"
            step="0.01"
            name="valorCausa"
            placeholder="Digite o valor da causa"
            value={valorCausa}
            onChange={(e) => setValorCausa(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="advogadoId">Advogado</label>
          <Select
            value={advogadoId} // Use o valor selecionado
            onChange={(selectedOption) => setAdvogadoId(selectedOption)} // Atualize o estado
            options={advogados.map((advogado) => ({
              value: advogado.id,
              label: advogado.nome,
            }))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="clienteId">Parte</label>
          <Select
            value={clienteId} // Use o valor selecionado
            onChange={(selectedOption) => setClienteId(selectedOption)} // Atualize o estado
            options={clientes.map((cliente) => ({
              value: cliente.id,
              label: cliente.nome,
            }))}
          />
        </div>
        <input type="submit" value="Criar Processo" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;