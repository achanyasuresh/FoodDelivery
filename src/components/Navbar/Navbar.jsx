import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { storeContext } from '../../data/storeContext';

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("menu");
  const {getTotalCartAmount} = useContext(storeContext)
  return (
    <div className='navbar'>
      <Link to='/'>
     <img src={assets.logo1} alt="" className="logo" />
     </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        
        <SearchOutlinedIcon />
        
        <div className="navbar-search-icon">
        <Link to='/cart'>
         <ShoppingCartIcon />
         </Link>
          <div className={getTotalCartAmount()===0?":":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign in</button>
        
      </div>
    </div>
  )
}

export default Navbar
