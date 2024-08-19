export const environment = {
  production: false,
  auth0: {
    domain: 'dev-gdc5jpwq2csxld4e.us.auth0.com',
    clientId: 'ZoK41jyKwB0OVEHSaMhTQ28pr0moHXJp',
    authorizationParams: {
      redirect_uri: 'http://localhost:4040/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:6060',
  },
};
