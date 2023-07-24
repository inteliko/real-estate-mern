import React, { useEffect, useState } from 'react';
import classes from './popularProperty.module.css';
import { Link } from 'react-router-dom';
import mordernflat from '../assests/flat.jpg';
import apartmenthouse from '../assests/apartment.jpg';
import usahouse from '../assests/house.jpg';
import FeaturedProperties from '../featuredProperties/FeaturedProperties';
import { request } from '../../Util/fetchAPI';


const PopularProperties = () => {
  const [flatProperties, setflatProperties] = useState(0)
  const [apartmentProperties, setapartmentProperties] = useState(0)
  const [houseProperties, sethouseProperties] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         setflatProperties(data.flat)
         setapartmentProperties(data.apartment)
         sethouseProperties(data.house)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
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
            <img src={mordernflat} />
            <div className={classes.quantity}>{flatProperties} properties</div>
            <h5>Flat properties</h5>
          </Link>
          <Link to={`/properties?type=apartment&continent=1&priceRange=1`} className={classes.property}>
            <img src={apartmenthouse} />
            <div className={classes.quantity}>{apartmentProperties} properties</div>
            <h5>Apartment properties</h5>
          </Link>
          <Link to={`/properties?type=house&continent=2&priceRange=1`} className={classes.property}>
            <img src={usahouse} />
            <div className={classes.quantity}>{houseProperties} properties</div>
            <h5>House properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties