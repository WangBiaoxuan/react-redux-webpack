

import * as types from './constants';
import { get } from '../../utils/request';

export function loadBDOrgList(params) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_BDORG_INFO,
    });

    return get(`/mobi-investor/rank/org/list?`, params).then((data) => {
      dispatch(getBDOrgSuc(data));
    });
  };

}

export function getBDOrgSuc(data) {
  return {
    type: types.LOAD_BDORG_INFO,
    data,
  };
}

export function getBDOrgErr(err) {
  return {
    type: types.LOAD_BDORG_INFO,
    err,
  };
}
