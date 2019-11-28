// Data
// const movie =[ 
// 	["Jocker", "Parasite", "Shrek", "HarryPotter", "Walkingdead"],
// 	["Parisite","HarryPotter","Jocker","Walkingdead","Shrek"]
// ];

const movie_selected = {
	genre : "Horror/ Comedy",
	ratio : 4,
	releaseDate : "2019.99.99",
	country :  "Korea",
	running_time : 130,
	movie_director : "Son HeungMin",
	actors : ["Park SeongSoo", "Park JaeSeon", "Oh HyeongSeo", "Woo HyeongSeok", "Jeon JongHa","Kim DeokYoung"],
	agency : "CJEnt",
	translator : "",
	age_limit : 15,
	number_of_spectators : 123456789, 
	reservation_rates : 15
};

// Ellement ref
const Movie= document.querySelectorAll('.movie')
const Movie_filter = document.querySelectorAll('#movie-filter > li')
const Movie_chart = document.querySelector('#Movie-chart');
const Content_background = document.querySelector('#Content-background');
const Content_backgroundImg = document.querySelector('#Content-background-img');
const Content = document.querySelector('#Content');
const moreInfo_btn = document.querySelector('button');
const goReservation_btn = document.querySelector('#goReservation');

const make_movieContainer = function(element){
	const Movie_chart = document.querySelector('#Movie-chart');
	
	const container = document.createElement('div');
	container.classList.add('movie');
	const image = document.createElement('div');
	image.classList.add('movie-image');
	const name = document.createElement('h3');
	name.classList.add('movie_name');
	const nameText=document.createTextNode(element);

	Movie_chart.appendChild(container);
	container.appendChild(image);
	container.appendChild(name);		
	name.appendChild(nameText);
};

const make_movieChart = function(){
		movie[0].forEach((element)=>{
		make_movieContainer(element)
		});
		const Movie = document.querySelectorAll('.movie');
		Movie[0].classList.add('selected');
		make_simpleInfo();
		Movie.forEach((element)=>{
			element.addEventListener('click',change_select.bind(element));
		});

		Movie_filter.forEach((element,index)=>{
			element.addEventListener('click',()=>{
				const Movie = document.querySelectorAll('.movie');
				const Movie_name = document.querySelectorAll(".movie_name");
				const Movie_chart = document.querySelector("#Movie-chart");

				setTimeout(()=>{
					Movie_name.forEach((element,j)=>{
						element.innerHTML = movie[index][j];
					})},500);
		
				remove_simpleInfo();
				document.querySelector('.movie.selected').classList.remove('selected');
				Movie[0].classList.add('selected');
				make_simpleInfo();
				Movie_chart.scrollLeft= 0;
			});
		});
};

const make_simpleInfo = function(event){
	const Info = document.createElement("div");
	Info.classList.add("Info");
	const genre = document.createElement("p");
	const ratio = document.createElement("p");
	const releaseDate = document.createElement("p");
	const genreText =document.createTextNode("Genre : "+movie_selected.genre);
	const ratioText = document.createTextNode("Ratio : "+movie_selected.ratio);
	const releaseDateText = document.createTextNode(movie_selected.releaseDate);
	
	const Movie_selected = document.querySelector('.movie.selected');
	
	Movie_selected.appendChild(Info);
	Info.appendChild(genre);
	Info.appendChild(genreText);
	Info.appendChild(ratio);
	Info.appendChild(ratioText);
	Info.appendChild(releaseDateText);
	Info.appendChild(releaseDateText);

};

