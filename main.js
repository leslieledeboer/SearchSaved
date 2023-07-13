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
  document.getElementById("message").innerHTML = "loading saved content ...";

  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();

  let markup = ``;

  const container = document.getElementById("content_container");

  for (let i = 0; i < allPosts.length; i++) {
    markup += `<a class="content_title" href="https://www.reddit.com/${allPosts[i].permalink}">${allPosts[i].title}</a>
    <div class="content_author">${allPosts[i].author.name}</div>`;
  }

  container.insertAdjacentHTML('afterbegin', markup);

  document.getElementById("message").innerHTML = "total number of saved items: " + allPosts.length;
}

async function searchPosts(user) {
  let searchValue = await document.getElementById('search').value.toLowerCase();

  document.getElementById("message").innerHTML = "searching for saved content like \"" + searchValue + "\" ...";

  let posts = await user.getSavedContent();
  let allPosts = await posts.fetchAll();

  let hits = [];

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].subreddit_name_prefixed.toLowerCase().includes(searchValue) === true) {
      hits.push(i);
    }

    if (allPosts[i].title !== undefined) {
      if (allPosts[i].title.toLowerCase().includes(searchValue) === true) {
        if (hits.includes(i) === false) {
          hits.push(i);
        }
      }
    }
  }

  let markup = ``;

  for (let j = 0; j < hits.length; j++) {
    let num = hits[j];
    markup += `<a class="content_title" href="https://www.reddit.com/${allPosts[num].permalink}">${allPosts[num].title}</a>
    <div class="content_author">${allPosts[num].author.name}</div>`;
  }

  let container = document.getElementById("content_container");

  container.innerHTML = markup;

  document.getElementById("message").innerHTML = "number of posts found: " + hits.length;
}

main().catch(console.error);