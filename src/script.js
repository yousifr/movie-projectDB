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
// Calling that async function
getapi(api_url);
