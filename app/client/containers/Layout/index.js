/**
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

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
    const { children, userInfoData, userInfoLoading } = this.props;
    console.log('1', userInfoData);
    console.log('2', userInfoLoading);

    return (
      <div className="layout-container">
        {React.Children.toArray(children)}
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
  console.log('99', state);
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
