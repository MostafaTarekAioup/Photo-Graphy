import React , {useState , useEffect} from 'react'
import './Header.style.css'
import { AiOutlineCamera , AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun , FaBars} from "react-icons/fa";
import {gallerySliceActions} from '../redux-setup/gallerySlice'
import {useDispatch} from 'react-redux'

const getStorageTheme = () => {
  let theme = 'dark-theme'
  if(localStorage.getItem('theme')){
    theme = localStorage.getItem('theme')
  }
  return theme 
}

const Header = () => {
  const [theme , setTheme] = useState(getStorageTheme())
  const [isThemeChanded , setIsThemeChanded] = useState(false)
  const dispatch = useDispatch()
  const [searchValue , setSearchValue] = useState('') 

  const onSubmitHandller = (e)=>{
  e.preventDefault()
  if(searchValue !== ''){
      dispatch(gallerySliceActions.setSearchValue({value:searchValue}))
  }
  // 
}
const toggleTheme = ()=>{
  if(theme === 'dark-theme'){
    setTheme('light-theme')
    setIsThemeChanded(!isThemeChanded)
  }
  if(theme === 'light-theme'){
    setTheme('dark-theme')
    setIsThemeChanded(!isThemeChanded)
  }
}
useEffect(()=>{
  document.documentElement.className = theme
  localStorage.setItem('theme' , theme)
},[theme])


 return<nav>
  <div className="logo_pages_container">
   <div className="logo_container">
     <p className='logo'>Photo <span className='logo_icon'><AiOutlineCamera /></span> Graphy</p>
   </div>
  </div>
 <div className="search_container">
  <form onSubmit={onSubmitHandller}>
    <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type="text" id='search_input' className='search_input' required />
    <label htmlFor="search_input" className='search_icon'><AiOutlineSearch/></label>
  </form>
  <div onClick={()=> toggleTheme()} className="toggle_theme">
    {isThemeChanded && <FaMoon className='theme_icon moon_icon'/>}
    {!isThemeChanded && <FaSun className='theme_icon sun_icon'/>}
    {/* <FaSun className='theme_icon moon_icon'/> */}
  </div>
 </div>
 
 <div className="subMenu" onClick={()=> dispatch(gallerySliceActions.isSubMenuActive())}>
    <FaBars className='search_icon'/>
 </div>

  {/* //end */}
 </nav>
}

export default Header
