async function main() {
  let requester = null;

  if (!sessionStorage.getItem("refresh")) {
  	var code = new URL(window.location.href).searchParams.get('code');

  	requester = await snoowrap.fromAuthCode({
  		code: code,
        clientId: 'anDof_QS7pjDyw',
        redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
  	});

  	sessionStorage.setItem("refresh", requester.refreshToken);
    sessionStorage.setItem("access", requester.accessToken);
  }

  else {
  	requester = new snoowrap({
		clientId: 'anDof_QS7pjDyw',
		refreshToken: sessionStorage.getItem("refresh"),
		accessToken: sessionStorage.getItem("access")
	});
  }

  let user = requester.getMe().fetch();
  let listing = requester.getMe().getSavedContent().fetch();

  document.getElementById("username").innerHTML = user.name;
  document.getElementById("title").innerHTML = listing[0].title;
  document.getElementById("link").innerHTML = listing[0].permalink;
  document.getElementById("author").innerHTML = listing[0].author.name;
}

main();

// var code = new URL(window.location.href).searchParams.get('code');

// if (!sessionStorage.getItem("refresh")) {
//   snoowrap.fromAuthCode({
//   code: code,
//   clientId: 'anDof_QS7pjDyw',
//   redirectUri: 'https://leslieledeboer.github.io/SearchSaved/main.html'
// }).then(r => {
//   sessionStorage.setItem("refresh", r.refreshToken);
//   sessionStorage.setItem("access", r.accessToken);

//   r.getMe().then(user => {
//   	document.getElementById("username").innerHTML = user.name;
//   })

//   r.getMe().getSavedContent().then(listing => {
//   	document.getElementById("title").innerHTML = listing[0].title;
//   	document.getElementById("link").innerHTML = listing[0].permalink;
//   	document.getElementById("author").innerHTML = listing[0].author.name;
//   });
// }).catch((error) => {
//   console.error('Error:', error);
// });
// }

// else {
// 	var snoo = new snoowrap({
// 		clientId: 'anDof_QS7pjDyw',
// 		refreshToken: sessionStorage.getItem("refresh"),
// 		accessToken: sessionStorage.getItem("access")
// 	});

// 	snoo.getMe().getSavedContent().then(listing => {
//   	    document.getElementById("title").innerHTML = listing[0].title;
//   	    document.getElementById("link").innerHTML = listing[0].permalink;
//   	    document.getElementById("author").innerHTML = listing[0].author.name;
// 	});
// }