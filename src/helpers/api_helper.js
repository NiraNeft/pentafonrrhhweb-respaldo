import axios from "axios";
import { api } from "../config";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const config = (ContentType = 'application/json') => {
  return {
    headers: {
        'Content-Type': ContentType,
        'Accept': 'application/json',
    },
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    },
  };
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      //response = axios.get(`${url}?${queryString}`, params);
      response = axios.get(`${url}?${queryString}`, config());
    } else {
      //response = axios.get(`${url}`, params);
      response = axios.get(`${url}`, config());
    }
    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    /*let rsp = axios.post(url, data)
      .then((response) => {
        console.log("[axios.post] response: ", response);
        return response;
      })
      .catch((error) => {
        console.log("[axios.post] error: ", error);
          if( error.response ){
              console.log(error.response.data); // => the response payload 
          }
      });

      console.log("[axios.post] Nada: ", rsp);*/
    return axios.post(url, data, config());
  };
  createParms = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.post(`${url}?${queryString}`, data);
    } else {
      response = axios.post(`${url}`, data);
    }
    return response;
  };
  /**
   * createParmsFile
   */
  createParmsFile = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.post(`${url}?${queryString}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = axios.post(`${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return response;
  }
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  updateFile = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.put(`${url}?${queryString}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = axios.put(`${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return response;
  };

  /**
   * put data
   */
  put = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.put(`${url}?${queryString}`, data, config());
    } else {
      response = axios.put(`${url}`, data, config());
    }
    return response;
  };
  putFile = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.put(`${url}?${queryString}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = axios.put(`${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return response;
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    //return axios.delete(url, { ...config });
    return axios.post(url, config, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  deleteParams = (url, params) => {
    let response;
    let paramKeys = [];
    Object.keys(params).map(key => {
      paramKeys.push(key + '=' + params[key]);
      return paramKeys;
    });

    const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
    response = axios.delete(`${url}?${queryString}`);
    return response;
  };

  deleteParamsData = (url, params, data) => {
    let response;
    let paramKeys = [];
    Object.keys(params).map(key => {
      paramKeys.push(key + '=' + params[key]);
      return paramKeys;
    });

    const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
    response = axios.delete(`${url}?${queryString}`, {
      data: data
    });
    return response;
  };

  deleteFile = (url, params, data) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.post(`${url}?${queryString}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = axios.post(`${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return response;
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };