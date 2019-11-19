const seats = [
	[1,1,0,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
	[1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1]
];	

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

make_seatChart();