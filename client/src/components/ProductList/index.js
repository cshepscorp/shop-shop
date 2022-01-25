import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import spinner from '../../assets/spinner.gif';


function ProductList() {

  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

// Again, we immediately execute the useStoreContext() function to retrieve the current global state object and the dipatch() method to update state.
// when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that data is not undefined anymore and runs the dispatch() function, setting our data to the global state!
useEffect(() => {
  if(data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products,
    });
  }
  // destructure the currentCategory data out of the state object so we can use it in the filterProducts() function.
}, [data, dispatch]);

  //const products = data?.products || [];

function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
