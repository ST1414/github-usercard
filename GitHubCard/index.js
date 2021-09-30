import axios from 'axios';

// ==========================================================================
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github User name):
    https://api.github.com/users/<your USER name>
*/

axios.get('https://api.github.com/users/ST1414')
  .then (resp => {
    // console.log(resp);
  })
  .catch (err => {
    // console.log(err);
})

// ==========================================================================
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
axios.get('https://api.github.com/users/ST1414')
  .then (resp => {
    const cardContainer = document.querySelector('.cards');
    const myCard = cardCreator(resp.data);
    cardContainer.appendChild(myCard);
  })
  .catch (err => {
    console.log(err);
})



// ==========================================================================
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers, manually find some other users' github handles, or use the list found at the bottom of the page. Get at least 5 different Github usernames and add them as Individual strings to the friendsArray below.

  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell

    Using that array, iterate over it, requesting data for each user creating a new card for each user, and adding that card to the DOM.
*/

const followersArray = [ 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];


setTimeout( () => {
  
  for (let i = 0; i < followersArray.length; i++){
    
    axios.get(`https://api.github.com/users/${followersArray[i]}`)
    .then (resp => {
      const cardContainer = document.querySelector('.cards');
      const myCard = cardCreator(resp.data);
      cardContainer.appendChild(myCard);
    })
    .catch (err => {
      console.log(err);
    })

  }

}, 50);



// ==========================================================================
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p> 
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>

        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardCreator (gitObj) {

  // Create
  const card = document.createElement('div');
  const avatar = document.createElement('img');
  const info = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // Add classes
  card.classList.add('card');
  info.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  // Add content
  avatar.src = gitObj.avatar_url;
  name.textContent = gitObj.name;
  userName.textContent = gitObj.login;
  location.textContent = `Location: ${gitObj.location}`;
  profile.textContent = `Profile: `;
  link.setAttribute('href', gitObj.html_url);
  link.textContent = gitObj.html_url;
  followers.textContent = `Followers: ${gitObj.followers}`;
  following.textContent = `Following: ${gitObj.following}`;
  bio.textContent = `Bio: ${gitObj.bio}`;

  // Append
  card.appendChild(avatar);
  card.appendChild(info);
  info.appendChild(name);
  info.appendChild(userName);
  info.appendChild(location);
  info.appendChild(profile);
  profile.appendChild(link);
  info.appendChild(followers);
  info.appendChild(following);
  info.appendChild(bio);

  //return
  return card;

}
