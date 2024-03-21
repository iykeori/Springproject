import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';
import Layout from './components/Layout/Layout.jsx';
import Record from './pages/Record/Record.jsx';
import BatchRegister from './pages/BatchRegister/BatchRegister.jsx';

function App() {
  return (
    <div> 
      {/* <h1>Sales Register</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path='/record' element={<Record />} />
            <Route path='/batch-record' element={<BatchRegister />} />
          </Route>
        </Routes>
      </BrowserRouter>

    

      
    </div>
  );
}

export default App;
