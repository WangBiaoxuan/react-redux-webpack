import { fromJS } from 'immutable';

/**
 * Internal dependencies
 */
import * as types from './constants';
const initialState = fromJS({
  bdOrg: {
    loading: true,
    listData: [],
    error: {},
  },
});

function BdOrgReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BDORG_INFO:
      return state
        .set('loading', false)
        .set('listData', action.data);
    default:
      return state;
  }
}

export default BdOrgReducer;
