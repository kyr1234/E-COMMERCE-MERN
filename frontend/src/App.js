import Header from './Components/Layout/Header/Header'
import Home from './Components/Home/Home.js'
import Footer from './Components/Layout/Footer/Footer'
import Loader from './Components/Layout/Loader/Loader'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Product from './Components/ProductPage/Product'

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Product />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
