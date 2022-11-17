"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const API_URL = TMDB_BASE_URL + "/discover/movie?sort_by=popularity.desc&";
const CONTAINER = document.querySelector(".container");

// const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
  //   console.log(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);

const moviesList = document.querySelector(".movieslist");

const renderMovies = (movies) => {
  movies.map((movie) => {
    // const movieDiv = document.querySelectorAll(".moviecard");
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute(
      "class",
      "m-3 relative rounded-md shadow-xl cursor-pointer bg-cardbg"
    );

    movieDiv.innerHTML = `
      
        <img  class=" rounded-tr-md rounded-tl-md" src="${
          BACKDROP_BASE_URL + movie.backdrop_path
        }" alt="movieImg">
        <h2 class=" text-white text-4xl m-3">${movie.title}</h2>
        <h3 class="text-white text-xl ml-3">${movie.vote_average} / 10</h3> 
        <h4 class="text-white text-xl ml-3 ">
        
        </h4>  
        <div class="bg-slate-500 absolute top-0 h-full w-full rounded-md opacity-0 hover:opacity-80 text-white p-3  ">
          <div class="hoverrating">Rating: ${movie.vote_average}</div>
          <div class="hovergenres">Genres:
          </div>
          <div class="hoverdesc">Description: ${movie.overview}</div>
        </div>
      `;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    moviesList.appendChild(movieDiv);
  });
};

const categories = async () => {
  const url = constructUrl(`/genre/movie/list`);
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.genres);
  return data.genres;
  //   return res.map((item) => {
  //     item.name;
  //   });
};
categories();
const category = async () => {
  const cat = await categories();
  //   console.log(cat.genres.map((item) => item.name).join(""));
  return cat.genres.map((item) => item.name).join("");
};
category();

// var g = "";
// for (i in genres) {
//   g += genres[i].name + ", ";
// }

// const getGenres = () => {
//   let genre = "";
//   for (i in genres) {
//     genre += genres[i].name + ", ";
//   }
//   return genre;
// };

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const dropdowngenre = document.getElementById("dropdowngenre");

let selectedGenre = [];
setGenre();
function setGenre() {
  dropdowngenre.innerHTML = "";
  // tagsEl.innerHTML= '';
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      renderMovies(
        API_URL + "&with_genres=" + constructUrl(selectedGenre.join(","))
      );
      // getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
      highlightSelection();
    });
    dropdowngenre.append(t);
    // tagsEl.append(t);
  });
}

// const fetchMovies = async () => {
//   const url = constructUrl(`movie/now_playing`);
//   const res = await fetch(url);
//   return res.json();
// };

// const autorun = async () => {
//   const movies = await fetchMovies();
//   renderMovies(movies.results);
// };

// toggle the navbar

const x = document.getElementById("myclose");
const resnavbar = document.getElementById("resnavbar");

function displayNavbar() {
  if (resnavbar.style.display === "none") {
    resnavbar.style.display = "block";
  } else {
    resnavbar.style.display = "none";
  }
}

//show genre from tmdb api in javascript?
