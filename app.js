var authenticationUrl = snoowrap.getAuthUrl({
  clientId: 'anDof_QS7pjDyw',
  scope: ['identity', 'history', 'read'],
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html',
  permanent: true,
  state: 'success'
});

document.getElementById("redirect").href = authenticationUrl;