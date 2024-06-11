import { configureStore, Tuple} from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "../reducerSlices/userSlice";
import searchResultSlice from "../reducerSlices/searchResultSlice";

const store = configureStore({
    reducer:{
    user : userSlice,
    searchResult:searchResultSlice,
    },
    middleware: () => new Tuple(logger),
})

export default store