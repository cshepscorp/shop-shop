import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;
  //const products = data?.products || [];

  useEffect(() => {
    // see if there's data in our global state's products array
    if (products.length) {
      // if yes, use it to figure out which product is the current one that we want to display
      setCurrentProduct(products.find((product) => product._id === id)); // finding the one with the matching _id value that we grabbed from the useParams()
    } else if (data) { // what happens if we don't have any products in our global state object? Say, someone just sent you this product's URL and this is the first time you've loaded this application?
      // If that's the case, then you wouldn't have any products saved in global state just yet.
      // The useEffect() Hook is set up so that if we don't, we'll use the product data that we returned from the useQuery() Hook to set the product data to the global state object.
      // When that's complete, we run through this all over again. But this time, there is data in the products array, and then we run setCurrentProduct() to display a single product's data.
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]); // The Hook's functionality is dependent on these arguments to work and only runs when it detects that they've changed in value! This is known as the dependency array.

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
