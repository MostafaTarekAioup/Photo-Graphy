import React, { useEffect } from "react"
import "./ImageDetailsComponentstyle.css"
import axios from "axios"
import { imageComponentSliceActions } from "../../redux-setup/imageComponentSlice"
import { useSelector, useDispatch } from "react-redux"

const ImageDetailsComponent = () => {
  const isComponentOpen = useSelector((state) => state.imageComponent.isOpen)
  const isLoading = useSelector((state) => state.imageComponent.isLoading)
  const imageId = useSelector((state) => state.imageComponent.photoId)
  const imageData = useSelector((state) => state.imageComponent.imageData)
  const apiAccessKey = `?client_id=b8bf507eb41946edb729b42140589bee5682c6bee8b04498bf2686b6aaddd610`
  const dispatch = useDispatch()

  //fetch image data from API

  const fetchImageData = () => {
    dispatch(imageComponentSliceActions.isLoading({ value: true }))
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos/${imageId}/${apiAccessKey}`,
    })
      .then((response) => {
        // console.log(response.data)
        dispatch(
          imageComponentSliceActions.fetchImageData({ data: response.data })
        )
        dispatch(imageComponentSliceActions.isLoading({ value: false }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (imageId !== "") {
      dispatch(imageComponentSliceActions.fetchImageData({ data: [] }))
      fetchImageData()
    }
    // eslint-disable-next-line
  }, [imageId])

  const handleDownload = async () => {
    try {
      const response = await fetch(imageData.urls.raw)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `image-${imageId}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleOutsideClick = (e) => {
    // Close only if clicking the overlay area (photo_details class)
    if (e.target.className === "photo_details") {
      dispatch(imageComponentSliceActions.closeCopmonent())
    }
  }

  return (
    <div
      className={`${
        isComponentOpen
          ? "image_component image_component_active"
          : "image_component"
      }`}
    >
      <button
        className='close_btn'
        onClick={() => dispatch(imageComponentSliceActions.closeCopmonent())}
      >
        X
      </button>
      <div className='photo_details' onClick={handleOutsideClick}>
        {isLoading && <p className='gallery_loading'>Loading...</p>}
        {!isLoading && (
          <div className='component_image' onClick={(e) => e.stopPropagation()}>
            <img src={imageData.urls.regular} alt='.' />
            <div className='download_container'>
              <button onClick={handleDownload}>Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageDetailsComponent
