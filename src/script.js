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


    var input = document.getElementById("mySearch");
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(input.value)
        d.forEach(elem =>{
            //console.log(elem);
            if (elem.name==input.value){
                let n = elem.known_for;
                //console.log(elem)
                gen_films(n);
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
    var filDiv = document.getElementById("fRow");
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
