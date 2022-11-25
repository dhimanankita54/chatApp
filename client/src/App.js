import './App.css';
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import { Chat } from './Components/Chat';
import { Login } from './Components/Login';
import { Register } from './Components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Chat />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
