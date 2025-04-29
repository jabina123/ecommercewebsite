const initialState = {
    isLoggedIn: false, // Initial state, false if the user is not logged in
    userData: null,     // You can add other details you need
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          userData: action.payload,  // Save user data when logged in
        };
      case 'USER_LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          userData: null,  // Clear user data when logged out
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  