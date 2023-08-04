import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { arrPriceRanges } from '../../Util/idxToPriceRange'
import { continentToIdx } from '../../Util/idxToContinent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaBed, FaSquareFull} from 'react-icons/fa'


import classes from './properties.module.css'
import person from '../assests/agent.png'

const Properties = () => {

  const [allProperties, setAllproperties] = useState([])

  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState ] = useState(null)
  const query = (useLocation().search).slice(1)
  const arrQuery = query.split("&")
  const navigate = useNavigate()



  const handlestate = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }




// fetch all properties 

useEffect(() => {
  const fetchAllProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/property/getAll', {
        method: 'GET'
      });

      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAllproperties(data);

      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };



  fetchAllProperties();
}, []);


  // parsing query params 

  useEffect(() => {
    if (arrQuery && allProperties.length > 0 && state === null) {
      let formattedQuery = {}
  
      arrQuery.forEach((option, idx) => {
        console.log(option.split("="))

    
  
        const key = option.split("=")[0]
        const value = option.split("=")[1]
  
        formattedQuery = { ...formattedQuery, [key]: value }
  
        // assign the formattedquery object to state
        if (idx === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])
  
   //hanndle search 

  const handleSearch = (param = state) => {
    let options 
    // pass the formattedoj or event, 

    if(param.nativeEvent) {
      options = state 
    } else {
      options = param
    }
  
    


    const filteredProperties = allProperties.filter((property) => {

      const priceRange = arrPriceRanges[options.priceRange]

      

      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const continent = continentToIdx(property.continent)

      
     
      if(
        property.type === options.type
        && continent === Number(options.continent)
        && property.price >= minPrice && property.price <= maxPrice
      ){
       return property
      }


    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, {replace: true})
    setFilteredProperties(filteredProperties)
  }




    



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      <div className={classes.options}>

        <select onChange={ handlestate} >

        <option disabled>Select type</option>
        <option value="flat"> Flat </option>
        <option value="apartment">Apartment</option>
        <option value="house"> House </option>
        </select> 
        <select onChange={ handlestate}>
          <option disabled>Select Price Range</option>
          <option value="0"> $0-1,000 </option>
          <option value="1">$1,000-5,000</option>
          <option value="2">$5,000-15,000</option>
          <option value="3">$15,000-50,000</option>
          <option value="4">$50,000-1,00,000</option>
          <option value="1">$1,00,000-5,00,000</option>
        </select>

        <select onChange={ handlestate }>
          <option disabled>Select Continent</option>
          <option value="0"> Washington </option>
          <option value="1">NewYork</option>
          <option value="2">Alaska</option>
          <option value="3">Maryland</option>
          <option value="4"> California </option>
          <option value="5">Delaware</option>
        </select>
        <button className={classes.searchBtn} >
        <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />
        </button>
      

        </div>

        {filteredProperties.length > 0 ? (
           <>
            <div className={classes.titles}>
              <h5>Selected Properties</h5>
              <h2>Property you may like </h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <div key={property._id} className={classes.property}>

                  <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`} >
                    <img src={`http://localhost:5000/images/${property.img}`} alt="" />
                  </Link>

                  <div className={classes.details}>
                    <div className={classes.PriceAndOwner}>
                      <span className={classes.price} > $ {property.price}</span>
                      <img src={person} className={classes.owner} alt="" />
                    </div>
                    <div className={classes.moreDetails}>
                      <span>{property.beds} <FaBed className={classes.icon} /> </span>
                      <span> {property.sqmeters} sq.meters <FaSquareFull className={classes.icon}  /> </span>
                    </div>
                    <div className={classes.desc}>
                      {property.desc}
                    </div>
                  </div>

                </div>
              ))}
            </div>
           </> 
        ): <h2 className={classes.noProperty}> We have no properties with specified options </h2> }


      </div>
    </div>
  )
}

export default Properties