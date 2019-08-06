import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {
  const [data, setData] = useState([]);
  let idRow = 0;
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteSerie = id => {
    axios
    .delete('/api/series/' + id)
    .then(res => {
      const filtrado = data.filter(item => item.id !== id)
      setData(filtrado)
    })
  }

  const renderizaLinha = record => {
    idRow = ++idRow
    return(
      <tr key={record.id} >
        <th scope="row">{idRow}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
          <Link to={'/series/' + record.id} className='btn btn-warning' >Info</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return(
      <div className='container' >
        <h1>Séries</h1>
        <div className="alert alert-info" role="alert">
          Você não possui séries criadas.
        </div>
        <Link to={'/series/novo'} className='btn btn-primary' >Nova série</Link>
      </div>
    )
  }

  return(
    <div className='container' >
      <h1>Séries</h1>
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
      <Link to={'/series/novo'} className='btn btn-primary' >Nova série</Link>
    </div>
  )
}

export default Series