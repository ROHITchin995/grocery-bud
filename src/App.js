import { useState, useEffect } from 'react';
import './App.css';
import { List } from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }
  const removeItem = (id)=>{
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item)=> item.id !== id))
  }
  const editItem = (id)=>{
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditId(id);
    setName(specificItem.title)
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div>
          <input type="text" value={name} placeholder="e.g. Vegetables" onChange={(e) => setName(e.target.value)} />
          <button type="submit">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      <div>
        {list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} editItem={editItem}/>
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
