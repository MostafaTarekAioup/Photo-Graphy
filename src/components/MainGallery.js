import React , {useEffect} from 'react'
import './MainGallery.style.css'
import { FaFilter ,FaSortAlphaDownAlt ,FaShareSquare } from "react-icons/fa";
import axios from 'axios'
import SingleGalleryImage from './SingleGalleryImage';
import {gallerySliceActions} from '../redux-setup/gallerySlice'
import { useSelector,useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
const MainGallery = () => {
   // redux data 
   const galleryData = useSelector((state)=>state.gallery.data)
   const page = useSelector((state)=>state.gallery.page)
   const hasMore = useSelector((state)=>state.gallery.hasMore)
   const per_page = useSelector((state)=>state.gallery.per_page)
   const fetchUrl = useSelector((state)=>state.gallery.currentFetchUrl)
   const isHasError = useSelector((state)=>state.gallery.hasError)
   const search = useSelector((state)=>state.gallery.searchQuery)
   const collectionTitle = useSelector((state)=>state.gallery.currentCollectionName)
   const dispatch = useDispatch()

   // fetch data handller
   const fetchData = ()=>{
      dispatch(gallerySliceActions.setHasError({err:false}))
      dispatch(gallerySliceActions.isHasMore({type:true}))
       axios({
         method:'GET',
         url:`${fetchUrl}/?client_id=TN6hCq_n0CVsLH-r42QjT1j17EfoZDZAkjShVpl631c&query=${search}`,
         params:{per_page:per_page , page:page}
      }).then((response)=>{
         if(search === ''){
            dispatch(gallerySliceActions.fetchData({data:response.data}))
            if(response.data.length < per_page - 1){
            dispatch(gallerySliceActions.isHasMore({type:false}))
         }
         }
         if(search !== ''){
            dispatch(gallerySliceActions.fetchData({data:response.data.results}))
            if(response.data.results.length < per_page  ){
            dispatch(gallerySliceActions.isHasMore({type:false}))
         }
         }
         
         
      }).catch((error)=>{
         console.log(error)
         dispatch(gallerySliceActions.setHasError({err:true}))
      })
   }
   useEffect(()=>{
      fetchData()
   },[page , fetchUrl , search])
   const handleNextPage = ()=>{
      dispatch(gallerySliceActions.increasePage())
   }

 
 return (
  <section>
   <div className="gallery_header_container">
      <div className="section_name">
       <p>{collectionTitle}</p>
      </div>
      <div className="filter_options">
         {/* <button className='btn filter_btn'><FaSortAlphaDownAlt className='group_icon'/>Upload Date</button>
         <button className='btn filter_btn'> <FaFilter className='group_icon'/>Show everything</button>
         <button className='btn share_btn filter_btn'> <FaShareSquare className='group_icon'/>Share</button> */}
      </div> 
   </div>

   {/* /// gallery container  */}
    <InfiniteScroll
  dataLength={galleryData.length}
  next={handleNextPage}
  hasMore={hasMore}
  loader={<div className='gallery_loading'>
      {
         isHasError && <h4>Error 403</h4>
      }
      {
         !isHasError && <h4>Loading</h4>
      }
  </div>}
  endMessage={
    <p className='gallery_loading'>
       {galleryData.length===0 && <b>sorry no matching results</b>}
         { galleryData.length>0 &&   <b>You have seen it all :)</b>}
    </p>
  }>
   <div className="gallery_container">  
   {
       galleryData.map((image)=>{
          return <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true}>   
                     <SingleGalleryImage key={image.id} {...image}/> 
             </ScrollAnimation>
       })
    }
     </div>
     
</InfiniteScroll>
  </section>
 )
}

export default MainGallery
