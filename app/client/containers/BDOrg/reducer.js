import { fromJS } from 'immutable';

/**
 * Internal dependencies
 */
import * as types from './constants';
const initialState = fromJS({
  bdOrg: {
    loading: true,
    data: {},
    error: {},
  },
});

function BdOrgReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BDORG_INFO:
      return state
        .setIn(['bdOrg', 'loading'], false)
        .setIn(['bdOrg', 'data'], action.data);
    default:
      return state;
  }
}

export default BdOrgReducer;
