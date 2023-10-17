import React, { useState, useEffect } from 'react';
import blogFetch from '../axios/config';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import './NewPost.css';

const NewPost = () => {
  const navigate = useNavigate();

  const [tema, setTema] = useState('');
  const [valorCausa, setValorCausa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [clienteId, setClienteId] = useState(null);
  const [advogadoId, setAdvogadoId] = useState(null);

  const [advogados, setAdvogados] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [anexos, setAnexos] = useState([]); // Estado para a coleção de arquivos anexos

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

  const createProcessData = async () => {
    const process = {
      tema,
      valorCausa,
      descricao,
      clienteId: clienteId.value,
      advogadoId: advogadoId.value,
    };

    try {
      const response = await blogFetch.post('/ProcessosJudiciais/criar-processo', process);
      const numeroProcesso = response.data.numeroProcesso; // Suponha que o servidor retorne o ID do processo
      return numeroProcesso;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const uploadFiles = async (numeroProcesso) => {
    if (!numeroProcesso || anexos.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('numeroProcesso', numeroProcesso); 

    // Anexe todos os arquivos à coleção de arquivos
    Array.from(anexos).forEach((anexo) => {
      formData.append('documentos', anexo);
    });

    try {
      await blogFetch.post('/Documentos', formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProcess = async (e) => {
    e.preventDefault();

    const numeroProcesso = await createProcessData();

    if (numeroProcesso) {
      uploadFiles(numeroProcesso); 
      navigate('/');
    }
  };

  return (
    <div className="novo-processo">
      <h2>Novo Processo</h2>
      <form onSubmit={(e) => handleCreateProcess(e)}>
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
            value={advogadoId} 
            onChange={(selectedOption) => setAdvogadoId(selectedOption)} 
            options={advogados.map((advogado) => ({
              value: advogado.id,
              label: advogado.nome,
            }))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="clienteId">Parte</label>
          <Select
            value={clienteId} 
            onChange={(selectedOption) => setClienteId(selectedOption)} 
            options={clientes.map((cliente) => ({
              value: cliente.id,
              label: cliente.nome,
            }))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="documentos">Anexar Arquivos</label>
          <input
            type="file"
            name="documentos"
            multiple 
            onChange={(e) => setAnexos(e.target.files)}
          />
        </div>
        <input type="submit" value="Criar Processo" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;