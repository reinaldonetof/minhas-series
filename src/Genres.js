import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Genres = () => {
  const [data, setData] = useState([]);
  let idRow = 0;
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  },[])

  const deleteGenero = id => {
    axios
    .delete('/api/genres/' + id)
    .then(res => {
      const filtrado = data.filter(item => item.id !== id)
      setData(filtrado)
    })
  }

  const renderizaLinha = record => {
    idRow = ++idRow;
    return(
      <tr key={record.id} >
        <th scope="row">{idRow}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
          <Link to={'/generos/' + record.id} className='btn btn-warning' >Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return(
      <div className='container' >
        <h1>Genêros</h1>
        <div className="alert alert-info" role="alert">
          Você não possui genêros criados
        </div>
        <Link to={'/generos/novo'} className='btn btn-primary' >Adicionar Novos Generos</Link>
      </div>
    )
  }

  return(
    <div className='container' >
      <h1>Genêros</h1>
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
      <Link to={'/generos/novo'} className='btn btn-primary' >Adicionar Novos Generos</Link>
    </div>
  )
}

export default Genres