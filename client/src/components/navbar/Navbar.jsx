import React from 'react'
import classes from './navbar.module.css'; 
import { Link,  useNavigate} from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import { logout } from '../../redux/authSlice'
import { request } from '../../Util/fetchAPI'

import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';

const Navbar = () => {
  const [state, setState] = useState({ })
  const [photo, setPhoto] = useState({ })
  const [ showForm, setShowForm] = useState (false)
  const {user, token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  } 

  const handleListProperty = async(e) => {
    e.preventDefault()

    let filename = null 
    if(photo){
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append("filename", filename)
      formData.append("image", photo)

      await request(`/upload/image`, "POST", {}, formData, true)
    } else{
      return 
    }

    try {
      const options = {
        'Authorization' : `Bearer ${token}`,
        'content-Type' : 'Application/json'
      }
      await request(`/property`, 'POST', options, {...state, img: filename} )
      handleCloseForm()

    } catch (error) {
      console.error(error)
      
    }

    
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Bangla Village <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listItem}> Home </li>
      
          <li className={classes.listItem}> Property </li>
          <li className={classes.listItem}> About </li>
          <li className={classes.listItem}> Contact </li>
        </ul>

        <div className={classes.right}> 
          {
          ! user ?
          <> 

            <Link to='/Signup'> Sign Up </Link>
            <Link to='/Signin'> Sign In </Link>

          </>
          :
          <>
          Hello, { user.username }! <span></span>
          <span onClick={handleLogout} className={classes.logoutbtn} > Logout  </span>
          <Link onClick={() => setShowForm(true)} className={classes.list}> List Your Property</Link>
          
          </>

          }
        </div>
      </div> 
      {
        showForm && (
          <div  className={classes.listPropertyForm}  onClick={handleCloseForm}>
            <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation() } >
              <h2>List Property</h2>
              <form onSubmit={handleListProperty} >
                <input type="text" placeholder='Title...' name='title' onChange={handleState} />
                <input type="text" placeholder='flat,apartment,house...' name='type' onChange={handleState} />
                <input type="text" placeholder='Rent / Sell ' name='purpose' onChange={handleState} />
                <input type="text" placeholder='Description...' name='desc' onChange={handleState} />
                <input type="number" placeholder='Contact Number' name='phone' onChange={handleState} />

                <input type="text" placeholder='Location...' name='continent' onChange={handleState} />
                <input type="number" placeholder='Price...' name='price' onChange={handleState} />
                <input type="number" placeholder='Beds...' name='beds' step={1} min={2} onChange={handleState} />

                <div style={{ display: 'flex', alignitems: 'center', gap: '12px', width:'50%' }} >
                  <label htmlFor="photo"> Property Images <AiOutlineFileImage /> </label>
                  <input 
                    type="file"
                    id="photo"
                    style={{display:'none'}}
                    onChange={(e) => setPhoto(e.target.files[0]) } />
                    {photo && <p> {photo.name} </p>}

                </div>
                <button>List Property</button>
 
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />

            </div>

          </div>
        )
      }
      


    </div>

  )
}

export default Navbar