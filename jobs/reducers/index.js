import { combineReducers } from 'redux';
import auth from './auth_reducer';
import bars from './bars_reducer';
import likedBars from './likes_reducer';

export default combineReducers({
  auth,
  bars,
  likedBars
});
