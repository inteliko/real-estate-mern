import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Newsletter from './components/newsletter/Newsletter';
import Hero from './components/hero/Hero';
import PopularProperty from './components/popularProperty/PopularProperty';
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';
import Properties from './components/properties/Properties';
import PropertyDetail from './components/propertyDetail/PropertyDetail'; // Correct the import statement
import about from './components/about/about';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <> 
            <Navbar /> 
            <Hero />  
            <PopularProperty /> 
            <FeaturedProperties /> 
            
            <Newsletter /> 
            <Footer /> 
          </>
        } /> 

        <Route path='/Signup' element={
        
        <>
        <Navbar /> 
        <Signup />
      
          </> 
        } /> 
        <Route path='/Signin' element={
        
        <>
        <Navbar /> 
        <Signin />
        </> 
      
        }/> 
        <Route path='/properties' element={
          <>
            <Navbar /> 
            <Properties /> 
            <Footer /> 
          </>   
        } /> 
        <Route path={`/propertyDetail/:id`} element={
          <>
            <Navbar /> 
            <PropertyDetail />
            <Footer /> 
          </>
        } /> 
         
        {/* Make sure you have a component named 'about' */}
        <Route path='/about' element={
        
       
        < about />

                  

      
      } /> 
        
      </Routes>
    </div>
  );
}

export default App;
