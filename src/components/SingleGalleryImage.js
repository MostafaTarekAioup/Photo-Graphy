import React from 'react'
import './SingleGalleryImage.style.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
const SingleGalleryImage = ({urls , likes , user}) => {
 return (
  <div className='gallery_image_container'>

    <LazyLoadImage
      alt='.'
      height={350}
      src={urls.regular} 
      effect="blur"
      placeholderSrc={urls.regular}
      // width={250} 
      />
    {/* <img src={urls.regular} alt="" /> */}
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
