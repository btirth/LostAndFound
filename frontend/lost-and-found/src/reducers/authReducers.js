const initialState = {
    user: null,
    accessToken: null,
    loginError: null,
    signupError: null, // New property for signup errors
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
        case 'STORE_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      };
        case 'LOGOUT':
        return {
            ...state,
            user: null,
            accessToken: null,
        };
        case 'SIGNUP_SUCCESS':
            return {
              ...state,
              user: action.payload,
              signupError: null, // Clear signup errors on success
            };
            
          case 'SIGNUP_FAILURE':
            return {
              ...state,
              user: null,
              signupError: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default authReducer;