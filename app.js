var authCode = window.location.search.match('code=(.*)')[1];

fetch ('https://www.reddit.com/api/v1/access_token', {
	method: 'POST',
	headers: {
		"Content-Type": "application/text",
	}
	body: grant_type=authCode&code=CODE&redirect_uri='https://leslieledeboer.github.io/SearchSaved',
})
.then(response => response.json())
.then(data => {
	console.log(data.access_token);
})
.catch((error) => {
	console.error('Error:', error);
})