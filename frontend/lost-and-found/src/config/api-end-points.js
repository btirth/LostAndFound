const { NODE_ENV } = process.env;
export const API_URL = NODE_ENV === 'production' ? 'http://172.17.0.80:8001' : 'http://localhost:8080';
// export const API_URL = '';

const API_END_POINTS = {
  USER_ADD: `${API_URL}/api/v1/user`,
 
};

export default API_END_POINTS
