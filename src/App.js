import './App.css';
import useAuthState from './hooks/useAuthState';
import Todos from './pages/Todo';
import Auth from './pages/Auth'

function App() {
  const { user } = useAuthState();

  return (
    <div className="App">
      {
        user ? <Todos /> : <Auth />
      }
    </div>
  );
}

export default App;
