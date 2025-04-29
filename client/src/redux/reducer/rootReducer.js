import { combineReducers } from "redux";
import sellerReducer from "./sellerReducer";

const rootReducer = combineReducers({
  seller: sellerReducer, // Adding the sellerReducer to the root reducer
});

export default rootReducer;
