import { CONTENT_CHANGED } from '../types';

const INITIAL_STATE = {
  countriesList: [],
  citiesList: [],
  countryId: '',
  stateId: '',
  cityId: '',
  selectedCountryId: '',
  selectedCountryName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTENT_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    default:
      return state;
  }
};
