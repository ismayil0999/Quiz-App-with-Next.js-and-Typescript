import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./slice";
export const store=configureStore({
    reducer:{
        dataSlice:dataSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
