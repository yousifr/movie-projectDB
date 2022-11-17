 // api url
 const api_url = "https://api.themoviedb.org/3/person/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
    
 // Defining async function
async function getapi(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();
//console.log(data.results);
 var d = data.results;


 var input = await document.getElementById("search-container");
 input.addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
     event.preventDefault();
     console.log(input.value)
     d.forEach(elem =>{
         //console.log(elem.name);
         if (elem.name==input.value){
             
             var pers_api = `https://api.themoviedb.org/3/person/${elem.id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`;
             get_pers_api(pers_api);
         }
     });
   }
 });
}

async function get_pers_api(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();
 console.log(data);
 document.getElementById('name').innerHTML=data.name;
 document.getElementById('gender').innerHTML= data.gender==1 ? "Female" : "Male";
 document.getElementById('popularity').innerHTML= data.popularity;
 document.getElementById('desc').innerHTML = data.biography;
 document.getElementById('birth').innerHTML = data.birthday;
 document.getElementById('Perspic').src = `https://image.tmdb.org/t/p/original${data.profile_path}`
}

async function get_film_api(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();

 let film = data.cast.slice(0,3)
 console.log(film)
 gen_films(film)
}




async function gen_films(n){
console.log(n)
var filDiv = document.getElementById("fRow");
filDiv.replaceChildren();
if (n.length==0){
   let f = `
   <div class="film-1">
       <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
       <div ><h3 class="filmname">Nothing to Show</h3></div>
   </div>
   `;
   filDiv.innerHTML = f;
}else{
   n.forEach(film => {
       console.log(film.title)
       let f = `
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
           <div ><h3 class="filmname">${film.title}</h3></div>
       </div>
       `;
       filDiv.innerHTML += f;
   })
}

}
// Calling that async function
getapi(api_url);

'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
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
//console.log(movie.id)
//console.log(movieRes)
//console.log(movieCredits)
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
const renderActors = ()=>{
CONTAINER.innerHTML=`
<div class="personal_img">
<img id="Perspic" src="https://image.tmdb.org/t/p/original/kL0lWLJA6lbvmPM3YL0ISE6rVr6.jpg" alt="Pers pic">
</div>
 <div class="welcome">
   <h1 id="name">JOEY KING</h1>
   <p class="topics">Birth: <span id="birth">1999-07-30</span> &nbsp; &nbsp; &nbsp; Gender:<span id="gender"> Female</span> &nbsp; &nbsp; &nbsp; Popularity: <span id="popularity">135.271</span></p><br>
   <p id="desc">Joey Lynn King (born July 30, 1999) is an American actress. She first gained recognition for portraying Ramona Quimby in the comedy film Ramona and Beezus (2010) and has since gained wider recognition for her lead role in The Kissing Booth (2018) and its two sequels. King received critical acclaim for her starring role in the crime drama series The Act (2019), for which she was nominated for both a Primetime Emmy Award and a Golden Globe Award. In 2022 she played the titular role of The Princess in Disney's The Princess (movie). King has also appeared in the films Battle: Los Angeles (2011), Crazy, Stupid, Love (2011), The Dark Knight Rises (2012), The Conjuring (2013), White House Down (2013), Independence Day: Resurgence (2016), Bullet Train (2022) and The Princess (2022), as well as the first season of the FX black comedy crime drama series Fargo.</p><br>
   
   <h2>List of Films Participated in:</h2>
  
   <div class="films-row" id="fRow">
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
         <div ><h3 class="filmname">The Kissing Booth</h3></div>
     </div>
     
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
         <div ><h3 class="filmname">The Act</h3></div>
     </div>
     
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
         <div ><h3 class="filmname">The Kissing Booth 2</h3></div>
     </div>
     
 </div>
 </div>
`;



}

