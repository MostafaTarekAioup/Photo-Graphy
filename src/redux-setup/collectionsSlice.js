import { createSlice } from "@reduxjs/toolkit";

const collectionInitialState = {
 data:[],
 page:1,
 per_page:5,
}

const collectionSlice = createSlice({
 name:'collections',
 initialState:collectionInitialState,
 reducers:{
  fetchData(state,action){
   state.data=[...state.data , ...action.payload.data]
  },
  nextPage(state){
   state.page +=1
  }
 }
})

export const collectionSliceActions = collectionSlice.actions

export default collectionSlice