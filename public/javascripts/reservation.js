
//Data
const seats1 = [
	[0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
	[0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
	[0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
	[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0]
];


const seats2 = [
	[0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
];
var screen_time_list;
if (screen_list != null) {
	var screen_time_list = Array.from(Array(screen_list.length), () => Array());
	for (let i = 0; i < screen_list.length; i++) {
		obj = new Object();
		obj.box_office_id = screen_list[i][0];
		start_time = screen_list[i][1].split(':');
		start_time = start_time[0].concat(':', start_time[1]);
		obj.show_start_time = start_time;
		left = 0;
		tot = 0 ;
		obj.screen_no = screen_list[i][2];
		seats = screen_list[i][3];
		for (let j = 0; j < seats.length; j++) {
			for (let k = 0 ; k < seats[j].length; k++) {
					if(seats[j][k]>0) tot++;
					if(seats[j][k] == 1) left ++;	
			}
		}
		obj.lefted_seating_capcity=String(left).concat("/",tot);
		screen_time_list[i] = obj;
	}
}


//Element ref
const goPayment = document.querySelector("#goPayment");

const make_seatChart = function () {
	const SeatChart = document.querySelector('#SeatChart');
	for (i = 0; i < seats.length; i++) {
		let newRow = document.createElement('div');
		newRow.classList.add('seat-row');
		SeatChart.appendChild(newRow);
		for (j = 0; j < seats[i].length; j++) {
			let newSeat = document.createElement('div');
			let newSeatText = document.createTextNode(" ");
			newSeat.appendChild(newSeatText);
			if (seats[i][j] == 1) {
				newSeat.classList.add('seat');
				newRow.appendChild(newSeat);
			}
			else {
				newSeat.classList.add('empty_seat');
				newRow.appendChild(newSeat);
			}
		}
	}
}

var date;
var screen_no;
var show_start_time;

const make_reservation_info = function (i, textContent, info) {
	const Info = document.querySelector("#reservation_info");
	Info.children[i].children[0].textContent = textContent + ": " + info;
}


const make_regionList = function () {
	const RegionList = document.querySelector("#region-list");
	for (i = 0; i < region_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(region_list[i]);
		newItem.appendChild(newItem_text);
		if (region_list[i] == reservation_info[0]) {
			newItem.className = "selected";
		}
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < RegionList.childElementCount; k++) {
				RegionList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info[0] = newItem.textContent;
			remove_cinemaList();
			for (let k = 0; k < RegionList.childElementCount; k++) {
				if (RegionList.children[k].textContent == reservation_info[0]) {
					make_cinemaList(cinema_list[k]);
				}
			}
		});
		RegionList.appendChild(newItem);
	}
}

const make_cinemaList = function (branch_list) {
	const CinemaList = document.querySelector("#cinema-list");
	for (i = 0; i < branch_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(branch_list[i]);
		newItem.appendChild(newItem_text);
		if (branch_list[i] == reservation_info[1]) {
			newItem.className = "selected";
		}
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < CinemaList.childElementCount; k++) {
				CinemaList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info[1] = newItem.textContent;
			make_reservation_info(1, "cinema", newItem.textContent);
			document.getElementById("info").value = reservation_info;
			document.getElementById("select_form").submit();
		});
		CinemaList.appendChild(newItem);
	}
}
const remove_cinemaList = function () {
	const CinemaList = document.querySelector("#cinema-list");
	while (CinemaList.childElementCount > 0) {
		CinemaList.removeChild(CinemaList.lastChild);
	}
}


const make_movieList = function () {
	const MovieList = document.querySelector("#movie-list");
	for (i = 0; i < movie_list.length; i++) {
		let newItem = document.createElement('li');
		var str1 = "background-image: url(";
		var str2 = movie_list[i][3];
		var str3 = ")";
		newItem.setAttribute("style", str1.concat(str2, str3));
		let newItem_text = document.createTextNode(movie_list[i][0]);
		newItem.appendChild(newItem_text);
		if (movie_list[i] == reservation_info[2]) {
			newItem.className = "selected";
		}
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < MovieList.childElementCount; k++) {
				MovieList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info[2] = newItem.textContent;
			document.getElementById("info").value = reservation_info;
			document.getElementById("select_form").submit();
			make_reservation_info(2, "movie_name", reservation_info[2]);

		});
		MovieList.appendChild(newItem);
	}

}

