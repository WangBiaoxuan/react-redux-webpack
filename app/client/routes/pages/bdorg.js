export default function aboutRoute(loadModule, injectReducer) {
  return {
    path: '/',
    name: 'bdorg',
    getComponent(nextState, cb) {
      require.ensure([
        '../../containers/BdOrg',
        '../../containers/BdOrg/reducer',
      ], (require) => {
        const component = require('../../containers/BdOrg');
        const reducer = require('../../containers/BdOrg/reducer').default;

        injectReducer('bdorg', reducer);
        loadModule(cb, component);
      });
    },
  };
}
