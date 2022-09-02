import React, { useState, Fragment } from 'react'
import MetaData from '../Layout/Metadata'
import './Search.css'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [keyword, setKeyword] = useState('')
  const searchSubmitHandler = (e) => {
    const navigate = useNavigate()

    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate(`/products`)
    }
  }

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}
