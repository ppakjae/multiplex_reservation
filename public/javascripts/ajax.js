var req = new XMLHttpRequest();

let reservation_list= [];

req.onreadystatechange = function(e){
	console.log(""+req.readyState + req.status);
	if( req.readyState == 4) {
		if( req.status == 200){
			console.log(req.response);
			if (req.response.type == "movie_selected"){
				movie_selected = req.response;
				setTimeout(()=>{
					remove_simpleInfo();
					make_simpleInfo();
					Content_backgroundImg.style.backgroundImage = `url(${movie_selected.movie_img})`;
				},800);
				} else if(req.response.type == "reservation_list"){
					reservation_list =req.response.results;
					make_reservationList();
					console.log("?");
				} else if(req.response.type == "find"){
					console.log(req.response);
				}
			}
	}
};
req.responseType = "json";