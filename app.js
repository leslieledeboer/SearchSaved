window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

var authenticationUrl = snoowrap.getAuthUrl({
  clientId: 'anDof_QS7pjDyw',
  scope: ['identity', 'history'],
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
  clientId: 'anDof_QS7pjDyw',
  redirectUri: 'https://leslieledeboer.github.io/SearchSaved/'
}).then(r => {
  // Now we have a requester that can access reddit through the user's account
  r.getMe().getSavedContent().then(console.log);
}).catch((error) => {
  console.error('Error:', error);
});
}