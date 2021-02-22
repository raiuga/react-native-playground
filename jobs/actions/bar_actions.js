import axios from 'axios';

import {
  FETCH_BARS,
  LIKE_BAR,
  CLEAR_LIKED_BARS
} from './types';

import { GeoCodingApiKey } from '../config/config.json';

const BAR_SEARCH_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

const buildBarUrl = (region) => {
  const { latitude, longitude } = region;
  const searchBarUrl = `${BAR_SEARCH_ROOT_URL}location=${latitude},${longitude}&radius=10000&type=bar&key=${GeoCodingApiKey}`;
  return searchBarUrl;
};

export const fetchBars = (region, callback) => async (dispatch) => {
  try {
    const url = buildBarUrl(region);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_BARS, payload: data });
    callback();
  } catch(e) {
    console.error(e);
  }
};

export const likeBar = (bar) => {
  return {
    payload: bar,
    type: LIKE_BAR
  }
};

export const clearLikedBars = () => {
  return { type: CLEAR_LIKED_BARS };
};
