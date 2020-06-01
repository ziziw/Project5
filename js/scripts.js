const galleryDiv = document.querySelector('#gallery');

const generateCard = (data) => {
  const cardDiv = document.createElement('div');
  const cardImgContainer = document.createElement('div');
  const cardInfoContainer = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardName = document.createElement('h3');
  const emailText = document.createElement('p');
  const cityText = document.createElement('p');

  cardDiv.classList.add('card');
  cardImgContainer.classList.add('card-img-container');
  cardInfoContainer.classList.add('card-info-container');
  cardImg.classList.add('card-img');
  cardImg.src = '' + data.picture.large;
  cardImg.alt = 'profile picture';
  cardName.id = 'name';
  cardName.classList.add('card-name', 'cap');
  cardName.innerText = data.name.first + ' ' + data.name.last;
  emailText.classList.add('card-text');
  emailText.innerText = '' + data.email;
  cityText.classList.add('card-text', 'cap');
  cityText.innerText = data.location.city + ', ' + data.location.state;

  galleryDiv.appendChild(cardDiv);
  cardDiv.appendChild(cardImgContainer);
  cardDiv.appendChild(cardInfoContainer);
  cardImgContainer.appendChild(cardImg);
  cardInfoContainer.appendChild(cardName);
  cardInfoContainer.appendChild(emailText);
  cardInfoContainer.appendChild(cityText);

  console.log(data);
}

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(responseObj => {
    return responseObj.results;
  })
  .then(datas => datas.forEach((data) => {
    generateCard(data)
  }));


// <div class="card">
//     <div class="card-img-container">
//         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//     </div>
//     <div class="card-info-container">
//         <h3 id="name" class="card-name cap">first last</h3>
//         <p class="card-text">email</p>
//         <p class="card-text cap">city, state</p>
//     </div>
// </div>
