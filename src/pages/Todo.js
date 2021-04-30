import { useEffect, useState } from 'react';
import { FcTodoList } from 'react-icons/fc'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'
import { supabase } from '../supabaseClient';

const Todos = () => {
  const [count] = useState(0);
  const [todos, setTodos] = useState([]);

  const selectTodos = async () => {
    let { data } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });
    setTodos(data)
  }

  useEffect(() => {
    selectTodos();
  }, []);

  return (
    <div className="Todo-card">
      <nav>
        <button style={{ height: '2rem', pading: '0.2rem 1rem' }} className="App-button" onClick={() => {
          supabase.auth.signOut()
        }}>Logout</button>
      </nav>
      <div className="App-header">
        <h2><FcTodoList style={{ position: "relative", top: "0.5rem", paddingRight: "0.25rem" }} />Todos</h2>
        <span>{count} remaining</span>
      </div>
      <AddTodo setTodos={selectTodos} />
      <div className="List-view">
        {todos && todos.map((todoItem) => (
          <Todo key={todoItem.id} {...todoItem} setTodos={setTodos} />
        ))}
      </div>
    </div>
  );
}

export default Todos;

const AddTodo = ({ setTodos }) => {
  const [task, setTask] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    if (task === '') return;
    supabase
      .from("todos")
      .insert({ task_name: task, user_id: supabase.auth.user().id })
      .single().then(({ data, error }) => {
        console.log(data, error)
        if (!error) {
          setTodos((prevTodos) => [data, ...prevTodos]);
        }
      })
  };
  return (
    <form className="Input-container">
      <input
        className="Input-field App-border-radius"
        placeholder="Add task"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" onClick={onSubmit} className="App-button Add-button App-border-radius">
        Add <IoMdAddCircleOutline size={20} style={{ verticalAlign: "middle" }} />
      </button>
    </form>
  );
};

const Todo = ({ id, is_completed, task_name: task, setTodos }) => {
  const [todo, setTodo] = useState(task);
  const [completed, setCompleted] = useState(is_completed);

  const onEditTodo = (id) => {
    if (todo === "") return;
    supabase
      .from("todos")
      .update({ task_name: todo })
      .match({ id }).then((value, error) => {
        console.log(value, error)
      })
  };

  const onCompleteTodo = (id) => {
    supabase
      .from("todos")
      .update({ is_completed: !completed })
      .match({ id })
      .then(({ data, error }) => {
        console.log(data, error)
        if (!error) {
          setCompleted((prev) => !prev);
        }
      })
  }

  const onDeleteTodo = async () => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .match({ id })
    if (!error) {
      setTodos((prev) => {
        return prev.filter((todoItem) => {
          return todoItem.id !== id
        })
      })
    }
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
