import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
// import { Rating } from '@mantine/core';
export default function Layout() {
  return (
    <>



     <Navbar/>
    
    
     {/* <Rating defaultValue={2} color="cyan" size="xl" /> */}

    
    
     <Outlet/>
    
    
    
    
    
    
    
    
    
     <Footer/>

    </>
  )
}
