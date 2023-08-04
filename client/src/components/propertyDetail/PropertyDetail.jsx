import React from 'react'
import classes from './propertyDetail.module.css'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const PropertyDetail = () => {
  const { user } = useSelector((state) => state.auth)
  const [propertyDetail, setPropertyDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const {id} = useParams()
  const formRef = useRef()

  


  useEffect(() => {
    const fetchPropertyDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/property/find/${id}`, {
          method: 'GET'
        });
        
        console.log(id)

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPropertyDetail(data);


      
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    } ;

    fetchPropertyDetail(); 

  }, [id]); 

  console.log(propertyDetail)



  const handleCloseForm = () => {
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner = async (e) => {
    e.preventDefault();
    
  }




  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {propertyDetail && propertyDetail.img ? (
          <div className={classes.left}>
            <img src={`http://localhost:5000/images/${propertyDetail.img}`} alt="" />
          </div>
        ) : (
          <div className={classes.left}>
            {/* Optionally, you can provide a placeholder image or an alternative message */}
            {/* <img src={placeholderImage} alt="Placeholder" /> */}
            <p>No image available</p>
          </div>
        )}
        <div className={classes.right}>
          {propertyDetail && propertyDetail.title ? (
            <h3 className={classes.title}>
              Title: {`${propertyDetail.title}`}
            </h3>
          ) : (
            <p>No title available</p>
          )}
          {/* Render other content for the right side if needed */}
        </div>
      </div>
    </div>
  );
  



}

export default PropertyDetail;
