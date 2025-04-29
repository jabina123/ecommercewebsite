// In your login action (e.g., userActions.js)
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    // Store the user info in localStorage for persistence
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};
