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

  document.getElementById('submit').onclick = searchPosts(user);
}

async function showPosts(user) {
  let posts = await user.getSavedContent().fetchAll();

  console.log(user);
  console.log(posts);

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < posts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${posts[i].permalink}">${posts[i].title}</a>
    <div class="author">${posts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

async function searchPosts(user) {
  let search = await document.getElementById('search').value;

  let posts = await user.getSavedContent().fetchAll().search({query: search});

  console.log(user);
  console.log(posts);
  console.log(search);

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < posts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${posts[i].permalink}">${posts[i].title}</a>
    <div class="author">${posts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

main();