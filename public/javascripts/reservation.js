var screen_time_list;
if (typeof screen_list !== "undefined") {
	if (screen_list != null) {
		var screen_time_list = Array.from(Array(screen_list.length), () => Array());
		for (let i = 0; i < screen_list.length; i++) {
			obj = new Object();
			obj.box_office_id = screen_list[i][0];
			start_time = screen_list[i][1].split(':');
			start_time = start_time[0].concat(':', start_time[1]);
			obj.show_start_time = start_time;
			left = 0;
			tot = 0;
			obj.screen_no = screen_list[i][2];
			seats = screen_list[i][3];
			for (let j = 0; j < seats.length; j++) {
				for (let k = 0; k < seats[j].length; k++) {
					if (seats[j][k] > 0) tot++;
					if (seats[j][k] == 1) left++;
				}
			}
			obj.lefted_seating_capcity = String(left).concat("/", tot);
			screen_time_list[i] = obj;
		}
	}
}


//Element ref
const goPayment = document.querySelector("#goPayment");
function check() {
	if(fr.info_m.value == "") {
	  alert("인원수 선택하세요");
	  return false;
	}else if( seat_list.length!= mem_ayp[0]+mem_ayp[1]+mem_ayp[2]) {
		alert("인원수만큼 좌석 선택 하세요");
	return false;

	}else {return true;}
  
  }
  
const make_seatChart = function (seats) {
	const SeatChart = document.querySelector('#SeatChart');
	for (i = 0; i < seats.length; i++) {
		let newRow = document.createElement('div');
		newRow.classList.add('seat-row');
		SeatChart.appendChild(newRow);
		let newSeat = document.createElement('div');
		let newSeatText = document.createTextNode(String.fromCharCode(65 + i));
		newSeat.appendChild(newSeatText);
		newSeat.classList.add('empty_seat')
		newRow.appendChild(newSeat);
		for (j = 0; j < seats[i].length; j++) {
			let newSeat = document.createElement('div');
			let newSeatText;
			if (seats[i][j] == 1) {
				newSeatText = document.createTextNode(j+1);
				newSeat.classList.add('seat');
				newRow.appendChild(newSeat);
				newSeat.addEventListener('click', function (event) {
						newSeat.classList.toggle("select_seat");
						var str1 = newSeat.parentNode.children[0].textContent;
						var str2 = newSeat.textContent;
						var str = "".concat("",str1.concat("-", str2))
						var s = 0;
						for (let k = 0; k < seat_list.length; k++) {
							if (seat_list[k] == str) {
								seat_list.splice(seat_list.indexOf(str), 1);
								s = 1;
							}
						}
						if (s == 0) seat_list.push(str)
						if (mem_ayp[0] + mem_ayp[1] + mem_ayp[2] < seat_list.length) {
							newSeat.className = "seat";
							seat_list.pop();
						}
					
					text = document.createTextNode(seat_list);
					seat_list.sort();
					document.getElementById("seats_info").textContent ="seats: "+ seat_list;
					document.getElementById("info_s").value = seat_list ;
					

				});

			}
			else if (seats[i][j] == 2) {
				newSeatText = document.createTextNode(j);
				newSeat.classList.add('seat');
				newSeat.classList.add('disable');
				newRow.appendChild(newSeat);
			}
			else {
				newSeatText = document.createTextNode(" ");
				newSeat.classList.add('empty_seat');
				newRow.appendChild(newSeat);
			}
			newSeat.appendChild(newSeatText);
		}
		newSeat = document.createElement('div');
		newSeatText = document.createTextNode(" ");
		newSeat.appendChild(newSeatText);
		newSeat.classList.add('empty_seat')
		newRow.appendChild(newSeat);
	}
}