const make_detailedInfo = function(event){
	const Info = document.createElement("div");
	Info.classList.add("Info");

	const genre = document.createElement("p");
	const ratio = document.createElement("p");
	const releaseDate = document.createElement("p");
	const running_time = document.createElement("p");
	const country = document.createElement("p");
	const movie_director = document.createElement("p");
	const actors = document.createElement("ul");
	const agency = document.createElement("p");
	const translator = document.createElement("p");
	const age_limit = document.createElement("p");
	const number_of_spectators = document.createElement("p");
	const reservation_rates = document.createElement("p")

	const genreText =document.createTextNode("Genre : "+movie_selected.genre);
	const ratioText = document.createTextNode("Ratio : "+movie_selected.ratio);
	const releaseDateText = document.createTextNode("Release Date :"+movie_selected.releaseDate);
	const running_timeText = document.createTextNode("Running Time :"+movie_selected.running_timeText);
	const countryText = document.createTextNode("Country : "+movie_selected.country);
	const movie_directorText = document.createTextNode("Movie Director : "+movie_selected.movie_director);
	const agencyText = document.createTextNode("Agency : "+movie_selected.agency);
	const translatorText = document.createTextNode("Translator :"+movie_selected.translator);
	const age_limitText = document.createTextNode("Age limit :"+movie_selected.age_limit);
	const number_of_spectatorsText = document.createTextNode("Number of spectators :"+movie_selected.number_of_spectators);
	const reservation_ratesText = document.createTextNode("Reservation rates :"+movie_selected.reservation_rates);

	genre.appendChild(genreText);
	ratio.appendChild(ratioText);
	releaseDate.appendChild(releaseDateText);
	running_time.appendChild(running_timeText);
	country.appendChild(countryText);
	movie_director.appendChild(movie_directorText);
	agency.appendChild(agencyText);
	translator.appendChild(translatorText);
	agency.appendChild(agencyText);
	age_limit.appendChild(age_limitText);
	number_of_spectators.appendChild(number_of_spectatorsText);
	reservation_rates.appendChild(reservation_ratesText);


	for(let i =0 ; i<movie_selected.actors.length;i++){
		const actor = document.createElement("li");
		const actorText = document.createTextNode("Actor :"+movie_selected.actors[i]);

		actor.appendChild(actorText);
		actors.appendChild(actor);
	}
	
	const Movie_selected = document.querySelector('.movie.selected');
	

	Info.appendChild(genre);
	Info.appendChild(ratio);
	Info.appendChild(releaseDate);
	Info.appendChild(running_time);
	Info.appendChild(country);
	Info.appendChild(movie_director);
	Info.appendChild(actors);
	Info.appendChild(agency);
	Info.appendChild(translator);
	Info.appendChild(agency);
	Info.appendChild(age_limit);
	Info.appendChild(number_of_spectators);
	Info.appendChild(reservation_rates);
	Movie_selected.appendChild(Info);
}

const remove_simpleInfo = function(event){
	const Movie_deselected = document.querySelector('.movie.selected');
	Movie_deselected.removeChild(document.querySelector('.Info'));
};



const change_select = function(event){
	const Movie_chart = document.querySelector('#Movie-chart');
	const Movie = document.querySelectorAll('.movie');
	remove_simpleInfo();
	document.querySelector('.movie.selected').classList.remove('selected');
	setTimeout(()=>{
		this.classList.add('selected');
		make_simpleInfo();
		Movie_chart.scrollLeft = 0;
	},700);
};

const handle_more = function(){
	const Content = document.querySelector('#Content');
	const Content_backgroundImg =document.querySelector('#Content-background-img');
	const Movie_selected = document.querySelector('.movie.selected');
	const Movie_chart = document.querySelector('#Movie-chart');
		Movie_selected.classList.toggle('in-detail');
		Movie_chart.classList.toggle('in-detail');
		remove_simpleInfo();
		make_detailedInfo();
		setTimeout(()=>{
			Content_background.style.height =  Content.getBoundingClientRect().height+'px';
			Content_backgroundImg.style.height =  Content.getBoundingClientRect().height+'px';
			console.log( Content.getBoundingClientRect().height);
		},100);
}



make_movieChart();

moreInfo_btn.addEventListener('click', handle_more);

if(Menu_icon){
	Menu_icon.addEventListener('click',()=>{
		const Content = document.querySelector('#Content');
			setTimeout(()=>{
				Content_background.style.width =  Content.getBoundingClientRect().width+'px';
				Content_backgroundImg.style.width =  Content.getBoundingClientRect().width+'px';
				console.log( Content.getBoundingClientRect().width);
			},500);
	});
}

goReservation_btn.addEventListener('click', ()=>{
	window.location.href="/reserv";
});



