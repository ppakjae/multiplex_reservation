// Data
const movie =[ 
["Jocker", "Parasite", "Shrek", "HarryPotter", "Walkingdead"],
["Parisite","HarryPotter","Jocker","Walkingdead","Shrek"]
];
// ellement ref
const Movie= document.querySelectorAll('.movie')
const Movie_filter = document.querySelectorAll('#movie-filter > li')
const Movie_chart = document.querySelector('#movie-chart');
const Content_Background = document.querySelector('#Content-background');
const Content = document.querySelector('#Content');
const btn = document.querySelector('button');



const make_movieContainer = function(element){
	const Movie_chart = document.querySelector('#movie-chart');
	
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
				const Movie_chart = document.querySelector("#movie-chart");

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
	const genreText =document.createTextNode("Genre : Horror/Comedy");
	const ratioText = document.createTextNode("Ratio : 4.0");
	const releaseDateText = document.createTextNode(" 2019.99.99");
	
	const Movie_selected = document.querySelector('.movie.selected');
	
	Movie_selected.appendChild(Info);
	Info.appendChild(genre);
	Info.appendChild(genreText);
	Info.appendChild(ratio);
	Info.appendChild(ratioText);
	Info.appendChild(releaseDateText);
	Info.appendChild(releaseDateText);

};

const remove_simpleInfo = function(event){
	const Movie_deselected = document.querySelector('.movie.selected');
	Movie_deselected.removeChild(document.querySelector('.Info'));
};



const change_select = function(event){
	const Movie_chart = document.querySelector('#movie-chart');
	const Movie = document.querySelectorAll('.movie');
	remove_simpleInfo();
	document.querySelector('.movie.selected').classList.remove('selected');
	setTimeout(()=>{
		this.classList.add('selected');
		make_simpleInfo();
		Movie_chart.scrollLeft = 0;
	},700);
};



make_movieChart();

btn.addEventListener('click',()=>{
	const Content = document.querySelector('#Content');
	const img =document.querySelector('#img');
	const Movie_selected = document.querySelector('.movie.selected');
	const Movie_chart = document.querySelector('#movie-chart');
		// Content_Background.classList.toggle('in-detail')
		Movie_selected.classList.toggle('in-detail');
		Movie_chart.classList.toggle('in-detail');
		setTimeout(()=>{
			Content_Background.style.height =  Content.getBoundingClientRect().height+'px';
			img.style.height =  Content.getBoundingClientRect().height+'px';
			console.log( Content.getBoundingClientRect().height);
		},100);
});

Menu_icon.addEventListener('click',()=>{
	const Content = document.querySelector('#Content');
		setTimeout(()=>{
			Content_Background.style.width =  Content.getBoundingClientRect().width+'px';
			img.style.width =  Content.getBoundingClientRect().width+'px';
			console.log( Content.getBoundingClientRect().width);
		},500);
});