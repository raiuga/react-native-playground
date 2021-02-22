import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_BAR,
  CLEAR_LIKED_BARS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedBars || [];
    case CLEAR_LIKED_BARS:
      return [];
    case LIKE_BAR:
      return _.uniqBy([action.payload, ...state], 'id');
    default:
      return state;
  }
}
