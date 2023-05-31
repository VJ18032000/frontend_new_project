import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes, Route } from "react-router-dom"  
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

function App() {
  return (
  <>
  <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="dashboard" element={ <Dashboard/> } />
      </Routes>
    </div>
  </>
  );
}

export default App;
