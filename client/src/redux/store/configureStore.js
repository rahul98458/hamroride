import { configureStore, Tuple} from "@reduxjs/toolkit";
import counterSlice from "../reducerSlices/counterSlice";
import logger from "redux-logger";


const store = configureStore({
    reducer:{
        counter : counterSlice,
    },
    middleware: () => new Tuple(logger),
})

export default store