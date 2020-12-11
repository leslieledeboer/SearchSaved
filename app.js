var authenticationUrl = snoowrap.getAuthUrl({
  clientId: 'anDof_QS7pjDyw',
  scope: ['identity', 'history'],
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html',
  permanent: true,
  state: 'jeff'
});

document.getElementById("redirect").href = authenticationUrl;