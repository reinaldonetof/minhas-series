import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState('INFO');
  const [genres, setGenres] = useState([]);
  const [defaultGenre, setDefaultGenre] = useState(0);

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })

    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [match.params.id])

  useEffect(() => {
    let nameGnr = []
    let indGnr = []
    genres.map(gnr => {
      nameGnr.push(gnr.name)
      indGnr.push(gnr.id)
      return null
    })
    let index = indGnr[nameGnr.indexOf(form.genre)]
    setDefaultGenre(index)
  }, [genres, form.genre])



  // custom Header
  const masterHeader = {
    height: '50vh', // 50% do view port
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status:value
    })
  }

  const save = () => {
    axios.put('/api/series/' + match.params.id, form)
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/series/' />
  }



  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white' >{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'ASSISTIDO' && <Badge color='success' >Assistido</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning' >Para assistir</Badge>}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container' >
          <h1>Editar série</h1>
          <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
          <pre>{JSON.stringify(form)}</pre>
          <div className='form-group'>
            <label htmlFor='name' >Nome</label>
            <input value={form.name} type='text' className='form-control' id='name'
              placeholder='Nome da Série' onChange={onChange('name')} />
          </div>
          <div className='form-group'>
            <label htmlFor='name' >Comentários</label>
            <input value={form.comments} type='text' className='form-control' id='name'
              placeholder='Infos' onChange={onChange('comments')} />
          </div>
          <div className='form-group'>
            <label htmlFor='name' >Gêneros</label>
            <select className='form-control' defaultValue={defaultGenre} value={genres.id} onChange={onChange('genre_id')} >
              {genres.map(genre =>
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              )}
            </select>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='status' id='assistido' 
              value='ASSISTIDO' onClick={seleciona('ASSISTIDO')}
              checked={(form.status === 'ASSISTIDO') ? true : false} onChange={()=>{}} />
            <label className='form-check-label' htmlFor='assistido'>Assistido</label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='status' id='paraAssistir'
              value='PARA_ASSISTIR' onClick={seleciona('PARA_ASSISTIR')}
              checked={(form.status === 'PARA_ASSISTIR') ? true : false} onChange={()=>{}} />
            <label className='form-check-label' htmlFor='paraAssistir'>Para assistir</label>
          </div>
          <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
        </div>
      }
    </div>
  )
}

export default InfoSerie