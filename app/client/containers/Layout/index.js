/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
/**
 * Internal dependencies
 */
import './style.less';
import * as actions from './actions';
import { isLogin } from '../../utils/user';

class Layout extends Component {
  componentDidMount() {
    const { userInfoData } = this.props;

    if (isLogin() && !userInfoData) {
      this.props.loadUserInfo();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="layout-container" >
        <div >
          {React.Children.toArray(children)}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const layout = state.layout;
  return {
    userInfoData: layout.getIn(['userInfo', 'data']),
    userInfoLoading: layout.getIn(['userInfo', 'loading']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUserInfo: () => dispatch(actions.loadUserInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
