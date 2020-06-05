const body = document.querySelector('body');
const galleryDiv = document.querySelector('#gallery');
const searchDiv = document.querySelector('.search-container');

const searchForm = document.createElement('form');
const searchInput = document.createElement('input');
const submitBut = document.createElement('input');

const cards = galleryDiv.children;

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

//generate a card, and add click event listener to show modal.
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
  cardImg.src = data.picture.large;
  cardImg.alt = 'profile picture';
  cardName.id = 'name';
  cardName.classList.add('card-name', 'cap');
  const fullName = data.name.first + ' ' + data.name.last;
  cardName.innerText = fullName;
  emailText.classList.add('card-text');
  emailText.innerText = data.email;
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
    const currentModals = document.querySelectorAll('.modal-container');

    for(let i = 0; i < cards.length; i++){
      if(cards[i].contains(event.target)){
        currentModals[i].style.display = '';
      } else {
        currentModals[i].style.display = 'none';
      }
    }
  });
}

//generate modal. add click event to close button, previous button, and next button.
const generateModal = (data) => {
  const modalContainerDiv = document.createElement('div');
  const modalDiv = document.createElement('div');
  const modalCloseBut = document.createElement('button');
  const strong = document.createElement('strong');
  const modalInfoContainer = document.createElement('div');
  const modalImg = document.createElement('img');
  const modalName = document.createElement('h3');
  const modalEmail = document.createElement('p');
  const modalCity = document.createElement('p');
  const modalHr = document.createElement('hr');
  const modalPhone = document.createElement('p');
  const modalAddress = document.createElement('p');
  const modalBirthday = document.createElement('p');

  const modalBtnContainer = document.createElement('div');
  const prevBut = document.createElement('button');
  const nextBut = document.createElement('button');

  modalContainerDiv.classList.add('modal-container');
  modalDiv.classList.add('modal');
  modalCloseBut.type = 'button';
  modalCloseBut.id = 'modal-close-btn';
  modalCloseBut.classList.add('modal-close-btn');
  strong.innerText = 'X';
  modalInfoContainer.classList.add('modal-info-container');
  modalImg.classList.add('modal-img');
  modalImg.src = data.picture.large;
  modalImg.alt = 'profile picture';
  modalName.id = 'name';
  modalName.classList.add('modal-name', 'cap');
  const fullName = data.name.first + ' ' + data.name.last;
  modalName.innerText = fullName;
  modalEmail.classList.add('modal-text');
  modalEmail.innerText = data.email;
  modalCity.classList.add('modal-text', 'cap');
  modalCity.innerText = data.location.city;
  modalPhone.classList.add('modal-text');
  modalPhone.innerText = data.phone;
  modalAddress.classList.add('modal-text');
  const streetNbr = data.location.street.number;
  const streetName = data.location.street.name;
  const city = data.location.city;
  const state = data.location.state;
  const postcode = data.location.postcode;
  modalAddress.innerText = streetNbr + ' ' + streetName + ', ' + city + ', ' + state + ' ' + postcode;
  modalBirthday.classList.add('modal-text');
  const date = new Date(data.dob.date);
  const birthday = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  modalBirthday.innerText = 'Birthday: ' + birthday;

  modalBtnContainer.classList.add('modal-btn-container');
  prevBut.type = 'button';
  prevBut.id = 'modal-prev';
  prevBut.classList.add('modal-prev', 'btn');
  prevBut.innerText = 'Prev';
  nextBut.type = 'button';
  nextBut.id = 'modal-next';
  nextBut.classList.add('modal-next', 'btn');
  nextBut.innerText = 'Next';

  body.appendChild(modalContainerDiv);
  modalContainerDiv.appendChild(modalDiv);
  modalDiv.appendChild(modalCloseBut);
  modalDiv.appendChild(modalInfoContainer);
  modalCloseBut.appendChild(strong);
  modalInfoContainer.appendChild(modalImg);
  modalInfoContainer.appendChild(modalName);
  modalInfoContainer.appendChild(modalEmail);
  modalInfoContainer.appendChild(modalCity);
  modalInfoContainer.appendChild(modalHr);
  modalInfoContainer.appendChild(modalPhone);
  modalInfoContainer.appendChild(modalAddress);
  modalInfoContainer.appendChild(modalBirthday);

  modalContainerDiv.appendChild(modalBtnContainer);
  modalBtnContainer.appendChild(prevBut);
  modalBtnContainer.appendChild(nextBut);

  modalContainerDiv.style.display = 'none';

  modalCloseBut.addEventListener('click', () => {
    modalContainerDiv.style.display = 'none';
  })

  prevBut.addEventListener('click', (event) => {
    let thisModal = event.target.parentNode.parentNode;
    let previousModal = event.target.parentNode.parentNode.previousSibling;
    const thisModalName = thisModal.children[0].children[1].children[1].innerText;
    let thisCard;

    for(let i = 0; i < cards.length; i++){
      if (cards[i].children[1].children[0].innerText === thisModalName){
        thisCard = cards[i];
      }
    }

    let previousCard = thisCard.previousSibling;
    let shownModal = thisModal;

    while (previousCard && previousCard.className === 'card' && previousCard.style.display === 'none'){
      thisCard = previousCard;
      previousCard = thisCard.previousSibling;
      thisModal = previousModal;
      previousModal = previousModal.previousSibling;
    }

    if (previousModal && previousModal.className === 'modal-container'){
      shownModal.style.display = 'none';
      previousModal.style.display = '';
    }
  })

  nextBut.addEventListener('click', (event) => {
    let thisModal = event.target.parentNode.parentNode;
    let nextModal = event.target.parentNode.parentNode.nextSibling;
    const thisModalName = thisModal.children[0].children[1].children[1].innerText;
    let thisCard;

    for(let i = 0; i < cards.length; i++){
      if (cards[i].children[1].children[0].innerText === thisModalName){
        thisCard = cards[i];
      }
    }

    let nextCard = thisCard.nextSibling;
    let shownModal = thisModal;

    while (nextCard && nextCard.className === 'card' && nextCard.style.display === 'none'){
      thisCard = nextCard;
      nextCard = thisCard.nextSibling;
      thisModal = nextModal;
      nextModal = nextModal.nextSibling;
    }

    if (nextModal && nextModal.className === 'modal-container'){
      shownModal.style.display = 'none';
      nextModal.style.display = '';
    }
  })
}


//search function
const searchFunction = () => {
    const userInput = searchInput.value.toUpperCase();

    for (let i = 0; i < cards.length; i++){
      const card = cards[i];
      const name = card.lastChild.firstChild.innerText;
      if (name.toUpperCase().indexOf(userInput) > -1){
        cards[i].style.display = '';
      } else {
        cards[i].style.display = 'none';
      }
    }
}

//add search function to submit button.
submitBut.addEventListener('click', () => {
  searchFunction();
})

//add search function to keyup event.
searchInput.addEventListener('keyup', () => {
  searchFunction();
})
//search function end

//check fetch response.
const checkStatus = (response) => {
  if (response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

//fetch 12 results from API.
//generate a card for each result.
//generate a modal for each result.
fetch('https://randomuser.me/api/?results=12')
  .then(checkStatus)
  .then(response => response.json())
  .catch(error => console.log('Error fetching data from URL', error))
  .then(responseObj => {
    return responseObj.results;
  })
  .then(datas => datas.forEach((data) => {
    generateCard(data);
    generateModal(data);
  })
);
