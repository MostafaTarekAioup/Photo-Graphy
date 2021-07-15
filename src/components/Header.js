import React , {useState , useEffect} from 'react'
import './Header.style.css'
import { AiOutlineCamera , AiOutlineSearch } from "react-icons/ai";
import {gallerySliceActions} from '../redux-setup/gallerySlice'
import {useDispatch} from 'react-redux'
import { FaListUl  } from "react-icons/fa";



const Header = () => {
  const dispatch = useDispatch()
  const [searchValue , setSearchValue] = useState('') 

  const onSubmitHandller = (e)=>{
  e.preventDefault()
  if(searchValue !== ''){
      dispatch(gallerySliceActions.setSearchValue({value:searchValue}))
  }
  // 
}
 return<nav>
  <div className="logo_pages_container">
   <div className="logo_container">
     <p className='logo'>Photo <span className='logo_icon'><AiOutlineCamera /></span> Graphy</p>
   </div>
  </div>
 <div className="search_container">
  <form onSubmit={onSubmitHandller}>
    <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type="text" id='search' className='search_input' required />
    <label htmlFor="search" className='search_icon'><AiOutlineSearch/></label>
  </form>
 </div>
 <div className="subMenu" onClick={()=> dispatch(gallerySliceActions.isSubMenuActive())}>
    <FaListUl className='search_icon'/>
 </div>

  {/* //end */}
 </nav>
}

export default Header
