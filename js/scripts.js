const body = document.querySelector('body');
const galleryDiv = document.querySelector('#gallery');
const searchDiv = document.querySelector('.search-container');

const searchForm = document.createElement('form');
const searchInput = document.createElement('input');
const submitBut = document.createElement('input');

searchForm.action = '#';
searchForm.method = 'get';
searchInput.type = 'search';
searchInput.id = 'search-input';
searchInput.classList.add('search-input');
searchInput.placeholder = 'Search...';
submitBut.type = 'submit';
submitBut.value = '\u{1F50D}';
submitBut.id = 'search-submit';
submitBut.classList.add('search-submit');

searchDiv.appendChild(searchForm);
searchForm.appendChild(searchInput);
searchForm.appendChild(submitBut);

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

  cardDiv.addEventListener('click', (event) => {
    console.log(event.target);
  });
}

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(responseObj => {
    return responseObj.results;
  })
  .then(datas => datas.forEach((data) => {
    generateCard(data)
  }));





  // <div class="modal-container">
  //     <div class="modal">
  //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  //         <div class="modal-info-container">
  //             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
  //             <h3 id="name" class="modal-name cap">name</h3>
  //             <p class="modal-text">email</p>
  //             <p class="modal-text cap">city</p>
  //             <hr>
  //             <p class="modal-text">(555) 555-5555</p>
  //             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
  //             <p class="modal-text">Birthday: 10/21/2015</p>
  //         </div>
  //     </div>
  //
  //     // IMPORTANT: Below is only for exceeds tasks
  //     <div class="modal-btn-container">
  //         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  //         <button type="button" id="modal-next" class="modal-next btn">Next</button>
  //     </div>
  // </div>
