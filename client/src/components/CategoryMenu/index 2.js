import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu() {
  // Now when we use this component, we immediately call upon the useStoreContext() Hook to retrieve the current state from the global state object and the dispatch() method to update state
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  // we only need the categories array out of our global state, we simply destructure it out of state so we can use it to provide to our returning JSX
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  //const categories = categoryData?.categories || [];

  // when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that categoryData is not undefined anymore and runs the dispatch() function, setting our category data to the global state!
  // Remember how the useEffect() Hook works. It is a function that takes two arguments, a function to run given a certain condition, and then the condition
  // the useEffect() Hook runs on component load, and also when some form of state changes in that component.
  useEffect(() => {
    // if categoryData exists or has changed from useQuery response, run dispatch()

    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  // update currentCategory
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>

      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
