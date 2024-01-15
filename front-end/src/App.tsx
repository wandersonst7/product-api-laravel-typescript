import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// páginas
import Home from './pages/Home';
import FormProduct from './pages/FormProduct';

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<FormProduct/>} />
          <Route path="/product/:id" element={<FormProduct/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
