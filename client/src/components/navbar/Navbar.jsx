import React from 'react'
import classes from './navbar.module.css'; 
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [ showForm, setShowForm] = useState (false)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
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

    </div>

  )
}

export default Navbar