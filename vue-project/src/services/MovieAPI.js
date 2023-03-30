let baseURL = 'https://api.themoviedb.org/3/';
let apiKey = "?api_key=67e6614f0a5371f8047de1bf746b514f&language=en-US"
let headers = { Accept: "application/json", "Content-Type": "application/json"};

const RESOURCE_NAME_SINGLE_MOVIE = "movie/";
const RESOURCE_NAME_UPCOMING = "movie/upcoming";
const RESOURCE_NAME_SEARCH = "search/movie";
const RESOURCE_NAME_IMAGE = "/images";
//https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US

export async function getSingleMovie(id) {
    const response = await fetch(baseURL + RESOURCE_NAME_SINGLE_MOVIE + id + apiKey, headers);
    return await response.json();
}
export async function getWelcomePageMovies() {
    const response = await fetch(baseURL + RESOURCE_NAME_UPCOMING+ apiKey, headers);
    return await response.json();
}
export async function getFilteredMoviesByKeyWords(query) {
    const response = await fetch(baseURL + RESOURCE_NAME_SEARCH + apiKey + query, headers);
    return await response.json();
}
export async function getMovieImage(id) {
    const response = await fetch(baseURL + "movie/" + id + RESOURCE_NAME_IMAGE + apiKey, headers);
    return await response.json();
}
export async function postAppreciation(id, appreciation) {
    const response = await fetch(baseURL + RESOURCE_NAME_SEARCH + apiKey + query, headers);
    fetch(baseURL+"movie/"+id+"/rating"+apiKey, {
        method: 'POST',
        headers,
        body: JSON.stringify({ "value": appreciation })
    }).then(response => response.json())
}