

import * as types from './constants';
import { get } from '../../utils/request';

export function loadBDOrgList(page, pageSize) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_BDORG_INFO,
      page: page,
      pageSize: pageSize,
    });

    return get(`/mobi-investor/rank/org/list`, {
      page: page,
      pageSize: pageSize,
    }).then((data) => {
      dispatch(getBDOrgSuc(page, data));
    });
  };

}

export function getBDOrgSuc(page, data) {
  return {
    type: types.LOAD_BDORG_INFO,
    data,
    page,
  };
}

export function getBDOrgErr(page, err) {
  return {
    type: types.LOAD_BDORG_INFO,
    page,
    err,
  };
}
