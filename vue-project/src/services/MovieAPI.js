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
const NEW_BASE_URL = "https://laravel-e23.herokuapp.com/api";
const NEW_BASE_URL1 = "https://laravel-e23.herokuapp.com/api/";
const LOGIN="login"
const USER="user"
const USERS="users"
const LOGOUT="logout"
const PASSWORD="/password"
const FILMS="films"

//methode pour le tp3
//a fixer pour la route login
export async function getLoginToken(username,password){
    
        const rawResponse = await fetch(NEW_BASE_URL1+LOGIN, {
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
    const rawResponse = await fetch(NEW_BASE_URL1+USER, {
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
  const rawResponse = await fetch(NEW_BASE_URL1+LOGOUT, {
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
    console.log(email,nom,prenom,token)
    const obj={email:email,first_name: prenom,last_name:nom}
    console.log(obj)
    const rawResponse = await fetch(NEW_BASE_URL1+USER, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token
        },
        body: JSON.stringify(obj),
      })
      const content = await rawResponse;
      console.log(rawResponse)
      return content;
}

export async function updateCurrentUserPassword(oldPassword,newPassword,newPassword2,token){
  console.log("allo2")
  const rawResponse = await fetch(NEW_BASE_URL1+USER+PASSWORD, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      },
      body: JSON.stringify({old_password:oldPassword,new_password: newPassword,confirm_new_password:newPassword2})
    })
    const content = await rawResponse;
    console.log(content)
    return content;
}
export async function createUser(email,password,first_name,last_name){
    const rawResponse = await fetch(NEW_BASE_URL1+USER, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password,last_name:last_name,first_name:first_name})
      })
      const content = await rawResponse;
      return content;
}



export async function getSingleMovie(id) {
    const response = await fetch(NEW_BASE_URL1+FILMS+"/"+id, headers);
    return await response.json();
}

export async function getWelcomePageMovies() {
    const response = await fetch(NEW_BASE_URL1+FILMS, headers);
    return await response.json();
}

export async function getFilteredMoviesByKeyWords(keywords,year,genre) {
    const response = await fetch(NEW_BASE_URL1+FILMS+ "&keywords=" + keywords + "&rating=" + year + "&year=" + genre, headers);
    return await response.json();
}

export async function getGenres() {
    const response = await fetch(baseURL + RESOURCE_NAME_GENRE + apiKey, headers);
    return await response.json();
}



export async function getAllActors() {
    const response = await fetch(NEW_BASE_URL + "/actors", headers);
    return await response.json();
}

export async function getAllFilms() {
    const response = await fetch(NEW_BASE_URL1+FILMS, headers);
    return await response.json();
}

export async function getOneFilm(id) {
    const response = await fetch(NEW_BASE_URL1+FILMS+"/"+id, headers);
    return await response.json();
}

export async function getActorsForOneFilm(id) {
    const response = await fetch(NEW_BASE_URL + "/films/" + id + "/actors", headers);
    return await response.json();
}


export async function postFilm(title, release_year, length, description, rating, language_id, actors,token) {
  //Je n'ai pas trouvé c'est quoi que l'api requiert comme champs, si c'est des string ou un tableau, etc. J'ai testé plusieurs configurations et je n'ai pas trouvé.
    const response = await fetch(NEW_BASE_URL + "/films", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
          },
        body: JSON.stringify({
            "title": title,
            "release_year": release_year,
            "length": length,
            "description": description,
            "rating": rating,
            "language_id": language_id,
            "actors" : actors
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
    const response = await fetch(NEW_BASE_URL + "/films/" + id + "/critics", {
        method: 'POST',
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

export async function postUser(id,remember_token,created_at,updated_at,password,email,last_name,first_name,role_id) {
    const response = await fetch(NEW_BASE_URL + "/users" , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          ,
        body: JSON.stringify({ 
            "id": id,
            "remember_token": remember_token,
            "created_at": created_at,
            "updated_at": updated_at,
            "password": password,
            "email": email,
            "last_name": last_name,
            "first_name": first_name,
            "role_id": role_id
        })
    });
    return await response.json();
}