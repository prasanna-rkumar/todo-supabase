import { useState } from 'react';
import { FcTodoList } from 'react-icons/fc'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'

const Todos = () => {
  const [count] = useState(0);
  const [todos] = useState([]);

  return (
    <div className="Todo-card">
      <nav>
        <button style={{ height: '2rem', pading: '0.2rem 1rem' }} className="App-button" onClick={() => {
          
        }}>Logout</button>
      </nav>
      <div className="App-header">
        <h2><FcTodoList style={{ position: "relative", top: "0.5rem", paddingRight: "0.25rem" }} />Todos</h2>
        <span>{count} remaining</span>
      </div>
      <AddTdo />
      <div className="List-view">
        {todos && todos.map((todoItem) => (
          <Todo key={todoItem.id} {...todoItem} />
        ))}
      </div>
    </div>
  );
}

export default Todos;

const AddTdo = () => {
  const [task, setTask] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    if (task === '') return;
  };
  return (
    <form className="Input-container">
      <input className="Input-field App-border-radius" placeholder="Add task" type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="submit" onClick={onSubmit} className="App-button Add-button App-border-radius">Add <IoMdAddCircleOutline size={20} style={{ verticalAlign: "middle" }} /></button>
    </form>
  );
};

const Todo = ({ id, completed, task }) => {
  const [todo, setTodo] = useState(task);

  const onEditTodo = (id, task) => {
    
  };

  const onCompleteTodo = (id) => {
    
  }

  const onDeleteTodo = () => {
    
  };

  return <div key={id} className="List-tile App-border-radius">
    <input checked={completed} className="List-tile-leading" type="checkbox" onChange={(e) => {
      e.preventDefault();
      onCompleteTodo(id);
    }} />
    <input style={{
      width: '100%',
      height: '1.75rem',
      fontSize: '1.5rem',
      background: 'transparent',
      border: '0.02rem solid black',
      borderRadius: 8,
      paddingLeft: 8
    }} value={todo} onChange={(e) => {
      const { value } = e.target;
      setTodo(value);
    }} />
    {task !== todo && <button onClick={() => onEditTodo(id, todo)} className="Todo-update-submit">save</button>}
    <TiDeleteOutline className="List-tile-trailing" onClick={onDeleteTodo} />
  </div>;
};
