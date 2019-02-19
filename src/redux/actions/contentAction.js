import axios from 'axios';
import { CONTENT_CHANGED } from '../types';
// const { ROOT_URL, REST_APIs } = config;

export const getCountries = ({ input }) => dispatch => {
  axios
    .get(
      `http://dev.veincer.com/umbraco/surface/ContentSurface/Countries?q=${input}`,
    )
    .then(response => {
      dispatch({
        type: CONTENT_CHANGED,
        payload: {
          prop: 'countriesList',
          value: response.data.Data.countries,
        },
      });

      dispatch({
        type: CONTENT_CHANGED,
        payload: {
          prop: 'selectedCountryId',
          value: response.data.Data.selectedcountrie.Id,
        },
      });
      dispatch({
        type: CONTENT_CHANGED,
        payload: {
          prop: 'selectedCountryName',
          value: response.data.Data.selectedcountrie.Name,
        },
      });
      return true;
    })
    .catch(error => {
      console.log(error);
    });
};
export const getCities = ({ input }) => dispatch => {
  // countryId
  axios
    .get(
      `http://dev.veincer.com/umbraco/surface/ContentSurface/Countries?q=${input}`,
    )
    .then(response => {
      dispatch({
        type: CONTENT_CHANGED,
        payload: {
          prop: 'citiesList',
          value: response.data.Data.countries,
        },
      });
      return true;
    })
    .catch(error => {
      console.log(error);
    });
};
