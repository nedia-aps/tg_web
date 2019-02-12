import axios from "axios";
import { config } from "./config";

const baseURL = config.ROOT_URL;

export class AjaxService {
  static getSetting() {
    axios.defaults.baseURL = baseURL;
    // axios.defaults.headers.post["Content-Type"] =
    //   "application/x-www-form-urlencoded";
    axios.defaults.timeout = 1000;
  }

  static getParse(data) {
    return JSON.parse(data);
  }

  static getdata(api) {
    try {
      const me = this;
      // return axios.get('https://rallycoding.herokuapp.com/api/music_albums', {
      return axios.get(api, {
        transformResponse: [
          function (data) {
            return me.getParse(data);
          }
        ]
      });
    } catch (ex) {
      return ex;
    }
  }

  static get(api, params) {
    try {
      const me = this;
      axios.defaults.withCredentials = true;
      return axios.get(baseURL + api, params, {
        transformResponse: [
          function (data) {
            return me.getParse(data);
          }
        ]
      });
    } catch (ex) {
      return ex;
    }
  }

  static post(api, params) {
    try {
      const me = this;
      // axios.defaults.withCredentials = true;
      return axios.post(baseURL + api, params, {
        transformResponse: [
          function (data) {
            return me.getParse(data);
          }
        ]
      });
    } catch (ex) {
      return ex;
    }
  }

  static postContent(api, params, type) {
    try {
      axios.defaults.withCredentials = false;
      return axios
        .post(baseURL + api, params, { "Content-Type": type }, { dataType: "json" })
        .catch(ex => ex);
    } catch (ex) {
      return ex;
    }
  }

  static put(api, params) {
    try {
      const me = this;
      axios.defaults.withCredentials = true;
      return axios.put(baseURL + api, params, {
        transformResponse: [
          function (data) {
            return me.getParse(data);
          }
        ]
      });
    } catch (ex) {
      return ex;
    }
  }

  static delete(api, params) {
    try {
      const me = this;
      axios.defaults.withCredentials = true;
      return axios.delete(baseURL + api, params, {
        transformResponse: [
          function (data) {
            return me.getParse(data);
          }
        ]
      });
    } catch (ex) {
      return ex;
    }
  }

  static getRemoteImage({ url }) {
    try {
      return axios({
        method: "get",
        url: baseURL + url,
        responseType: "stream"
      });
    } catch (ex) {
      return ex;
    }
  }
}
