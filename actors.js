const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const actorsContainer = document.querySelector('.actorsContainer')


const runActors = async () => {
    const actors = await fetchActors();
    renderActorss(actors.results);
  };
  
  const actorDetails = async (actor) => {
      const actorRes = await fetchActor(actor.id);
      renderActorsss(actorRes);
    };
   
  const fetchActors = async () => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    return res.json();
  };
  
  const fetchActor = async (actorId) => {
      const url = constructUrl(`person/${actorId}`);
      const res = await fetch(url);
      return res.json();
    };
   
  const renderActorss = (actors) => {

    actors.map((actor) => {
        const actorDiv = document.createElement("div");
        actorDiv.setAttribute('class' , 'actorsWrapper shadow-lg cursor-pointer')
        actorDiv.innerHTML = `
        <div class='actorsBox'>
            <img class="w-full" src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name} poster">
            <h3 class = "">${actor.name}</h3>
            </div>`;
        actorDiv.addEventListener("click", () => {
          actorDetails(actor);
        });
        actorsContainer.appendChild(actorDiv);
      });
      actorsContainer.appendChild(actorsDiv);
      actorsPageDes();
    };

  
  const actorsPageDes = () => {
    const header = document.querySelector(".description");
    header.innerHTML = "See Popular Actors";
    
  }
  
  function checkGender(num){
    if(num == 1){
        return "Female"
    } else if(num == 2){
      return "Male"
    }
  }
  
  const renderActorsss = (actor) => {
    actorsContainer.innerHTML = `
      <div class="box">
      <div class="col-md-4">
           <img id="actor-backdrop" src=${
             PROFILE_BASE_URL + actor.profile_path}>
      </div>
      <div class="col-md-8">
      <h2 id="actor-name">${actor.name} (${checkGender(actor.gender)})</h2>
              <p id="actor-birth-date"><b>BirthDate:</b> ${actor.birthday}</p>
              <p id="actor-popularity"><b>Popularity:</b> ${actor.popularity}</p>
              <h3>Biography:</h3>
              <p id="actor-overview">${actor.biography}</p>
       </div>
       </div>`
  
       if(actor.deathday != null){
        actorsContainer.innerHTML += `<p id="actor-death-date"><b>DeathDay:</b> ${actor.deathday} </p>`
      }
  
      runActormovieDetails(actor);
     };
     document.addEventListener("DOMContentLoaded", runActors);