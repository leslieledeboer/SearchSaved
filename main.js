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

  const user = await requester.getMe();

  document.getElementById("username").innerHTML = user.name;

  showPosts(user);
}

async function showPosts(user) {
  let content = await user.getSavedContent().fetchAll();
  let posts = null;

  console.log(user);
  console.log(content);

  posts = content;

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < posts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${posts[i].permalink}">${posts[i].title}</a>
    <div class="author">${posts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

main();