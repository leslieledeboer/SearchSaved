var authenticationUrl = snoowrap.getAuthUrl({
  clientId: 'anDof_QS7pjDyw',
  scope: ['identity', 'history'],
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html',
  permanent: true,
  state: 'jeff' // a random string, this could be validated when the user is redirected back
});
// --> 'https://www.reddit.com/api/v1/authorize?client_id=foobarbaz&response_type=code&state= ...'

document.getElementById("direct").href = authenticationUrl; // send the user to the authentication url