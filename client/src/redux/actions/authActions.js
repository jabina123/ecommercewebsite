export const loginUser = (userData) => {
    return {
      type: "USER_LOGIN",
      payload: userData,  // This should contain user info like name, email, role, etc.
    };
  };
  
  export const logoutUser = () => {
    return {
      type: "USER_LOGOUT",
    };
  };
  