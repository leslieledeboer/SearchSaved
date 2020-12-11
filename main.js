var code = new URL(window.location.href).searchParams.get('code');

if (code !== null) {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
}).then(r => {
  r.getMe().getSavedContent().then(listing => {
  	console.log(listing[0].title);
  	console.log(listing[0].permalink);
  	console.log(listing[0].author.name);
  	console.log(listing[0]);

  	document.getElementById("title").value = listing[0].title;
  	document.getElementById("link").value = listing[0].permalink;
  	document.getElementById("author").value = listing[0].author.name;
  });
}).catch((error) => {
  console.error('Error:', error);
});
}