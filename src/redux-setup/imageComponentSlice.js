import {createSlice} from '@reduxjs/toolkit'

    const imageComponentInitialState = {
        isOpen:false,
        isLoading:true,
        imageData:[],
        favoritsImages:[],
        photoId:''

    }

    const imageComponentSlice = createSlice({
        name:'imageComponent',
        initialState:imageComponentInitialState,
        reducers:{
            openCopmonent(state , action){
                state.isOpen = true
                state.photoId = action.payload.idValue
            },
            closeCopmonent(state){
                state.isOpen = false
            },
            fetchImageData(state , action){
                state.imageData = action.payload.data
            },
            isLoading(state , action){
                state.isLoading = action.payload.value
            }
        }
    })

    export const imageComponentSliceActions = imageComponentSlice.actions
    export default imageComponentSlice