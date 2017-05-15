import { fromJS } from 'immutable';

/**
 * Internal dependencies
 */
import * as types from './constants';
const initialState = fromJS({
  bdOrg: {
    loading: true,
    data: false,
    error: false,
  },
});

function BdOrgReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BDORG_INFO:
      return state
        .setIn(['bdOrg', 'loading'], true);
    default:
      return state;
  }
}

export default BdOrgReducer;
