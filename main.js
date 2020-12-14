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

  await showPosts(user).catch(console.error);

  document.getElementById('submit').onclick = () => { searchPosts(user).catch(console.error); };
}

async function showPosts(user) {
  console.log("welcome to show posts");

  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();

  let markup = ``;

  const container = document.getElementById("post_container");

  for (let i = 0; i < allPosts.length; i++) {
    markup += `<a class="post" href="https://www.reddit.com/${allPosts[i].permalink}">${allPosts[i].title}</a>
    <div class="author">${allPosts[i].author.name}</div><br><br>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);
}

async function searchPosts(user) {
  console.log("welcome to search posts");

  let searchValue = await document.getElementById('search').value.toLowerCase();

  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();

  console.log(allPosts[0]);
  console.log(allPosts[1]);

  let hits = [];

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].subreddit_name_prefixed.toLowerCase().includes(searchValue) === true) {
      hits.push(i);
    }
  }

  console.log(hits);

  let markup = ``;

  for (let j = 0; j < hits.length; j++) {
    let num = hits[j];
    markup += `<a class="post" href="https://www.reddit.com/${allPosts[num].permalink}">${allPosts[num].title}</a>
    <div class="author">${allPosts[num].author.name}</div><br><br>`;
  }

  document.getElementById("post_container").innerHTML(markup);

  console.log("done!");
}

main().catch(console.error);