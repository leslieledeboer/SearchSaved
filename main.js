var code = new URL(window.location.href).searchParams.get('code');

if (code !== null) {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
}).then(r => {
  // Now we have a requester that can access reddit through the user's account
  r.getMe().getSavedContent().then(console.log);
}).catch((error) => {
  console.error('Error:', error);
});
}