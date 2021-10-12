import {configureStore} from '@reduxjs/toolkit'
import gallerySlice from './gallerySlice'
import collectionSlice from './collectionsSlice'
import componentSlice from './imageComponentSlice'


const store = configureStore({
 reducer:{
  gallery:gallerySlice.reducer,
  collections:collectionSlice.reducer,
  imageComponent:componentSlice.reducer
 }
})


export default store
