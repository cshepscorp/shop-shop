import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

function ProductItem(item) {
  
  const { image, name, _id, price, quantity } = item;
  // use the custom useStoreContext Hook to establish a state variable and the dispatch() function to update the state
  const [state, dispatch] = useStoreContext();

  // declare cart as its own variable so that we don't have to keep writing state.cart
  const { cart } = state;
  
  const addToCart = () => {
    // find cart item with matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    
    // if match, call UPDATE with new purchase Qty
    if(itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
    }
    
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
