var code = new URL(window.location.href).searchParams.get('code');

if (code !== null) {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
}).then(r => {
  console.log(r.refreshToken);
  console.log(r.accessToken);
  localStorage.setItem("refresh", r.refreshToken);
  localStorage.setItem("access", r.accessToken);
  r.getMe().getSavedContent().then(listing => {
  	console.log(listing[0].title);
  	console.log(listing[0].permalink);
  	console.log(listing[0].author.name);
  	console.log(listing[0]);

  	document.getElementById("title").innerHTML = listing[0].title;
  	document.getElementById("link").innerHTML = listing[0].permalink;
  	document.getElementById("author").innerHTML = listing[0].author.name;
  });
}).catch((error) => {
  console.error('Error:', error);
});
}