const renderMovie = (movie, movieActors, videos ,related ) => {



CONTAINER.innerHTML = `
<div class=" grid-cols-2 row-span-1 row bg-no-repeat bg-cover" id='single-movie-box' style='background-image: url("${BACKDROP_BASE_URL + movie.backdrop_path}")'>
<div id='single-movie-deatils' class="flex-wrap px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
<div class='flex-wrap'>
   <h2 id="movie-title" class='text-slate-400 flex-wrap column mt-5 text-base font-medium tracking-tight'>${movie.title}</h2>
  <ul class='directorList'><b  class='text-slate-400 text-xl' >director's :-</b></ul>
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
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-medium tracking-tight'>Actors :-</h2>
     <ul class='actorList'> </ul>
     </div>
     <div>
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-medium tracking-tight'>Prodaction Companies</h2>
      <ul class='companyList'></ul>
      </div>
     <div class='grid-cols-1'>
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-medium tracking-tight'>related movies</h2>
      <ul class='relatedList'></ul>
      </div>
      <div id="titles" class='text-slate-400 mt-5 w-full text-base font-medium tracking-tight'>
      <form action="./index.html" class="inline">
      <button class="float-left submit-button" >back to home</button>
      </form>
      </div>
   `;
//  <img class="w-full" src="${BACKDROP_BASE_URL+production_companies.logo_path}" alt="Sunset in the mountains">
/* <img class="actors-sigle-page m-2" src="${BACKDROP_BASE_URL+movieRes.production_companies.logo_path}"> */
const actorList = document.querySelector(".actorList");

actorList.setAttribute('class', 'flex flex-row justify-center');
actorList.setAttribute('id', 'actorList-singleMovie-page');

movieActors.cast.slice(0, 5).forEach(actor => {
 BACKDROP_BASE_URL + actor.profile_path
 const movieActorsDiv = document.createElement("div");
 movieActorsDiv.setAttribute("class","movieActorsDiv");
 //console.log("The Films "+ actor.)
 movieActorsDiv.innerHTML = `
<img class="actors-sigle-page m-2" src="${PROFILE_BASE_URL+ actor.profile_path}" > 
 <p id='actorsearch' class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg '>${actor.name}</p>`;

actorList.appendChild(movieActorsDiv);

movieActorsDiv.addEventListener('click', function(e){
   e.preventDefault()
   let n = actor.known_for;
   let filAPI = `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`
   get_film_api(filAPI)
   
   let urls=`https://api.themoviedb.org/3/person/${actor.id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`
   get_pers_api(urls)
   //console.log(actor)
   renderActors()
})



});
const directorList = document.querySelector(".directorList");
directorList.setAttribute('id', 'actorList-singleMovie-page');

movieActors.crew.filter(director => director.job === 'Director').map(director => {
 const mydir=document.createElement('ul');
 mydir.setAttribute("class","mydirDiv");
 mydir.innerHTML= `<p class='text-slate-400 text-xl'>${director.name}</p>
 `;
 directorList.appendChild(mydir);
});

 

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

 movieRelatedDiv.addEventListener('click', function(){
    movieDetails(relatedMovie);
   
    })
    relatedList.appendChild(movieRelatedDiv)
})

 };



 async function get_pers_api(urls) {

   // Storing response
   const response = await fetch(urls);
   
   // Storing data in form of JSON
   var data = await response.json();
     //console.log(data);
     document.getElementById('name').innerHTML=data.name;
     document.getElementById('gender').innerHTML= data.gender==1 ? "Female" : "Male";
     document.getElementById('popularity').innerHTML= data.popularity;
     document.getElementById('desc').innerHTML = data.biography;
     document.getElementById('birth').innerHTML = data.birthday;
     document.getElementById('Perspic').src = `https://image.tmdb.org/t/p/original${data.profile_path}`
 }


 async function gen_films(n){
   console.log(n)
   var filDiv = await document.getElementById("fRow");
   filDiv.replaceChildren();
   if (n.length==0){
       let f = `
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
           <div ><h3 class="filmname">Nothing to Show</h3></div>
       </div>
       `;
       var filDiv = document.getElementById("fRow");
       filDiv.replaceChildren();
       filDiv.innerHTML = f;
   }else{
       n.forEach(film => {
           console.log(film.title)
           console.log(film)
           let f = `
           <div class="film-1">
               <img id="filmpic" src="${BACKDROP_BASE_URL +film.backdrop_path}"  alt="film pic" >
               <div ><h3 class="filmname">${film.title}</h3></div>
           </div>
           `;
           filDiv.addEventListener('click', function(){
            movieDetails(film)
           
            })
           filDiv.innerHTML += f;
       })
   }
   const btn = document.querySelector('.btn')
   btn.addEventListener('click',function (){
    renderMovie()
   })
 
}
document.addEventListener("DOMContentLoaded", autorun);
