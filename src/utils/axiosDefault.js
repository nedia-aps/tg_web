import axios from "axios";
const configureAxiosDefaults = () => {
  /* attach token to each request header if request is other than login/register */
  axios.interceptors.request.use(
    cfg => {
      cfg.headers.Pragma = "no-cache";
      let url = cfg.url.toLowerCase();
      if (
        url.endsWith("Login") ||
        url.endsWith("register") ||
        url.endsWith("resetpassword")
      )
        return cfg;

      if (getAuthToken === null) return cfg;

      const token = getAuthToken();
      if (token === null) return cfg;

      cfg.headers.common["Authorization"] = `Bearer ${token}`;

      return cfg;
    },
    err => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.request.use(cfg => {
    cfg.data = cfg.data;
    return cfg;
  });
};

const getAuthToken = () => {
  try {
    const state = localStorage.getItem("state");
    if (state) {
      return state;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
export default configureAxiosDefaults;
