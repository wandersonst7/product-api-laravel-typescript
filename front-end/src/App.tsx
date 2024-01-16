import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import FormProduct from './pages/FormProduct';

// context
import { LoadingProvider } from "./context/useLoading.tsx";

function App() {

  return (
    <LoadingProvider>
      <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<FormProduct/>} />
              <Route path="/product/:id" element={<FormProduct/>} />
              <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
          </div>
          <Footer />
      </BrowserRouter>
    </LoadingProvider>
  )
}

export default App
