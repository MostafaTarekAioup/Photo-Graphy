import React from 'react'
import './SingleGalleryImage.style.css'
import { useDispatch } from 'react-redux'
import {imageComponentSliceActions} from '../redux-setup/imageComponentSlice'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
const SingleGalleryImage = ({urls , likes , user , id , alt_description}) => {
  const dispatch = useDispatch()
 return (
  <div className='gallery_image_container' onClick={()=> dispatch(imageComponentSliceActions.openCopmonent({idValue:id}))}>

    <img src={urls.regular} alt={alt_description} />
    <div className="owner_data">
        <div className="owner_info">
            <h3>{user.name}</h3>
            <p>Likes <span>{likes}</span></p>
        </div>
        <div className="owner_image">
          <img src={user.profile_image.medium} alt={user.name} />
        </div>
    </div>
  </div>
 )
}

export default SingleGalleryImage
