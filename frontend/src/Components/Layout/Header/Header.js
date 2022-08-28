import React, { useState } from 'react'
import './Header.css'
import Logo from '../../../images/logo.jpg'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="border-4 flex  ">
      <div className="w-full">
        <Link to="/">
          <img src={Logo} alt="asas" className="h-18 w-14" />
        </Link>
      </div>
      <div className=" border-2 w-full flex justify-around items-center ">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/product">
          <div>Product</div>
        </Link>
        <Link to="/about">
          <div>About</div>
        </Link>
        <Link to="/contact">
          <div>Contact</div>
        </Link>
      </div>
      <div className="border-2 flex items-center justify-around w-full ">
        <Link to="/contact">
          <div>Login</div>
        </Link>
   <Link to="/contact">
          <div>Search</div>
        </Link>
           <Link to="/contact">
          <div>Cart</div>
        </Link>
      </div>
    </div>
  )
}
