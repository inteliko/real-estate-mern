import React from 'react'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'; 
import { useNavigate } from 'react-router-dom';
import classes from './hero.module.css'



const Hero = () => {
  const [type, setType] = useState("flat")
  const[continent, setContinent] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()


  const handleSearch = () => {

    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)

  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>

        <h2> Let me find your place</h2>
        <h5> Search the best options for you</h5>
      <div className={classes.options}>

        <select onChange={(e) => setType(e.target.value)} >

        <option disabled>Select type</option>
        <option value="flat"> Flat </option>
        <option value="apartment">Apartment</option>
        <option value="house"> House </option>
        </select> 
        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option disabled>Select Price Range</option>
          <option value="0"> $0-1,000 </option>
          <option value="1">$1,000-5,000</option>
          <option value="2">$5,000-15,000</option>
          <option value="3">$15,000-50,000</option>
          <option value="4">$50,000-1,00,000</option>
          <option value="1">$1,00,000-5,00,000</option>
        </select>

        <select onChange={(e) => setContinent(e.target.value)}>
          <option disabled>Select Continent</option>
          <option value="0"> Washington </option>
          <option value="1">New York</option>
          <option value="2">Alaska</option>
          <option value="3">Maryland</option>
          <option value="4"> California </option>
          <option value="5">Delaware</option>
        </select>
        <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />

      </div>

      </div>

    </div>
  )
}

export default Hero