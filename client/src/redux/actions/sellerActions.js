import axios from "axios";

// Action to get seller orders
export const getSellerOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "SELLER_ORDERS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/seller/orders", config);

    dispatch({
      type: "SELLER_ORDERS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SELLER_ORDERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
