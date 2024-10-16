import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { TokenAuthContext } from '../Context/Tokencontext';
import { cartcontext } from '../Context/Cartcontext';
export default function Navbar() {
  const [navHeight, setNavHeight] = useState(0);
  const [shadow, setShadow] = useState(false); 
  const {token ,settoken} = useContext(TokenAuthContext)
  const {getallcart}=useContext(cartcontext)
  const navigator =useNavigate()
  useEffect(() => {
   
    const navbar = document.querySelector('.navcolor');
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }


    const handleScroll = () => {
      if (window.scrollY > 10) { 
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    function logout(){

      localStorage.removeItem("token");
      settoken(null)
      navigator('/')
    }  
    
    function cartHandler() {
  
}


function getCart(token) {
  navigator('/Cart')
 }
  return (
    <>
   
      <div className={`navcolor w-full fixed z-50 ${shadow ? 'shadow-md' : ''}`}>
        <div className='flex justify-between w-5/6 mx-auto py-3'>
          <div>
            <img src={Logo} className='w-10' alt="logo png" />
          </div>
          <div>
            <ul className='flex text-gray-600 p-2 items-center gap-5'>
              <li><NavLink to=''>Home</NavLink></li>
              <li><NavLink to='/About'>About</NavLink></li>
              {token &&  <li><NavLink to='/Shop'>Shop</NavLink></li>}
              <li><NavLink to='/Contact'>Contact</NavLink></li>
            </ul>
          </div>
          <div className='py-3 flex gap-4 items-center'>
            
            <ul className='flex items-center justify-center gap-4'>
<li onClick={()=>{getCart(token)}} className='cursor-pointer'> 

            <i className="fa-solid fa-cart-shopping text-gray-600" ></i>
</li>
          <li>

            <i className="fa-solid fa-circle-user text-gray-600"></i>
          </li>
          
            </ul>
            
            <ul className='flex text-gray-600 justify-center items-center gap-3'>

              {token ?    <li> <span className='cursor-pointer' onClick={logout}>  Logout</span></li>    : <> <li><NavLink to='/Login'>Login</NavLink></li> <li><NavLink to='/Register'>Register</NavLink></li> </> 
              }
             


            </ul>
          </div>

        </div>
      </div>

     
      <div style={{ paddingTop: `${navHeight}px` }}>
  
      </div>
    </>
  );
}
