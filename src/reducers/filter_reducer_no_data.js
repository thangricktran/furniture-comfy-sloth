import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      // for first time, sorted by "price-lowest"
      //let tProducts = [...action.payload];
      //tProducts = tProducts.sort((a, b) => a.price - b.price);
      console.log('LOAD_PRODUCTS, state.sort: ', state.sort);
      console.log('LOAD_PRODUCTS, action.payload: ', action.payload);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        //filtered_products: [...tProducts],
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case UPDATE_SORT:
      console.log('UPDATE_SORT and action.payload: \n', action.payload);
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = []
      if (sort === 'price-lowest') {
        tempProducts = filtered_products.sort((a, b) => {
          // if (a.price < b.price) {
          //   return -1
          // }
          // if (a.price > b.price) {
          //   return 1
          // }
          // return 0
          return a.price - b.price
        })
        console.log('SORT_PRODUCTS, after price-lowest sort tempProducts: \n',
                    tempProducts);

      }
      if (sort === 'price-highest') {
        tempProducts = filtered_products.sort((a, b) => {
          // if (b.price < a.price) {
          //   return -1
          // }
          // if (b.price > a.price) {
          //   return 1
          // }
          // return 0
          return b.price - a.price
        })
        console.log('SORT_PRODUCTS, after price-highest sort tempProducts: \n',
                    tempProducts);

      }
      if (sort === 'name-a') {
        tempProducts = filtered_products.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        console.log('SORT_PRODUCTS, after name-a sort tempProducts: \n',
                    tempProducts);

      }
      if (sort === 'name-z') {
        tempProducts = filtered_products.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
        console.log('SORT_PRODUCTS, after name-z sort tempProducts: \n',
                    tempProducts);

      }
      console.log('SORT_PRODUCTS, after sorting tempProducts: \n',
      tempProducts);

      return { ...state, filtered_products: tempProducts };
  

    // case SORT_PRODUCTS:
    //   const { sort, filtered_products } = state;
    //   let tempProducts = [...filtered_products];
    //   switch (sort) {
    //     case "price-lowest":
    //       tempProducts = tempProducts.sort((a, b) => {return a.price - b.price});
    //       break;
    //     case "price-highest":
    //       tempProducts = tempProducts.sort((a, b) => {return b.price - a.price});
    //       break;
    //     case "name-a":
    //       tempProducts = tempProducts.sort((a, b) => {
    //         return a.name.localeCompare(b.name);
    //       });
    //       break;
    //     case "name-z":
    //       tempProducts = tempProducts.sort((a, b) => {
    //         return b.name.localeCompare(a.name);
    //       });
    //       break;
    //     default: break;
    //   }
    //   return {
    //     ...state,
    //     filtered_products: tempProducts,
    //   };
    // case GET_SINGLE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     single_product_loading: false,
    //     single_product: action.payload,
    //   };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
