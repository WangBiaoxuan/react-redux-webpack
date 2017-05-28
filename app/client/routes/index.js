/**
 * External dependencies
 */
import React from 'react';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory, createMemoryHistory, applyRouterMiddleware } from 'react-router';

/**
 * Internal dependencies
 */
import { injectors } from '../store/reducers';
import { isLogin, goToLogin, getUserInfo } from '../utils/user';
import demoRoute from './pages/demo';
import bdOrgRoute from './pages/bdorg';

export const getClientHistory = (store) =>
  syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router,
  });

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(createMemoryHistory(url), store, {
    selectLocationState: (state) => state.router,
  });

export const loadModule = (cb, componentModule) => {
  cb(null, componentModule.default);
};

export const requireAuth = (props) => {
  const params = props || {};
  const { path, extra } = params;

  return (nextState, replace, callback) => {
    if (!isLogin()) {
      goToLogin(path);
      setTimeout(() => {
        callback();
      }, 1000);
    } else {
      if (extra) {
        extra(nextState, replace, callback);
      } else {
        if (path) {
          replace(path);
          callback();
        } else {
          callback();
        }
      }
    }
  };
};

export const requireIdentity = (nextState, replace, callback) => {
  getUserInfo((data) => {
    if (data && data.info && data.info.member_type) {
      callback();
    } else {
      replace('/register');
      callback();
    }
  });
};

const rootRoute = function (store) {
  const { injectReducer } = injectors(store);

  return {
    getComponent(nextState, cb) {
      require.ensure([
        '../containers/Layout',
        '../containers/Layout/reducer',
      ], (require) => {
        const component = require('../containers/Layout');
        const reducer = require('../containers/Layout/reducer').default;

        injectReducer('layout', reducer);
        loadModule(cb, component);
      });
    },

    childRoutes: [
      demoRoute(loadModule, injectReducer),
      bdOrgRoute(loadModule, injectReducer),

      {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          loadModule(cb, require('../containers/NotFound'));
        });
      },
    }],
  };
};

function scrollBehavior() {
  return useScroll((prevRouterProps, { routes }) => {
    if (routes.some(route => route.ignoreScrollBehavior)) {
      return false;
    }

    if (routes.some(route => route.scrollToTop)) {
      return [0, 0];
    }

    return true;
  });
}

export const getRoutes = (history, store) => (
  <Router history={history} routes={rootRoute(store)}
    render={applyRouterMiddleware(scrollBehavior())} />
);
