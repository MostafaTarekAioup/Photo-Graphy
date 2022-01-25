import React , {useEffect , useState} from 'react'
import './Groups.style.css'
import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import {collectionSliceActions} from '../redux-setup/collectionsSlice'
import {gallerySliceActions} from '../redux-setup/gallerySlice'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun } from "react-icons/fa";
import vomit from '../images/1F92E.svg'
const Groups = () => {
  const dispatch = useDispatch()
  const page = useSelector((state)=>state.collections.page)
  const per_page = useSelector((state)=>state.collections.per_page)
  const collectionData = useSelector((state)=>state.collections.data)
  const isSubMenuActive = useSelector((state)=>state.gallery.subMenuActive)
  const apiAccessKey = `?client_id=b8bf507eb41946edb729b42140589bee5682c6bee8b04498bf2686b6aaddd610`
  const [searchValue , setSearchValue] = useState('')

  ///

    const [theme , setTheme] = useState('dark-theme')
    const [isThemeChanded , setIsThemeChanded] = useState(false)
  

  const fetchData = async()=>{
      await axios({
         method:'GET',
         url:`https://api.unsplash.com/collections/${apiAccessKey}`,
         params:{per_page:per_page , page:page}
      }).then((response)=>{
        // console.log(response.data)
         dispatch(collectionSliceActions.fetchData({data:response.data}))
      }).catch((error)=>{
         console.log(error)
      })
   }
 const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const onSubmitHandller = (e)=>{
      e.preventDefault()
      if(searchValue !== ''){
          dispatch(gallerySliceActions.setSearchValue({value:searchValue}))
          dispatch(gallerySliceActions.isSubMenuActive())
          scrollToTop()
      }
  // 
    }
useEffect(()=>{
  fetchData()
  // eslint-disable-next-line
},[page])

useEffect(()=>{
  document.documentElement.className = theme
},[theme])

const toggleTheme = ()=>{
  if(theme === 'dark-theme'){
    setTheme('light-theme')
    setIsThemeChanded(!isThemeChanded)
  }
  else{
    setTheme('dark-theme')
    setIsThemeChanded(!isThemeChanded)
  }
}

 return (
  <div>

    <div className="toggle_container">
      <button className='close_btn' onClick={()=>{dispatch(gallerySliceActions.isSubMenuActive())}}>X</button>
    </div>
     <div className="search_container_submenu">
        <form onSubmit={onSubmitHandller}>
            <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type="text" id='search' className='search_input_submenu' required />
            <button htmlFor="search" className='search_icon_btn'><AiOutlineSearch/></button>
        </form>
        <div onClick={()=> toggleTheme()} className="toggle_theme">
            {isThemeChanded && <FaMoon className='theme_icon moon_icon'/>}
            {!isThemeChanded && <FaSun className='theme_icon sun_icon'/>}
        </div>
      </div>
   <ul className='favorits_container'>
    <li onClick={()=>{dispatch(gallerySliceActions.setDefaultUrl());scrollToTop() ;if(isSubMenuActive === true){
           dispatch(gallerySliceActions.isSubMenuActive())
         }}} >
      
      <div className="img_container group_icon">
        <img src='https://cdn.pocket-lint.com/r/s/1200x/assets/images/151442-cameras-feature-stunning-photos-from-the-national-sony-world-photography-awards-2020-image1-evuxphd3mr.jpg' alt="" />
      </div>
      <div className="collection_info">

             <p onClick={()=>{dispatch(gallerySliceActions.setDefaultUrl());scrollToTop()}} className='collection_title'>All photos</p>
             <p className='collection_total_photos'></p>
           </div>
    </li>
    {/* <li>
      <div className="img_container group_icon">
        <img src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
        
      </div>
      <div className="collection_info">
             <p className='collection_title'>Favorits</p>
             <p className='collection_total_photos'>{0}</p>
      </div>
    </li> */}
   </ul>
   {/* ///////////////// */}

   <div className="gallery_header">
    <p>Collections</p>
   </div>
   <ul className='galler_container favorits_container'>
     {
       collectionData.map((collection)=>{
            const {title ,id , cover_photo , links , total_photos} = collection


        return<li
         key={id}
         onClick={()=>{dispatch(gallerySliceActions.fetchNewUrl({url:links.photos , title}));scrollToTop() ;if(isSubMenuActive === true){
           dispatch(gallerySliceActions.isSubMenuActive())
         }}}
         >
           <div  className="img_container group_icon"><img src={cover_photo.urls.small} alt={title} /></div>
           <div className="collection_info">
             <p className='collection_title'>
             {
               title
             }
             {
               title === 'LGBT | LGBTIQ+' && <p>  <img className='vomit' src={vomit} alt="." /></p>
             }
             </p>
             <p className='collection_total_photos'>{total_photos}</p>
           </div>
           {/* `${title==='LGBT | LGBTIQ+' ? 'شواذ خولات' : {title}}` */}
           </li>
       })
     }
     <li className='load_more' onClick={()=>dispatch(collectionSliceActions.nextPage())}>
       Load More
     </li>
   </ul>
  </div>
 )
}

export default Groups
