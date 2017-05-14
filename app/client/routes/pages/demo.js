export default function aboutRoute(loadModule) {
  return {
    path: '/',
    name: 'demo',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        loadModule(cb, require('../../containers/Demo'));
      });
    },
  };
}
