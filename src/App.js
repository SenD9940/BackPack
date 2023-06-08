import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Company from './pages/Company';
import Customer from './pages/Customer';
import Register from './pages/Register';
import FindAuthData from './pages/FindAuthData';
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <div id='wrapper'>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/Customer' element={<Customer />}></Route>
            <Route path='/Login' element={<Login/>}></Route>
            <Route path='/Company' element={<Company />}></Route>
            <Route path='/Login/Register' element={<Register />} ></Route>
            <Route path='/Login/FindID' element={<FindAuthData willFind={"아이디"} />} ></Route>
            <Route path='/Login/FindPW' element={<FindAuthData willFind={"비밀번호"}/>} ></Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;