import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import img from '../assests/2bed.jpeg'
import person from '../assests/agent.png'
import {Link } from 'react-router-dom'
import {FaBed, FaSquareFull} from 'react-icons/fa'
import classes from './featuredProperties.module.css'

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const filteredArray = featuredProperties.filter(obj => obj.featured === true);
  


  useEffect(() => {
    const fetchFeatured = async() => {
      try{
        
        fetch('http://localhost:5000/property/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFeaturedProperties(data);
      })


      } catch (error){
        console.error(error.message)
      }

    }
    fetchFeatured()
    
  }, [])

  

 

  return (
    <div className={classes.container} >
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5> Properties you may like</h5>
          <h2> Our featured Properties</h2>
        </div>
        <div className={classes.featuredProperties}>

            {filteredArray.map((property) => (
              <div key={property._id} className={classes.featuredProperty}>
                <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}> 
                 
                  <img src={ property.img ? `http://localhost:5000/images/${property.img}` :img } alt="PropertyImage" />
                </Link>
                
                <div className={classes.details}>
                  <div className={classes.priceAndOwner} >
                  
                  {property.title}

                  </div>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}> ${property.price}</span>
                    <img src={person} alt="agent" className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                    <span>{property.beds} <FaBed className={classes.icon}/> </span>
                    <span>{property.purpose} <FaSquareFull className={classes.icon}/> </span>
                  </div>
                  <div className={classes.desc}>
                    {property.desc}

                  </div>
                

                </div>
                  


              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties