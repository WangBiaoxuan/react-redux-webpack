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
    page: {},
    totalCount: {},
    totalPages: {},
  },
});

function BdOrgReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BDORG_INFO:
      return state
        .set('loading', false)
        .set('page', action.data && action.data.page  ? action.data.page : 1)
        .set('totalCount', action.data && action.data.totalCount  ? action.data.totalCount : 0)
        .set('totalPages', action.data && action.data.totalPages ? action.data.totalPages : 0)
        .setIn(['listData', action.page], action.data);
    default:
      return state;
  }
}

export default BdOrgReducer;
