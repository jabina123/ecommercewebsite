const initialState = {
    sellerOrders: [],
    loading: false,
    error: null,
  };
  
  const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SELLER_ORDERS_REQUEST":
        return { ...state, loading: true };
      case "SELLER_ORDERS_SUCCESS":
        return { ...state, loading: false, sellerOrders: action.payload };
      case "SELLER_ORDERS_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default sellerReducer;
  