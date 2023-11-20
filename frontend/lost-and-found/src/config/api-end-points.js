const { REACT_APP_ENV, NODE_ENV } = process.env;
export const API_URL = REACT_APP_ENV === 'production' || NODE_ENV === 'production' ? 'http://172.17.0.80:8001' : 'http://localhost:8080' ;

const API_END_POINTS = {
  USER_ADD: `${API_URL}/api/v1/user`,
};

export default API_END_POINTS;
// name: development
//     url: http://172.17.0.80:8001

// name: prod
// url: http://172.17.0.80:1701