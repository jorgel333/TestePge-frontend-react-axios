import React from 'react'
import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Advogados() {

    const [advogados, setAdvogados] = useState([]);

    const getAdvogados = async () => {
      try {
        const response = await blogFetch.get(
          "/Advogados");
        
          const data = response.data;
        
          setAdvogados(data);
        console.log(data)
      } catch (error) {
        
        console.log(error);
        
      }
    };
  
    useEffect(() =>{
      getAdvogados();
    }, []);

  return (
    <div className='home'>
    <h1>Advogados Cadastrados</h1>
    {advogados.length === 0 ? <p>Carregando...</p> : (
      <table>
        <thead>
          <tr>
            <th>Nome do Advogado</th>
            <th>Mais Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {advogados.map((advogado) => (
            <tr key={advogado.id}>
              <td>{advogado.nome}</td>
              <td>
                <Link to = {`/advogadodetail/${advogado.id}`} className='btn'>
                  Mais detalhes
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default Advogados