import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../data/storeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const [menu,setMenu] = useState("menu");
  const {getTotalCartAmount,token,setToken} = useContext(storeContext);
const logout = () =>{
  localStorage.removeItem("token");
  setToken("")
  navigate("/");

}
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
        {!token?  <button onClick={()=>setShowLogin(true)}>Sign in</button> 
        :
        <div className='navbar-profile'>
             < AccountCircleIcon className='profile'  />
             <ul className="nav-profile-dropdown">
              <li><ShoppingBagOutlinedIcon className='bag-icon' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><LogoutOutlinedIcon className='logout-icon' /><p>Logout</p></li>
              <hr />
             </ul>

          </div>
        }
       
        
      </div>
    </div>
  )
}

export default Navbar
