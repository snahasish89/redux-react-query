import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { getPhotos } from "../services/user.service"
import { IAlburm, IStatus } from "../types/type"

export interface GalleryState {
    image: IAlburm[],
    imageStatus: IStatus,
    currentImage: number | null,
}

const initialState: GalleryState = {
    image: [],
    imageStatus: 'idle',
    currentImage: null
}

export const getGalleryAction =createAsyncThunk(
    'galalery/getPhotos',
    async () => await getPhotos()
)

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        //Action that api call not required , go to reducer
        updateCuttentImage: (state,action: PayloadAction<number>) => {
            state.currentImage = action.payload;
        }
    },
    //Any api related work will go in extra reducer
    extraReducers: (builder) => {
        builder
        .addCase(getGalleryAction.pending, (state) => {
            state.currentImage = null;
            state.imageStatus = 'loading';
          })
          .addCase(getGalleryAction.fulfilled, (state, action) => {
            state.imageStatus = 'idle'
            state.image = action.payload;
            if(action.payload.length > 0) {
                state.currentImage = action.payload[0].id;
            }
          })
          .addCase(getGalleryAction.rejected, (state) => {
            state.imageStatus = 'failed';
            state.currentImage = null;
          })
    }
})

export const {updateCuttentImage} = gallerySlice.actions;

export const selectorImages = (state: RootState) => state.getPhotos.image;
export const selectorImgStatus = (state: RootState) => state.getPhotos.imageStatus;
export const selectorCurrentImage = (state: RootState) => {
    const cImgId = state.getPhotos.currentImage;
    if(cImgId == null) {
        return null;
    }
    const idx = state.getPhotos.image.findIndex(img => img.id === cImgId)
    if(idx === -1) return null;
    return state.getPhotos.image[idx];

    //return state.getPhotos.image.find(e => e.id === cImgId)

}

export default gallerySlice.reducer