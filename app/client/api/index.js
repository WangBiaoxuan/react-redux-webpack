const API_ENV = process.env.API_ENV;

export default {
  apiBase: `//${API_ENV === 'prod' ? 'www.' : API_ENV + '.'}36kr.com/api`,
  rongHost: `//${API_ENV === 'prod' ? 'rong.' : 'rong' + API_ENV + '.'}36kr.com`,
  nrongHost: `//${API_ENV === 'prod' ? 'rong.' : 'nrong' + API_ENV + '.'}36kr.com`,
  linkmeType: `//${API_ENV === 'prod' ? 'live' : 'test'}`,
  linkmeKey: `//${API_ENV === 'prod' ? '3a89d6c23e6988e0e600d63ca3c70636' :
    '3a89d6c23e6988e0e600d63ca3c70636'}`,
  uploadToken: `//rong${API_ENV === 'prod' ? 'test07' : API_ENV}.36kr.com/api/upload/form-api`,
};
