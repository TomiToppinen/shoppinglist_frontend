import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [tasks, setTasks] = useState ([]);
  const [task, setTask] =  useState ('');

  useEffect(() => {
    axios.get(URL)
    .then((response)=> {
      console.log(response.data)
      setTasks(response.data);
    }).catch(error => {
      alert(error);
    })

  },[])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })

    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch (error => {
      alert(error.response.data.error)
    });

    }

  
    
  return (
    <><div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={task} onChange={e => setTask(e.target.value)} />
        <button>Add</button>
      </form>
    </div><div className="container">
        <ol>
          {tasks?.map(task => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ol>
      </div></>
    
  );
}

export default App;
