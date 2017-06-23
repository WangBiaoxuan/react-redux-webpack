export default function aboutRoute(loadModule) {
  return {
    path: '/demo',
    name: 'demo',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        loadModule(cb, require('../../containers/Demo'));
      });
    },
  };
}
