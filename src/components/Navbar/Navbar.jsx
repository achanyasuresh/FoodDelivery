import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../data/storeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, token, setToken } = useContext(storeContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const myOrder = () => {
        navigate("/myorders");
    };

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo1} alt="" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <Link to="/contact-us">Contact Us</Link>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <ShoppingCartIcon />
                    </Link>
                    {getTotalCartAmount() > 0 && <div className="dot"></div>}
                </div>
                {!token ? 
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                    :
                    <div className='navbar-profile'>
                        <AccountCircleIcon className='profile' />
                        <ul className="nav-profile-dropdown">
                            <li onClick={myOrder}><ShoppingBagOutlinedIcon className='bag-icon' /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><LogoutOutlinedIcon className='logout-icon' /><p>Logout</p></li>
                            <hr />
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
