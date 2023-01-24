import { useState, useEffect } from 'react';
import './App.css';
import { List } from './List';

const getLocalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')))
  }else{
    return []
  }
}

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));    
  }, [list])
  

  return (
    <section>
      <form>
        <h3>Grocery Bud</h3>
        <div>
          <input type="text" value={name} placeholder="e.g. Vegetables" onChange={(e)=>setName(e.target.value)}/>
          <button type="submit">
            {isEditing?'Edit':'Submit'}
          </button>
        </div>
      </form>
      <div>
        {list.length > 0 && (
          <div>
            <List items={list}/>
          <button>
          Clear Items
        </button>
        </div>
        )}
        
      </div>
    </section>
  );
}

export default App;
