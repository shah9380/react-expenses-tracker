import React, { useEffect, useState } from 'react';
import Item from './Item';

function App() {
  const [total, setTotal] = useState(2000);
  const [remaining, setRemaining] = useState(total);
  const [spent, setSpent] = useState(0);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [array, setArray] = useState([]);
  const [deleteKey, setDeleteKey] = useState();

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('budgetArray'));
    if (storedArray) {
      setArray(storedArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetArray', JSON.stringify(array));
  }, [array]);

  const fetchDetails = () => {
    if (cost <= remaining) {
      setRemaining((prev) => prev - cost);
      setSpent((prev) => prev + parseInt(cost));
      setArray((current) => [...current, { deleteKey, name, cost }]);
    }
  };

  const getKey = (key) => {
    console.log(key, "me");
    setArray((prevArray) => prevArray.filter((_, index) => index !== key));
    console.log(array[key].cost);
    setSpent((prev)=>prev-(parseInt(array[key].cost)))
    setRemaining((prev)=>prev+(parseInt(array[key].cost)))
  };
  

  return (
    <div className="App">
      <h1 className="text-3xl font-bold my-12">My Budget Planner</h1>
      <div className="flex flex-wrap gap-y-4 gap-x-4 text-lg w-full justify-evenly">
        <div className="border border-black bg-black/10 md:p-4">
          <span>Budget : </span>
          <span>Rs.{total}</span>
        </div>
        <div className="border border-green-400 bg-green-400/10 md:p-4">
          <span>Remaining : </span>
          <span>Rs.{remaining}</span>
        </div>
        <div className="border border-cyan-400 bg-cyan-400/10 md:p-4">
          <span>Spent so far : </span>
          <span>Rs.{spent}</span>
        </div>
      </div>
      <section className="my-4">
        <h2 className="text-start text-xl font-medium">Expenses</h2>
        {array.map((data, idx) => {
              data.deleteKey = idx;
              return (
                <Item key={idx} id={data.deleteKey} deleteFunc={getKey} name={data.name} cost={data.cost} />
              )
        })}
      </section>
      <section>
        <h2 className="text-start text-xl font-medium">Add Expenses</h2>
        <div className="flex w-full border">
          <div className="flex flex-col grow mx-8">
            <label className="text-start">Name</label>
            <input onChange={(event) => setName(event.target.value)} className="border border-black" type="text" />
          </div>
          <div className="flex flex-col border grow mx-8">
            <label className="text-start">Cost</label>
            <input onChange={(event) => setCost(event.target.value)} className="border border-black" type="number" />
          </div>
        </div>
        <button onClick={fetchDetails} className="border bg-blue-400 p-2 rounded-lg mr-auto active:scale-[0.97]">
          Add
        </button>
      </section>
    </div>
  );
}

export default App;
