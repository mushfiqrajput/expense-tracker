import { useState,useEffect } from "react";
import './App.css'
function App() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactions , setTransaction ] = useState([])

    useEffect(()=>{
      getTransaction().then(transactions => {
          setTransaction(transactions)
      })
    },[])
  async  function getTransaction(){
      const url = import.meta.env.VITE_REACT_APP_API_URL+'/transactions'
      const response = await fetch(url)
      const data = await response.json()
      return data;
    }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_API_URL+'/transaction';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ 
        price,
        name,
        date,
        description })
    })
    .then(response => {
      response.json().then(json => {
        setPrice('')
        setName('')
        setDescription('')
        setDate('')

        console.log('result', json);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  let cash = 0 ;
  for (let i = 0 ; i < transactions.length ; i++)
    {
      cash += transactions[i].price;
    }
  return (
    <div className="main">
      <div className="amount">
        <h1>${cash}</h1>
        <div className="form">
          <form onSubmit={addNewTransaction}>
            <input
              type="number"
              placeholder='+500 or -500'
              name='price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder='Samsung 40 inch led '
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="date"
              name='date'
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <input
              type="text"
              className='desc'
              placeholder='description'
              name='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Add New Transaction</button>
           
          </form>
         {
          transactions.length > 0 && transactions.map((transaction,index) => (
            <div className='box' key={index}>
            <div className="left">
            <p className='Name'>{transaction.name}</p>
            <p className='description'>{transaction.name}</p>
            </div>
            <div className="right">
              <p className={transaction.price > 0 ? "green":"red"}>{transaction.price}</p>
              <p className='date'>{transaction.date}</p>
            </div>
          </div>
          ))
         }
         
          </div>
        </div>
      </div>
      
  
  );
}

export default App;