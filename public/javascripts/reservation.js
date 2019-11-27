//Data
const seats = [
	[1,1,0,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
	[1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1]
];	

<<<<<<< Updated upstream
const seats2 =[
	[1,1,1,1,0,0,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,9,0,0,0,1,1,1,1],

];	
=======
// const seats2 =[
// 	[1,1,1,1,0,0,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,1,1,1,1,1],
// 	[1,1,1,1,9,0,0,0,1,1,1,1],

// ];	

>>>>>>> Stashed changes
const region = ["서울","경기","인천","강원","대전/충청","대구","부산/울산","경상","광주/전라/제주"];

const branch_list1 = [ "강남", "강변", " 건대입구", "구로", "대학로", "동대문", "등촌", "명동", "목동", "미아", "불광", "상봉", "성신여대입구", "수유", "신촌아트레온", "압구정", "여의도", "영등포", "왕십리", "용산아이파크몰", "중계", "천호", "청담씨네시티", "피카디리1958", "하계", "홍대"
];

const branch_list2 = ["계양", "남주안", "부평", "연수역", "인천", "인천공항", "인천논현", "인천연수", "주안역", "천라"
];

const movie_list1 = ["겨울왕국2", "나를찾아줘", "블랙머니", "러브앳", "윤희에게", "신의한수-귀수편", "터미네이터-다크페이터"];

const date_list = [26,27,28,29,30];

const screen_time_list =[
	{ screen_no : 1, show_start_time : "10:55", lefted_seating_capcity : 196},
	{ screen_no : 2, show_start_time : "09:50", lefted_seating_capcity : 195, etc : "조조"},
	{ screen_no : 2, show_start_time : "12:10", lefted_seating_capcity : 191},
	{ screen_no : 2, show_start_time : "14:25", lefted_seating_capcity : 201},
	{ screen_no : 2, show_start_time : "18:50", lefted_seating_capcity : 202},
	{ screen_no : 2, show_start_time : "21:05", lefted_seating_capcity : 204},
	{ screen_no : 2, show_start_time : "23:20", lefted_seating_capcity : 212},
	{ screen_no : 3, show_start_time : "18:20", lefted_seating_capcity : 162},
	{ screen_no : 3, show_start_time : "22:30", lefted_seating_capcity : 162, etc : "심야"}
 ];
	

const make_seatChart = function(){
	const SeatChart = document.querySelector('#SeatChart');
	for(i=0;i<seats.length;i++){
		let newRow = document.createElement('div');
		newRow.classList.add('seat-row');
		SeatChart.appendChild(newRow);
		for(j=0;j<seats[i].length;j++){
			let newSeat = document.createElement('div');
			let newSeatText = document.createTextNode(" ");
			newSeat.appendChild(newSeatText);
			if(seats[i][j] == 1){
				newSeat.classList.add('seat');
				newRow.appendChild(newSeat);
			}
			else{
				newSeat.classList.add('empty_seat');
				newRow.appendChild(newSeat);				
			}
		}
	}	
}

const make_cinemaList = function(){
	const CinemaList = document.querySelector("#cinema-list");
	for(i=0;i<branch_list1.length;i++){
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(branch_list1[i]);
		newItem.appendChild(newItem_text);
		CinemaList.appendChild(newItem);
	}
}

const make_movieList = function(){
	const MovieList = document.querySelector("#movie-list");
	for(i=0;i<movie_list1.length;i++){
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(movie_list1[i]);
		newItem.appendChild(newItem_text);
		MovieList.appendChild(newItem);
	}
}

const make_dateList = function(){
	const DateList = document.querySelector("#date-list");
	for(i=0;i<date_list.length;i++){
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(date_list[i]);
		newItem.appendChild(newItem_text);
		DateList.appendChild(newItem);
	}
}

const make_screenList = function(){
	const ScreenList = document.querySelector("#screen-list");


		let newgroup = document.createElement("ul");
		let newgroup_name = document.createElement("h5");
		let newgroup_name_text = document.createTextNode(screen_time_list[0].screen_no);

		newgroup_name.appendChild(newgroup_name_text);
		newgroup.appendChild(newgroup_name);
		ScreenList.appendChild(newgroup);

	for(let i= 0; i<screen_time_list.length;i++){

		if( i<screen_time_list.length-1 && screen_time_list[i].screen_no !=  screen_time_list[i+1].screen_no){
			let newgroup = document.createElement("ul");
			let newgroup_name = document.createElement("h5");
			let newgroup_name_text = document.createTextNode(screen_time_list[i+1].screen_no);

			newgroup_name.appendChild(newgroup_name_text);
			newgroup.appendChild(newgroup_name);
			ScreenList.appendChild(newgroup);
		}	
	}

	for(let i= 0,k =0; i<screen_time_list.length;i++){
		const ScreenList = document.querySelectorAll("#screen-list > ul");
		let newgroup=  ScreenList[k];

			let newItem = document.createElement("li");
			let startTime = document.createElement("h6");
			let leftedCapcity = document.createElement("h6");
			let startTime_text = document.createTextNode(screen_time_list[i].show_start_time);
			let leftedCapcity_text = document.createTextNode(screen_time_list[i].lefted_seating_capcity);
			startTime.appendChild(startTime_text);
			leftedCapcity.appendChild(leftedCapcity_text);
			newItem.appendChild(startTime);
			newItem.appendChild(leftedCapcity);
			newgroup.appendChild(newItem);		
		if( i<screen_time_list.length-1 && screen_time_list[i].screen_no != screen_time_list[i+1].screen_no
			){
			k++
		}
	}
}

make_cinemaList();
make_movieList();
make_dateList();
make_screenList();
make_seatChart();
