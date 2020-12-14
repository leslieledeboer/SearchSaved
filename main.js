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

  if (document.getElementById('submit').onclick) {
    searchPosts(user);
  }

  // document.getElementById('submit').onclick = () => { searchPosts(user).catch(console.error); }
}

async function showPosts(user) {
  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();

  console.log(user);
  console.log(allPosts);

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < allPosts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${allPosts[i].permalink}">${allPosts[i].title}</a>
    <div class="author">${allPosts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

async function searchPosts(user) {
  let searchValue = await document.getElementById('search').value;

  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();
  let searchedPosts = allPosts;

  console.log(user);
  console.log(allPosts);
  console.log(searchedPosts);

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < searchedPosts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${searchedPosts[i].permalink}">${searchedPosts[i].title}</a>
    <div class="author">${searchedPosts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

main();