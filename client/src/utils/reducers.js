// ipmort our actions from utils
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";
import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        // return a new object with a copy of the state argument using the spread ... operator
        ...state,
        // set the products key to a value of a new array with the action.products value spread across it
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return {
        // return a new state object with an updated categories array
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        // return a new state object with an updated categories array
        ...state,
        currentCategory: action.currentCategory,
      };
    case ADD_TO_CART:
      return {
        ...state, // include the ...state operator to preserve everything else on state
        cartOpen: true,
        cart: [...state.cart, action.product], // update the cart property to add action.product to the end of the array
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state, // include the ...state operator to preserve everything else on state
        cart: [...state.cart, ...action.products], // update the cart property to add action.products to the end of the array
      };
    case REMOVE_FROM_CART:
      // keeps the items that don't match the provided _id property
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            })
        };
    case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };
    case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };
    // if it's none of these, do not update state at all
    default:
      return state;
  }
};

// help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function
// Think of this as a more in-depth way of using the useState() Hook we've used so much.
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
