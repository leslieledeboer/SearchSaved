async function main() {
  let requester = null;

  if (!sessionStorage.getItem("refresh")) {
  	var code = new URL(window.location.href).searchParams.get("code");

  	requester = await snoowrap.fromAuthCode({
  		code: code,
      clientId: "anDof_QS7pjDyw",
      redirectUri: "https://leslieledeboer.github.io/SearchSaved/main.html"
  	});

  	sessionStorage.setItem("refresh", requester.refreshToken);
    sessionStorage.setItem("access", requester.accessToken);
  } else {
  	requester = new snoowrap({
		  clientId: "anDof_QS7pjDyw",
		  refreshToken: sessionStorage.getItem("refresh"),
		  accessToken: sessionStorage.getItem("access")
	  });
  }

  const user = await requester.getMe();

  document.getElementById("username").innerHTML = user.name;

  await showContent(user).catch(console.error);

  document.getElementById("submit").onclick = () => { showContent(user, document.getElementById("search").value.toLowerCase()).catch(console.error); };
}

async function showContent(user, searchValue) {
  if (searchValue === undefined) {
    document.getElementById("message").innerHTML = "loading saved content ...";
  } else {
    document.getElementById("message").innerHTML = "searching for saved content like \"" + searchValue + "\" ...";
  }

  let savedItems = await user.getSavedContent().fetchAll();

  let searchMatch = false;

  let markup = ``;

  for (let i = 0; i < savedItems.length; i++) {
    searchMatch = false;
    
    if (searchValue !== undefined) {
      if (savedItems[i].subreddit.display_name.toLowerCase().includes(searchValue) === true) {
        searchMatch = true;
      } else if (savedItems[i].name.startsWith("t3") === true) {
        if (savedItems[i].title.toLowerCase().includes(searchValue) === true) {
          searchMatch = true;
        }
      } else {
        if (savedItems[i].body.toLowerCase().includes(searchValue) === true) {
          searchMatch = true;
        }
      }
    }

    if (searchValue === undefined || searchMatch === true) {
      if (savedItems[i].name.startsWith("t3") === true) {
        markup += `<p>Submission from u/${savedItems[i].author.name}<br><a href="https://www.reddit.com/${savedItems[i].permalink}">${savedItems[i].title}</a></p>`;
      } else {
        markup += `<p>Comment from u/${savedItems[i].author.name}<br><a href="https://www.reddit.com/${savedItems[i].permalink}">${savedItems[i].body.substring(0, 100)}</a></p>`;
      }
    }
  }

  document.getElementById("content_container").innerHTML = markup;

  if (searchValue === undefined) {
    document.getElementById("message").innerHTML = "number of saved items: " + savedItems.length;
  } else {
    document.getElementById("message").innerHTML = "number of items found: " + savedItems.length;
  }
}

main().catch(console.error);