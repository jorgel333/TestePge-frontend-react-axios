import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'
import React from 'react'

const Home = () => {

  const [processos, setProcessos] = useState([]);

  const getProcessos = async () => {
    try {
      const response = await blogFetch.get(
        "/ProcessosJudiciais");
      
        const data = response.data;
      
        setProcessos(data);

    } catch (error) {
      
      console.log(error);
      
    }
  };

  useEffect(() =>{
    getProcessos();
  }, []);

  return (
    <div className='home'>
        <h1>Últimos Processos Judiciais</h1>
        {processos.length === 0 ? <p>Carregando...</p> : (
          processos.map((processo)=> (
            <div className='processo' key={processo.numeroProcesso}>
              <h2>{processo.tema}</h2>
              <p>{processo.descricao}</p>
              <Link to = {`/processodetail/${processo.numeroProcesso}`} className='btn'>
                Mais detalhes
              </Link>
            </div>
          ))
        )} 
      </div>
      
  );
};

export default Home