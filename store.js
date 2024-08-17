import {configureStore} from '@reduxjs/toolkit'
import CartReducer from  './Cart_Reducer'
export default configureStore({
    reducer:{
        cart:CartReducer
    }
})