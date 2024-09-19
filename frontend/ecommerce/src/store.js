import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsListReducer,productDetailReducer } from './reducers/productsReducers';

const reducer = combineReducers({
    productList: productsListReducer,
    productDetails: productDetailReducer
})

const initialState = {}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))

    // Had a really hard time on this error, I (with the help of copilot) typed middleWare instead of middleware, which caused redux errors.
)

export default store