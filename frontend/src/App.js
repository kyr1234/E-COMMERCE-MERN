import Header from './Components/Layout/Header/Header'
import Home from './Components/Home/Home.js'
import Footer from './Components/Layout/Footer/Footer'
import Loader from './Components/Layout/Loader/Loader'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ProductDetails from './Components/ProductPage/ProductDetails'
import Product from './Components/Product/Product'
import './App.css'
import Search from './Components/Search/Search'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/products" element={<Product />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
