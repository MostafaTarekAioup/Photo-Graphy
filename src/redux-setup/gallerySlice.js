import {createSlice} from '@reduxjs/toolkit'

const initialGalleryState = {
 data:[],
 hasMore:true,
 subMenuActive:false,
 page:1,
 per_page:30,
 currentFetchUrl:'https://api.unsplash.com/photos',
 defaultFetchUrl:'https://api.unsplash.com/photos',
 searchUrl:'https://api.unsplash.com/search/photos',
 currentCollectionName:'All Photos',
 searchQuery:'',
 hasError:false
}

const gallerySlice = createSlice({
 name:'gallery',
 initialState:initialGalleryState,
 reducers:{
  fetchData(state,action){
   state.data=[...state.data , ...action.payload.data]
  },
  isHasMore(state , action){
   state.hasMore = action.payload.type
  },
  isSubMenuActive(state){
   state.subMenuActive =!state.subMenuActive
  },
  increasePage(state){
   state.page +=1
  },
  fetchNewUrl(state , action){
   state.data = []
   state.page = 1
   if(action.payload.title === 'LGBT | LGBTIQ+'){
    state.currentCollectionName = ' شواذ خولات مقرفين'
   }else{
    state.currentCollectionName = action.payload.title
   }
   state.searchQuery = ''
   state.currentFetchUrl = action.payload.url
  },
  setDefaultUrl(state){
   state.data = []
   state.page = 1
   state.searchQuery = ''
   state.currentCollectionName = 'All photos'
   state.currentFetchUrl = state.defaultFetchUrl
  },
  setHasError(state , action){
   state.hasError = action.payload.err
  },
  setSearchValue(state , action){
   state.data = []
   state.page = 1
   state.currentFetchUrl = state.searchUrl
   state.currentCollectionName = action.payload.value
   state.searchQuery = action.payload.value
  }
 }
})

export const gallerySliceActions = gallerySlice.actions
export default gallerySlice