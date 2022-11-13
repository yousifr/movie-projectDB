'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780/";
//http://image.tmdb.org/t/p/w780/ujmuIln4o5ZK08NvI7GmSuV0jj6.png
// /ujmuIln4o5ZK08NvI7GmSuV0jj6.png
// Don't touch this function please

const autorun = async () => {
  if (!sessionStorage.getItem('filter'))
    sessionStorage.setItem('filter', 'now_playing')
  const movies = await fetchMovies(sessionStorage.getItem('filter'));

  renderMovies(movies.results);
};
// const autorun = async () => {
//   const movies = await fetchMovies();
//   renderMovies(movies.results);
// };

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCredits = await fetchMovie(movie.id + "/credits");
  const movieTrailer = await fetchMovie(movie.id + "/videos");
  const movieRelated = await fetchMovie(movie.id + "/similar");
// console.log(movieRes/production_companies/logo_path)
console.log(movie.id)
console.log(movieRes)
  renderMovie(movieRes, movieCredits, movieTrailer.results ,movieRelated.results );
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.

const fetchMovies = async (movieFilter) => {
  const url = constructUrl(`movie/${movieFilter}`);
  const res = await fetch(url);
console.log(url)
  return res.json();
};


// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class', 'shadow-lg cursor-pointer')
    movieDiv.innerHTML = `
    <img class="w-full" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="Sunset in the mountains">
  <div class="">
    <div class="">${movie.title}</div>
  </div>
  `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const CONTAINER = document.querySelector(".container");
const renderMovie = (movie, movieActors, videos ,related ) => {



  CONTAINER.innerHTML = `
  <div class=" grid-cols-2 row-span-1 row bg-no-repeat bg-cover" id='single-movie-box' style='background-image: url("${BACKDROP_BASE_URL + movie.backdrop_path}")'>
        
  <div id='single-movie-deatils' class="flex-wrap px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div class='flex-wrap'>
      <h2 id="movie-title" class='text-slate-400 mt-5 w-96 text-base font-medium tracking-tight'>${movie.title}</h2>
      
            <p id="movie-rating" class='text-slate-400 w-96  mt-2 text-sm'><b> Rating:</b> ${movie.vote_average}</p>
            <p id="movie-release-date" class='text-slate-400 w-96  mt-2 text-sm'><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-language" class='text-slate-400 w-96  mt-2 text-sm'><b>original language:</b>   ${movie.original_language}</p>
            <p id="movie-runtime" class='text-slate-400 w-96  mt-2 text-sm'><b>Runtime:</b>${movie.runtime} Minutes</p>
            <h3 id='overview-movie-single' class='text-slate-400 w-96 '>Overview:</h3> 
            <p id="movie-overview" class='text-slate-400 w-96  mt-2 text-sm'>${movie.overview}</<p>
            </div>
            <div>
            <iframe class="w-80 pt-[20px] pr-[20px] pb-[20px] pl-[20px]" id='utubvid' src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key : videos[0].key}" 
            ></iframe>
            </div>
        </div>
        <div>
        
        <ul class='actorList'> </ul>
        </div>
        <div>
        
         <ul class='companyList'></ul>
         </div>
        <div class='grid-cols-1'>
         <ul class='relatedList'></ul>
         </div>
        </div>   
      `;
//  <img class="w-full" src="${BACKDROP_BASE_URL+production_companies.logo_path}" alt="Sunset in the mountains">
/* <img class="actors-sigle-page m-2" src="${BACKDROP_BASE_URL+movieRes.production_companies.logo_path}"> */
  const actorList = document.querySelector(".actorList");

  actorList.setAttribute('class', 'flex flex-row justify-center');
  actorList.setAttribute('id', 'actorList-singleMovie-page');
  
  movieActors.cast.slice(0, 5).forEach(actor => {
  
    const movieActorsDiv = document.createElement("div");
    movieActorsDiv.setAttribute("class","movieActorsDiv");

    movieActorsDiv.innerHTML = `
   <img class="actors-sigle-page m-2" src="${PROFILE_BASE_URL+ actor.profile_path}" > 
    <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg '>${actor.name} </p> `;

    actorList.appendChild(movieActorsDiv);
  })
  const companyList =document.querySelector('.companyList');
    companyList.setAttribute('class','flex flex-row justify-center m-4');
    companyList.setAttribute('id', 'companyList-singleMovie-page');
    movie.production_companies.slice(0, 3).forEach(company => {
  
      const movieCompaniesDiv = document.createElement("div");
      movieCompaniesDiv.setAttribute("class","movieCompaniesDiv");
      movieCompaniesDiv.innerHTML = `
     <img class="companies-sigle-page m-2" src="${BACKDROP_BASE_URL+company.logo_path}" > 
      <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg'>${company.name} </p> `; 
     companyList.appendChild(movieCompaniesDiv)
     })
   const relatedList = document.querySelector('.relatedList');
   relatedList.setAttribute('class','flex flex-row justify-center m-4');
   relatedList.setAttribute('id', 'relatedList-singleMovie-page');

   related.slice(0, 5).forEach(relatedMovie => {
    const movieRelatedDiv = document.createElement("div");
   movieRelatedDiv.setAttribute("class","movieRelatedDiv");

   movieRelatedDiv.innerHTML = `
   <img class="actors-sigle-page m-2" src="${PROFILE_BASE_URL+ relatedMovie.backdrop_path}" > 
    <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg m-1'>${relatedMovie.original_title} </p> `;
    relatedList.appendChild(movieRelatedDiv)
   })
    };


document.addEventListener("DOMContentLoaded", autorun);


