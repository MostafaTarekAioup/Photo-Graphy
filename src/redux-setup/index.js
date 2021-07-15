import {configureStore} from '@reduxjs/toolkit'
import gallerySlice from './gallerySlice'
import collectionSlice from './collectionsSlice'


const store = configureStore({
 reducer:{
  gallery:gallerySlice.reducer,
  collections:collectionSlice.reducer
 }
})


export default store
