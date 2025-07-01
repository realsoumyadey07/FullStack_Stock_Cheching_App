import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./slices/user.js";
import fundReducer  from "./slices/fund.js";
import savedReducer from "./slices/saved.js";

export const store = configureStore({
     reducer: { 
          user: userReducer,
          fund: fundReducer,
          saved: savedReducer
     }
})