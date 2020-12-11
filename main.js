var code = new URL(window.location.href).searchParams.get('code');

if (code !== null) {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
}).then(r => {
  let result = r.getMe().getSavedContent();
  console.log(result[0].title);
}).catch((error) => {
  console.error('Error:', error);
});
}