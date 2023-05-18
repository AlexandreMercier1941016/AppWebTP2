let baseURL = 'https://api.themoviedb.org/3/';
let apiKey = "?api_key=67e6614f0a5371f8047de1bf746b514f&language=en-US"
let apiKeyWithoutLanguage = "?api_key=67e6614f0a5371f8047de1bf746b514f"
let headers = { Accept: "application/json", "Content-Type": "application/json"};

const RESOURCE_NAME_SINGLE_MOVIE = "movie/";
const RESOURCE_NAME_UPCOMING = "movie/upcoming";
const RESOURCE_NAME_SEARCH = "search/movie";
const RESOURCE_NAME_IMAGE = "/images";
const RESOURCE_NAME_GENRE = "genre/movie/list";
const RESOURCE_LOGIN="/login";
const NEW_BASE_URL = "https://laravel-e23.herokuapp.com/api/";

//methode pour le tp3
//a fixer pour la route login
export async function getLoginToken(username,password){
    
        const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: username, password: password})
        })
        const content = await rawResponse.json();
        return content.token;
}
export async function getUserInfo(token){
    const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token
        },

      })
      const content = await rawResponse.json();
      return content;
}
export async function logoutUser(token){
  const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/logout', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      },

    })
    const content = await rawResponse;
    return content.status;
}
export async function updateCurrentUser(email,nom,prenom,token){
    const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/user', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token
        },
        body: JSON.stringify({email: email, first_name: prenom,last_name:nom})
      })
      const content = await rawResponse.json();
      return content;
}

export async function updateCurrentUserPassword(password,token){
  const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/user/password', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      },
      body: JSON.stringify({password: password})
    })
    const content = await rawResponse.json();
    return content.token;
}
export async function createUser(email,password,first_name,last_name){
    const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password,last_name:last_name,first_name:first_name})
      })
      const content = await rawResponse.json();
      return content.token;
}


export async function setUpGuestSessionId() {
    const response = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new" + apiKeyWithoutLanguage, headers);
    return await response.json();
}

export async function getSingleMovie(id) {
    const response = await fetch(baseURL + RESOURCE_NAME_SINGLE_MOVIE + id + apiKey, headers);
    return await response.json();
}

export async function getWelcomePageMovies() {
    const response = await fetch(baseURL + RESOURCE_NAME_UPCOMING+ apiKey, headers);
    return await response.json();
}

export async function getFilteredMoviesByKeyWords(keywords,year,genre) {
    const response = await fetch(baseURL + RESOURCE_NAME_SEARCH + apiKeyWithoutLanguage + "&query=" + keywords + "&year=" + year + "&genre=" + genre, headers);
    return await response.json();
}

export async function getGenres() {
    const response = await fetch(baseURL + RESOURCE_NAME_GENRE + apiKey, headers);
    return await response.json();
}

export async function postAppreciation(id, appreciation) {
    const guestSession = await setUpGuestSessionId();
    const guestSessionId = guestSession.guest_session_id;

    const response = await fetch("https://api.themoviedb.org/3/movie/" + id + "/rating" + apiKeyWithoutLanguage + "&guest_session_id=" + guestSessionId, {
        method: 'POST',
        headers,
        body: JSON.stringify({ "value": appreciation*2 })
    });
    return await response.json();
}



export async function getAllActors() {
    const response = await fetch(NEW_BASE_URL + "/actors", headers);
    return await response.json();
}

export async function getAllFilms() {
    const response = await fetch(NEW_BASE_URL + "/films", headers);
    return await response.json();
}

export async function getOneFilm(id) {
    const response = await fetch(NEW_BASE_URL + "/films/" + id, headers);
    return await response.json();
}

export async function getActorsForOneFilm(id) {
    const response = await fetch(NEW_BASE_URL + "/films/" + id + "/actors", headers);
    return await response.json();
}


export async function postFilm(id,created_at,updated_at,title,release_year,length,description,rating,language_id,special_features,image) {
    /*const guestSession = await setUpGuestSessionId();
    const guestSessionId = guestSession.guest_session_id;*/
    //Faire la connexion avec le token


    const response = await fetch(NEW_BASE_URL + "/films", {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
            "id": id,
            "created_at": created_at,
            "updated_at": updated_at,
            "title": title,
            "release_year": release_year,
            "length": length,
            "description": description,
            "rating": rating,
            "language_id": language_id,
            "special_features": special_features,
            "image": image
        })
    });
    return await response.json();
}
export async function postMovieCritic(token,user_id,user_name,score,commentaire,movieID){
    
  const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/films/'+movieID+'/critics', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
    },
    body: JSON.stringify({user_id: user_id, user_name:user_name,score:score,commentaire:commentaire,date:Date.now()})
  })
  const content = await rawResponse.json();
  return content.token;
}
export async function removeMovieFromBd(token,movieID){
    
  const rawResponse = await fetch('https://laravel-e23.herokuapp.com/api/films/'+movieID, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
    },
  })
  const content = await rawResponse.json();
  return content.token;
}

export async function postCritic(token,id,created_at,updated_at,user_id,film_id,score,comment) {
    /*const guestSession = await setUpGuestSessionId();
    const guestSessionId = guestSession.guest_session_id;*/
    //Faire la connexion avec le token


    const response = await fetch(NEW_BASE_URL + "/films" , {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
          }
          ,
        body: JSON.stringify({ 
            "id": id,
            "created_at": created_at,
            "updated_at": updated_at,
            "user_id": user_id,
            "film_id": film_id,
            "score": score,
            "comment": comment
        })
    });
    return await response.json();
}