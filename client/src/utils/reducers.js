// ipmort our actions from utils
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../utils/actions';
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch(action.type) {
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
                categories: [...action.categories]
            };
        case UPDATE_CURRENT_CATEGORY:
            return {
                // return a new state object with an updated categories array
                ...state,
                currentCategory: action.currentCategory
             };
        // if it's none of these, do not pdate state at all
        default:
            return state;
    }
};


// help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function
// Think of this as a more in-depth way of using the useState() Hook we've used so much.
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}