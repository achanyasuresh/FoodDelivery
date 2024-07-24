import React from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets'

const Menu = ({category, setCategory}) => {
  return (
    <div className='menu' id='menu'>
        <h1>Explore our Menu</h1>
        <p  className="menu-text">Choose your favouirte food from our diverse menu</p>
      <div className="menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} key={index} className='menu-list-item'>
                    <img className={category===item.menu_name?'active':""} src={item.manu_image} alt="" />
                    <p>{item.menu_name}</p>
                     </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default Menu
