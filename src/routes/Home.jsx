import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'
import React from 'react'

const Home = () => {

  const [processos, setProcessos] = useState([]);

  const getProcessos = async () => {
    try {
      
      const response = await axios.get("Url aqui");
      const data = response.data;
    } catch (error) {
      
      console.log(data);
      
      setProcessos(processos);
    }
  }
  return (
    <div>
        <h2>Últimos Processos Judiciais</h2>
        {processos.length === 0 ? (<p>Carregando...</p>) :
        (processos.map((processos) => 
          <div className='processo' key={processos.id}>
            <h2>{processos.tema}</h2>
          </div>
        )) } 
      </div>
  )
}

export default Home