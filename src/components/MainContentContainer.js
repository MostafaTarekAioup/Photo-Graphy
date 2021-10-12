import React from 'react'
import './MainContentContainer.style.css'
import Groups from './Groups'
import MainGallry from './MainGallery'
import {useSelector } from 'react-redux'
const MainContentContainer = () => {
  const isSubMenu = useSelector((state)=> state.gallery.subMenuActive)
 return (
  <main>
   <section className={`${isSubMenu? 'sec1 active_sec1' : 'sec1'}`}><Groups/></section>
   <section className='sec2'><MainGallry/></section>
   
  </main>
 )
}

export default MainContentContainer
