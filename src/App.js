import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [api, setApi] = useState([]);
  const [initialValue, setInitialValue] = useState('');

  const myData = async () => {
    const result = await fetch(
      'http://jsonplaceholder.typicode.com/photos?_start=0&_limit=10'
    );

    const finalResult = await result.json();
    setApi(finalResult);
  };

  const onChangeHandler = (e) => {
    setInitialValue(e.target.value);
  };

  useEffect(() => {
    myData();
  }, []);

  return (
    <>
      <form>
        <input
          type='text'
          onChange={onChangeHandler}
          value={initialValue}
          placeholder='Search...'
        />
      </form>
      <div className='mainContent'>
        {api
          .filter((ele) => {
            return ele.title.toLowerCase().includes(initialValue.toLowerCase());
          })
          .map((item) => (
            <div key={item.id} className='imageWrapper'>
              <img src={item.url} alt='pic' />
              <h2>{item.title}</h2>
            </div>
          ))}
      </div>
    </>
  );
}
