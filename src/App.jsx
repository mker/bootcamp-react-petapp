import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import catimg from '../public/catimg.jpg'
import './style.css'

const App = () => {
  const [image, setImage] = useState(null);
  // const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [noTouched, setNoTouched] = useState(false);

  const API = 'https://dog.ceo/api'

  function handleData() {
      setIsLoading(true);
      fetch(`${API}/breeds/image/random`, {
        method: 'GET',
      })
      .then(response => response.text())
      .then(response => {
        response = JSON.parse(response);
        setImage(response.message);
      })
      .catch ((error) => {
        toast.error(JSON.stringify(error));
      })
      .finally (() => {
        setIsLoading(false)
      })
  }
      
    

  useEffect(() => {
    handleData();
  }, [])

  

  return (
    <>
    <Toaster position="top-left" />
      <div className='page'>  
        <div className='content'>
          { isLoading && <p>Loading...</p> }
          { image ? <img src={image} alt='dog'/> : null }
          <p className='text'>Ты будешь моей собакой?</p>
          { noTouched ? <><p>А такой?</p></> : null }


            <div className="buttons">
              <button className='button' onClick={ () => {
                toast('Пойдем гулять!', {
                  icon: '👏',
                  className: 'toast',
                })
                setNoTouched(false);
              }}>Да</button>
              <button className='button' onClick={ () =>  
              {
                handleData();
                setNoTouched(true);
                } }>Нет</button>
            </div>
          </div>
        </div>
        </>
  )
}

export default App;
