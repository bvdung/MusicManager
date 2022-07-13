import logo from './logo.svg';
import './App.css';
import AddSong from './Component/AddSong';
import PlayMusic from './Component/PlayMusic';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Component/Home';
import EditMusic from './Component/EditMusic';
import LoginPage from './Component/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<LoginPage />}></Route> */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='AddSong' element={<AddSong />}></Route>
        <Route path='PlayMusic/:fileName/:id/:genre/:dateUpdate/:dateCreate/:name' element={<PlayMusic />}></Route>
        <Route path='EditMusic/:fileName/:id/:genre/:dateUpdate/:dateCreate/:name' element={<EditMusic />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
