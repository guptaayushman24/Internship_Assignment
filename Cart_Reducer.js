import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(item => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({...action.payload,quantity:1});
            }
            state.totalPrice = state.cart.reduce((total, item) => total + item.quantity * item.price, 0);
        
        },
    
        removeFromCart:(state,action)=>{
            const removeFromCart = state.cart.filter((item)=>item.id!==action.payload.id);
            state.cart = removeFromCart;
        },
        updatePrice: (state, action) => {
            const { itemCount, selectedProduct } = action.payload;
          
            // Find the product in the cart by its ID
            const productIndex = state.cart.findIndex((item) => item.id === selectedProduct.id);
          
            if (productIndex !== -1) { // Product found
              // Update quantity and price in the cart
              state.cart[productIndex].quantity = itemCount;
              state.cart[productIndex].price = itemCount * selectedProduct.price;
          
              // Recalculate total price based on updated cart
              state.totalPrice = state.cart.reduce((total, item) => total + item.quantity * item.price, 0);
            } else {
              // Handle case where product might not be in the cart yet (optional)
              console.warn("Product not found in cart");
            }
          },

        incrementQuantity:(state,action)=>{
            const itemInCart = state.cart.find((item)=>item.id==action.payload.id);
            itemInCart.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const itemInCart = state.cart.find((item)=>item.id==action.payload.id);
            if (itemInCart.quantity==1){
            const removeFromCart = state.cart.filter((item)=>item.id!==action.payload.id);
            state.cart = removeFromCart;
            }
            else{
                itemInCart.quantity--;
            }
        }
    }

});
export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,updatePrice} = cartSlice.actions;
export default cartSlice.reducer;