const make_dateList = function () {
	const DateList = document.querySelector("#date-list");
	for (i = 0; i < date_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(date_list[i][2]);
		newItem.appendChild(newItem_text);
		if (date_list[i][2] == reservation_info[3]) {
			newItem.className = "selected";
		}
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < DateList.childElementCount; k++) {
				DateList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info[3] = newItem.textContent;
			document.getElementsByClassName("date").value = reservation_info[3];
			make_reservation_info(3, "date", reservation_info[3]);
			document.getElementById("info").value = reservation_info;
			document.getElementById("select_form").submit();

		});
		DateList.appendChild(newItem);
	}
}

const make_screenList = function (screen_time_list) {
	const ScreenList = document.querySelector("#screen-list");

	let newgroup = document.createElement("ul");
	let newgroup_name = document.createElement("h5");
	let newgroup_name_text = document.createTextNode(screen_time_list[0].screen_no);

	newgroup_name.appendChild(newgroup_name_text);
	newgroup.appendChild(newgroup_name);
	ScreenList.appendChild(newgroup);

	for (let i = 0; i < screen_time_list.length; i++) {

		if (i < screen_time_list.length - 1 && screen_time_list[i].screen_no != screen_time_list[i + 1].screen_no) {
			let newgroup = document.createElement("ul");
			let newgroup_name = document.createElement("h5");
			let newgroup_name_text = document.createTextNode(screen_time_list[i + 1].screen_no);

			newgroup_name.appendChild(newgroup_name_text);
			newgroup.appendChild(newgroup_name);
			ScreenList.appendChild(newgroup);
		}
	}

	for (let i = 0, k = 0; i < screen_time_list.length; i++) {
		const ScreenList = document.querySelectorAll("#screen-list > ul");
		let newgroup = ScreenList[k];

		let newItem = document.createElement("li");
		let startTime = document.createElement("h6");
		let leftedCapcity = document.createElement("h6");
		let startTime_text = document.createTextNode(screen_time_list[i].show_start_time);
		let leftedCapcity_text = document.createTextNode(screen_time_list[i].lefted_seating_capcity);
		startTime.appendChild(startTime_text);
		leftedCapcity.appendChild(leftedCapcity_text);
		newItem.appendChild(startTime);
		newItem.appendChild(leftedCapcity);

		newItem.addEventListener('click', function (event) {
			for (var l = 1, s = 0; s < ScreenList.length; l++) {
				ScreenList[s].children[l].className = "";
				if (l == ScreenList[s].childElementCount - 1) { s++; l = 0; }
			}
			newItem.className = "selected";
			reservation_info[4] = screen_time_list[i].screen_no + "관";
			reservation_info[5] = newItem.children[0].textContent;
			reservation_info[6] = screen_time_list[i].box_office_id;
			document.getElementsByClassName("screen_no").value = reservation_info[4];
			document.getElementsByClassName("show_start_time").value = reservation_info[5];
			make_reservation_info(4, "screen_no", reservation_info[4]);
			make_reservation_info(5, "show_start_time", reservation_info[5]);
			document.getElementById("info").value = reservation_info;
		});

		newgroup.appendChild(newItem);
		if (i < screen_time_list.length - 1 && screen_time_list[i].screen_no != screen_time_list[i + 1].screen_no
		) {
			k++
		}
	}
}
let k = 1;
for (let i = 0; i < region_list.length; i++) {
	if (reservation_info[0] == region_list[i])
		k = i;
}



make_regionList();
make_cinemaList(cinema_list[k]);
make_movieList();
make_dateList();

make_screenList(screen_time_list);
//make_seatChart();

// goPayment.addEventListener('click',()=>{
// 	window.location.href="/payment"
// });

// var first = $("button").val();
// $("button").click(function () {
// 	var first = $(this).val();
// 	alert(first);
// });