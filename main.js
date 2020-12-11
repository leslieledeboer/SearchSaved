var code = new URL(window.location.href).searchParams.get('code');
var state = new URL(window.location.href).serachParams.get('state');

localStorage.clear();

if (code !== null && state === 'jeff') {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
}).then(r => {
  sessionStorage.setItem("refresh", r.refreshToken);
  sessionStorage.setItem("access", r.accessToken);
  r.getMe().getSavedContent().then(listing => {
  	document.getElementById("title").innerHTML = listing[0].title;
  	document.getElementById("link").innerHTML = listing[0].permalink;
  	document.getElementById("author").innerHTML = listing[0].author.name;
  	state = 'notjeff';
  });
}).catch((error) => {
  console.error('Error:', error);
});
}

else {
	var snoo = new snoowrap({
		clientId: 'anDof_QS7pjDyw',
		refreshToken: sessionStorage.getItem("refresh"),
		accessToken: sessionStorage.getItem("access")
	}).then(r => {
	  r.getMe().getSavedContent().then(listing => {
  	    document.getElementById("title").innerHTML = listing[0].title;
  	    document.getElementById("link").innerHTML = listing[0].permalink;
  	    document.getElementById("author").innerHTML = listing[0].author.name;
	});
}