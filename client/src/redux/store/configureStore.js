import { configureStore, Tuple} from "@reduxjs/toolkit";
//import counterSlice from "../reducerSlices/counterSlice";
import logger from "redux-logger";
import userSlice from "../reducerSlices/userSlice";


const store = configureStore({
    reducer:{
    user : userSlice,
    },
    middleware: () => new Tuple(logger),
})

export default store