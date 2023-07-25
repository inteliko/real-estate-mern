import React, { useEffect, useState } from 'react';
import classes from './popularProperty.module.css';
import { Link } from 'react-router-dom';
import mordernflat from '../assests/flat.jpg';
import apartmenthouse from '../assests/apartment.jpg';
import usahouse from '../assests/house.jpg';
import { request } from '../../Util/fetchAPI';


const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({})



  useEffect(() => {
    const fetchNumberProperties = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

        

         setNumProperties(data)


      } catch (error) {
        console.error(error.message)
      }
    }
    fetchNumberProperties()
  }, [])


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties?type=flat&continent=0&priceRange=1`} className={classes.property}>
            <img src={mordernflat} alt="flat" />
            <div className={classes.quantity}>{numProperties.flat} properties</div>
            <h5>Flat properties</h5>
          </Link>
          <Link to={`/properties?type=apartment&continent=1&priceRange=1`} className={classes.property}>
            <img src={apartmenthouse} alt="flat" />
            <div className={classes.quantity}>{numProperties.apartment} properties</div>
            <h5>Apartment properties</h5>
          </Link>
          <Link to={`/properties?type=house&continent=2&priceRange=1`} className={classes.property}>
            <img src={usahouse} alt="flat" />
            <div className={classes.quantity}>{numProperties.house} properties</div>
            <h5>House properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties