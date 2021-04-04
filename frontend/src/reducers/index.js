import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
// import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";
import eventReducer from "./calendar.reducer";

// import productReducer from "./product.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth : authReducer,
  user : userReducer,
  event : eventReducer,
  category : categoryReducer//Gives state according to switch case
  // And that switch case is defined by the constant we get from action
  // product : productReducer,
  // order : orderReducer
})

export default rootReducer;

// export default (state : {name : "Raj"} , action ) => {
//   return state;
// }