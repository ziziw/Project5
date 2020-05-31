

fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(user => console.log(user.results));
