import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovoGenero = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios.post('/api/genres', {
      name
    })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container' >
      <h1>Novo Genêro</h1>
      <div className='form-group'>
        <label htmlFor='name' >Nome do Genero</label>
        <input value={name} type="text" className="form-control" id="name"
          placeholder="Nome do Genêro" onChange={onChange} />
      </div>
      <button onClick={save} type='button' className="btn btn-primary">Salvar</button>
    </div>
  )
}

export default NovoGenero