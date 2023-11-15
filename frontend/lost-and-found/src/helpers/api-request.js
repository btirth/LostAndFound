import axios from 'axios';
import _ from 'lodash';
import { toast } from "react-toastify";

class ApiRequest {
  static headers() {
    let headers = { 'Content-Type': 'application/json' };
    if (localStorage.getItem('access_token')) headers = { ...headers, Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    return headers;
  }

  static async error(message, status, silentErrorToast) {
    if (silentErrorToast) return null
    return toast.error(message)
  }

  static async fetch(options, silentErrorToast = false) {
    options.headers = _.merge(this.headers(), options.headers);

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      const errorMessages = error.response && error.response.data && error.response.data.message;
      const errorCode = error.response && error.response.status;

      this.error(errorMessages, errorCode, silentErrorToast);
      const errorRes = { errorMessages, errorCode }
      throw errorRes;
    }
  }
}

export { ApiRequest };