const make_memset = function () {
	const mem = document.getElementsByClassName("memset");
	for (j = 0; j < 3; j++) {
		for (i = 0; i <= 8; i++) {
			let newItem = document.createElement('li');
			let newItem_text = document.createTextNode(i);
			newItem.appendChild(newItem_text);
			if (i == 0) {
				newItem.className = "selected"
			}
			newItem.addEventListener('click', function (event) {
				for (var k = 1; k <= 9; k++) {
					newItem.parentNode.children[k].className = "";
				}
				newItem.className = "selected";

				if (newItem.parentNode.children[0].textContent == "일반") {
					mem_ayp[0] = parseInt(newItem.textContent);
				} else if (newItem.parentNode.children[0].textContent == "청소년") {
					mem_ayp[1] = parseInt(newItem.textContent);
				} else {
					mem_ayp[2] = parseInt(newItem.textContent);
				}
				document.getElementById("info_m").value = mem_ayp;
			});
			mem[j].appendChild(newItem);
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
	document.getElementById("info").value = reservation_info;
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
			reservation_info[6] = '';
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
			reservation_info[6] = '';
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

// const make_reservation_info = function (i, textContent, info) {
// 	const Info = document.querySelector("#reservation_info");
// 	Info.children[i].children[0].textContent = textContent + ": " + info;
// }

const make_movieList = function () {
	const MovieList = document.querySelector("#movie-list");
	for (i = 0; i < movie_list.length; i++) {
		let newItem = document.createElement('li');
		var str1 = "background-image: url(";
		var str2 = movie_list[i][3];
		var str3 = ")";
		newItem.setAttribute("style", str1.concat(str2, str3));
		let newItem_text = document.createTextNode(movie_list[i][0]);
		if (movie_list[i] == reservation_info[2]) {
			newItem.className = "selected";
		}

		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < MovieList.childElementCount; k++) {
				MovieList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info[2] = newItem_text.textContent;
			reservation_info[6] = '';
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
		// let result = newItem_text.concat("," + date_list[i][0]);
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
			reservation_info[6] = '';
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
		leftedCapcity.classList.add('left');
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

const make_dayList = function () {
	const MonthList = document.querySelector("#day-list");
	for (i = 0; i < date_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(date_list[i][0]);
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
			reservation_info[6] = '';
			document.getElementsByClassName("date").value = reservation_info[3];
			make_reservation_info(3, "date", reservation_info[3]);
			document.getElementById("info").value = reservation_info;
			document.getElementById("select_form").submit();

		});
		DateList.appendChild(newItem);
	}
}
// const make_monthList = function (month_list) {
// 	const ScreenList = document.querySelector("#month-list");

// 	let newgroup = document.createElement("ul");
// 	let newgroup_name = document.createElement("h4");
// 	let newgroup_name_text = document.createTextNode(date_list);

// 	newgroup_name.appendChild(newgroup_name_text);
// 	newgroup.appendChild(newgroup_name);
// 	ScreenList.appendChild(newgroup);

// 	for (let i = 0; i < screen_time_list.length; i++) {

// 		if (i < screen_time_list.length - 1 && screen_time_list[i].screen_no != screen_time_list[i + 1].screen_no) {
// 			let newgroup = document.createElement("ul");
// 			let newgroup_name = document.createElement("h5");
// 			let newgroup_name_text = document.createTextNode(screen_time_list[i + 1].screen_no);

// 			newgroup_name.appendChild(newgroup_name_text);
// 			newgroup.appendChild(newgroup_name);
// 			ScreenList.appendChild(newgroup);
// 		}
// 	}

// 	for (let i = 0, k = 0; i < screen_time_list.length; i++) {
// 		const ScreenList = document.querySelectorAll("#screen-list > ul");
// 		let newgroup = ScreenList[k];

// 		let newItem = document.createElement("li");
// 		let startTime = document.createElement("h6");
// 		let leftedCapcity = document.createElement("h6");
// 		leftedCapcity.classList.add('left');
// 		let startTime_text = document.createTextNode(screen_time_list[i].show_start_time);
// 		let leftedCapcity_text = document.createTextNode(screen_time_list[i].lefted_seating_capcity);
// 		startTime.appendChild(startTime_text);
// 		leftedCapcity.appendChild(leftedCapcity_text);
// 		newItem.appendChild(startTime);
// 		newItem.appendChild(leftedCapcity);

// 		newItem.addEventListener('click', function (event) {
// 			for (var l = 1, s = 0; s < ScreenList.length; l++) {
// 				ScreenList[s].children[l].className = "";
// 				if (l == ScreenList[s].childElementCount - 1) { s++; l = 0; }
// 			}
// 			newItem.className = "selected";
// 			reservation_info[4] = screen_time_list[i].screen_no + "관";
// 			reservation_info[5] = newItem.children[0].textContent;
// 			reservation_info[6] = screen_time_list[i].box_office_id;
// 			document.getElementsByClassName("screen_no").value = reservation_info[4];
// 			document.getElementsByClassName("show_start_time").value = reservation_info[5];
// 			make_reservation_info(4, "screen_no", reservation_info[4]);
// 			make_reservation_info(5, "show_start_time", reservation_info[5]);
// 			document.getElementById("info").value = reservation_info;
// 		});

// 		newgroup.appendChild(newItem);
// 		if (i < screen_time_list.length - 1 && screen_time_list[i].screen_no != screen_time_list[i + 1].screen_no
// 		) {
// 			k++
// 		}
// 	}
// }
let k = 1;
if (typeof region_list !== "undefined") {
	for (let i = 0; i < region_list.length; i++) {
		if (reservation_info[0] == region_list[i])
			k = i;
	}

	make_regionList();
	make_cinemaList(cinema_list[k]);
	make_movieList();
	make_dateList();

	make_screenList(screen_time_list);
} else {
	document.getElementById("info_b").value = reservation_info[6];

	var seat_list = new Array();
	var mem_ayp = [0, 0, 0];
	make_seatChart(reserv_seats);
	make_memset();


}
// goPayment.addEventListener('click',()=>{
// 	window.location.href="/payment"
// });

// var first = $("button").val();
// $("button").click(function () {
// 	var first = $(this).val();
// 	alert(first);
// });
