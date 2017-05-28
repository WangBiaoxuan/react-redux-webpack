import { fromJS } from 'immutable';

/**
 * Internal dependencies
 */
import * as types from './constants';
const initialState = fromJS({
  orgInfo: {
    loading: true,
    listData: false,
    error: {},
    page: 1,
    totalCount: {},
    totalPages: {},
    hasMore: true,
  },
});

function BdOrgReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BDORG_INFO:
      return state
        .setIn(['orgInfo', 'loading'], !action.data)
        .setIn(['orgInfo', 'page'], action.page)
        .setIn(['orgInfo', 'hasMore'],
        action.data && action.data.page && action.data.totalPages ?
        !(action.data.page >= action.data.totalPages) : true)
        .setIn(['orgInfo', 'listData'], action.data);
    default:
      return state;
  }
}

export default BdOrgReducer;
