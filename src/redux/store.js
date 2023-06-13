import { configureStore } from "@reduxjs/toolkit";
import scoreSlice from "./scoreSlice";



const store = configureStore({
    reducer: {
        scoreSlice
    }
})


export default store