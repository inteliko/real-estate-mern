import React from 'react'
import classes from './propertyDetail.module.css'
import {useSelector} from 'react-redux'
import { useState } from 'react'

import { useRef } from 'react'
import { useEffect } from 'react'
import {request} from '../../Util/fetchAPI'
import { useParams } from 'react-router-dom';




const PropertyDetail = () => {
  const {user} = useSelector((state) => state.auth)
  const [propertyDetail, setPropertyDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const {id} = useParams()
  const fromRef = useRef()


  useEffect(() => {
    const fetchDeatils = async() => {
      try{
        const data = await request(`/property/find/${id}`, 'GET')
        setPropertyDetail(data)

        console.log(data)
      } catch (error) {
        console.error(error)
      }

      
    } 
    fetchDeatils()
  }, [id])

 

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner = async(e) => {
    e.preventDefault();
  }




  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetail.images}`} alt="" />
        </div>

        <div className={classes.right}>
          <h3 className={classes.title} >
              Title: {`${propertyDetail.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail.type}`}</span>
              </div>
              <div>Continent: <span>{`${propertyDetail.continent}`}</span>
              </div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price} ><span> Price $ </span> {`${propertyDetail.price}`} </span>
              <span style={{display: 'flex', alignItems:'center', gap:'12px' }} ></span>
              Owner <img src={`http://localhost:5000/images/${propertyDetail.currentOwner.profileImg}`} alt="" />
            </div>
            <div className={classes.moreDetails}>
              <span  ></span>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default PropertyDetail