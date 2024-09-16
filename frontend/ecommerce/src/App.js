import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import HomeScreen from './components/screens/HomeScreen'
import SignUpScreen from './components/screens/SignUpScreen'
import LoginScreen from './components/screens/LoginScreen'
import ProductScreen from './components/screens/ProductScreen'
import CartScreen from './components/screens/CartScreen'
import TempScreen from './components/screens/TempScreen'
import Product from './components/Product'






function App() {
  return (
    <>
    <Router>
    <Header />
    <Routes>
      <Route exact path='/' element={<HomeScreen />} />
    </Routes>
    <Routes>
      <Route exact path='/login' element={<LoginScreen />} />
    </Routes>
    <Routes>
      <Route exact path='/signup' element={<SignUpScreen />} />
    </Routes>
    <Routes>
      <Route exact path='/cart' element={<CartScreen />} />
    </Routes>
    <Routes>
      <Route exact path='/products/:id' element={<ProductScreen />} />
    </Routes>
    <Routes>
      <Route exact path='/products/' element={<ProductScreen />} />
    </Routes>
    </Router>

    </>
  )
}

export default App
