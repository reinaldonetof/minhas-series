import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios.post('/api/series', {
      name
    })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container' >
      <h1>Nova Série</h1>
      <div className='form-group'>
        <label htmlFor='name' >Nome da Série</label>
        <input value={name} type="text" className="form-control" id="name"
          placeholder="Nome da Série" onChange={onChange} />
      </div>
      <button onClick={save} type='button' className="btn btn-primary">Salvar</button>
    </div>
  )
}

export default NovaSerie