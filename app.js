// var state;

// if (window.location.search == null) {
// 	state = Math.floor(Math.random()*16777215).toString(16);

// 	var url1 = "https://www.reddit.com/api/v1/authorize?client_id=dYnhP5SHz6XIeA&response_type=code&state=";
// 	var url2 = "&redirect_uri=https%3A%2F%2Fleslieledeboer.github.io%2FSearchSaved%2F&duration=permanent&scope=identity";

// 	var url = url1.concat(state.concat(url2));

// 	document.getElementById("direct").href = url;
// }

// else if (window.location.search.match('state=(.*')[0] == state) {

// }

var authenticationUrl = snoowrap.getAuthUrl({
  clientId: 'dYnhP5SHz6XIeA',
  scope: ['identity'],
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/',
  permanent: true,
  state: 'jeff' // a random string, this could be validated when the user is redirected back
});
// --> 'https://www.reddit.com/api/v1/authorize?client_id=foobarbaz&response_type=code&state= ...'

document.getElementById("direct").href = authenticationUrl; // send the user to the authentication url

// Get the `code` querystring param (assuming the user was redirected from reddit)
var code = new URL(window.location.href).searchParams.get('code');

if (code !== null) {
  snoowrap.fromAuthCode({
  code: code,
  clientId: 'dYnhP5SHz6XIeA',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/'
}).then(r => {
  // Now we have a requester that can access reddit through the user's account
  r.getMe().then(console.log);
}).catch((error) => {
  console.log(code);
  console.error('Error:', error);
});
}

// var authCode = window.location.search.match('code=(.*)')[1];

// fetch ('https://www.reddit.com/api/v1/access_token', {
// 	method: 'POST',
// 	headers: {
// 		"Content-Type": "application/x-www-form-urlencoded",
// 		"Authorization": "Basic " + btoa("dYnhP5SHz6XIeA:_hFXCuOtrCMbqiQcrWecxXeTdP77lg")
// 	},
// 	body: `grant_type=authorization_code&code=${authCode}&redirect_uri=https://leslieledeboer.github.io/SearchSaved/&client_id=dYnhP5SHz6XIeA`
// })
// .then(response => response.json())
// .then(data => {
// 	console.log(data.access_token);
// })
// .catch((error) => {
// 	console.error('Error:', error);
// })