import { combineReducers, legacy_createStore } from "redux";
import * as reducer from './reducer'

const rootReducer = combineReducers({
   ...reducer
})

export const store = legacy_createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())