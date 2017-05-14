/**
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import './style.less';
import * as actions from './actions';

class Layout extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className="layout-container">
        <Helmet
          titleTemplate="%s - 有娱投资"
          defaultTitle="有娱投资"
          meta={[
            { name: 'description', content: '有娱投资' },
          ]}
        />
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
