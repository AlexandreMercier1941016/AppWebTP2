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
        console.log(content.token)
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