export default function aboutRoute(loadModule, injectReducer) {
  return {
    path: '/bgorg',
    name: 'bgorg',
    getComponent(nextState, cb) {
      require.ensure([
        '../../containers/BDOrg',
        '../../containers/BDOrg/reducer',
      ], (require) => {
        const component = require('../../containers/BDOrg');
        const reducer = require('../../containers/BDOrg/reducer').default;

        injectReducer('bgorg', reducer);
        loadModule(cb, component);
      });
    },
  };
}
