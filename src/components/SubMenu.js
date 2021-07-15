import React from 'react'
import './SubMenu.style.css'
import {useSelector } from 'react-redux'
import Grops from './Groups'
const SubMenu = () => {
 const isSubMenuOpen = useSelector((state)=>state.gallery.subMenuActive)
 
 return (
  <div className={`${isSubMenuOpen?'submenu_container active':'submenu_container'}`}>
  {
   isSubMenuOpen && <Grops/>
  }
  </div>
 )
}

export default SubMenu
