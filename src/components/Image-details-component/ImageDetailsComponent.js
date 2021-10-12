import React , {useEffect} from 'react'
import './ImageDetailsComponentstyle.css'
import axios from 'axios'
import {imageComponentSliceActions} from '../../redux-setup/imageComponentSlice'
import { useSelector , useDispatch } from 'react-redux'

const ImageDetailsComponent = () => {
    const isComponentOpen = useSelector((state)=> state.imageComponent.isOpen)
    const isLoading = useSelector((state)=> state.imageComponent.isLoading)
    const imageId = useSelector((state)=> state.imageComponent.photoId)
    const imageData = useSelector((state)=> state.imageComponent.imageData)
    const dispatch = useDispatch()

    //fetch image data from API
    const fetchImageData =  ()=>{
        dispatch(imageComponentSliceActions.isLoading({value:true}))
         axios({
            method:'GET',
            url:`https://api.unsplash.com/photos/${imageId}/?client_id=TN6hCq_n0CVsLH-r42QjT1j17EfoZDZAkjShVpl631c`,
        }).then((response)=>{
            console.log(response.data)
            dispatch(imageComponentSliceActions.fetchImageData({data:response.data}))
            dispatch(imageComponentSliceActions.isLoading({value:false}))
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if (imageId!== ''){
            dispatch(imageComponentSliceActions.fetchImageData({data:[]}))
            fetchImageData()
            console.log(imageData)
        }
    },[imageId])
    return (
        <div className={`${isComponentOpen ? 'image_component image_component_active':'image_component'}`}>
            <button className='close_btn' onClick={()=> dispatch(imageComponentSliceActions.closeCopmonent())}>
                X
            </button>
            <div className="photo_details">
               {isLoading && <p className='gallery_loading'>Loading...</p>}
               {!isLoading && <div className='component_image'>
                   <img src = {imageData.urls.regular} alt='.'/>
                   <div className='download_container'>
                       
                       <a href={imageData.urls.raw} rel="noopener noreferrer" target="_blank"  download={imageId} title={`Image ${imageId}`}>
                            <button>Download</button>
                        </a>
                   </div>
               </div>}
            </div>
        </div>
    )
}

export default ImageDetailsComponent