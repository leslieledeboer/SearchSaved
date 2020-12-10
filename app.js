var authCode = window.location.search.match('code=(.*)')[1];

let authData = {
	grant_type: 'authorization_code',
	code: authCode,
	redirect_uri: 'https://leslieledeboer.github.io/SearchSaved'
}

fetch ('https://www.reddit.com/api/v1/access_token', {
	method: 'POST',
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(authData)
})
.then(response => response.json())
.then(data => {
	console.log(data.access_token);
})
.catch((error) => {
	console.error('Error:', error);
})