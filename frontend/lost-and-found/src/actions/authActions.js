// authActions.js
import axios from 'axios';

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const signupSuccess = (user) => ({
    type: 'SIGNUP_SUCCESS',
    payload: user,
  });
  
  export const signupFailure = (error) => ({
    type: 'SIGNUP_FAILURE',
    payload: error,
  });

// export const login = (credentials) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post('/api/auth/login', credentials);
//       dispatch(loginSuccess(response.data));
//     } catch (error) {
//       dispatch(loginFailure(error.response ? error.response.data.message : 'An error occurred'));
//     }
//   };
// };

export const logout = () => ({
    type: 'LOGOUT',
  });
  
  
//   export const logoutUser = () => {
//     return async (dispatch) => {
//       // Perform any necessary API calls to log the user out on the server (if needed).
  
//       // Dispatch the logout action
//       dispatch(logout());
//     };
//   };

  export const storeAccessToken = (accessToken) => ({
    type: 'STORE_ACCESS_TOKEN',
    payload: accessToken,
  });

  export const signup = (userData) => {
    return async (dispatch) => {
      try {
        // Replace these values with your Auth0 configuration
        const clientId = '0UOtlCkeRywKyHbavmcbu6iihiUnwVYI';
        const connection = 'Username-Password-Authentication';
        const domain = 'dev-3vtey6tugvrs4132.us.auth0.com';
  
        const auth0Config = {
          client_id: clientId,
          connection: connection,
          domain: domain,
          // Include other Auth0-specific parameters if needed
        };
  
        const response = await axios.post(`https://${domain}/dbconnections/signup`, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: auth0Config, // Pass Auth0 configuration as query parameters
        });
  
        if (!response.data || !response.data.access_token) {
          throw new Error('Signup failed');
        }
  
        const accessToken = response.data.access_token;
  
        // Dispatch signup success action
        dispatch(signupSuccess(response.data));
  
        return accessToken;
      } catch (error) {
        // Dispatch signup failure action
        dispatch(signupFailure(error.response ? error.response.data.message : 'Signup error'));
        throw error;
      }
    };
  };