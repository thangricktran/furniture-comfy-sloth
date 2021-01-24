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
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      // console.log(maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
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
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      switch (sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((a, b) => {return a.price - b.price});
          break;
        case "price-highest":
          tempProducts = tempProducts.sort((a, b) => {return b.price - a.price});
          break;
        case "name-a":
          tempProducts = tempProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case "name-z":
          tempProducts = tempProducts.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        default: break;
      }
      return {
        ...state,
        filtered_products: tempProducts,
      };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempFilteredProducts = [...all_products];

      if (text) {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          // return product.name.toLowerCase().startsWith(text);
          // return product.name.toLowerCase().includes(text.toLowerCase());
          return (product.name.toLowerCase().match(
                                new RegExp(text.toLowerCase(),"g")));          
        });
      }
      if (category !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      // price filter
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) => product.price <= price);

      if (shipping) {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.shipping === true);
      }
      return {
        ...state,
        filtered_products: tempFilteredProducts,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },      
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
