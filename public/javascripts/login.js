const radio_btn = document.querySelectorAll("input[type='radio']");
const radio_label = document.querySelectorAll("label");
const radio_input = document.querySelectorAll("input.radio")
const radio_container = document.querySelectorAll("label >.radio");


const handle_radiobtn = function(index){

	radio_container.forEach((element)=>{
		element.classList.remove("checked");
	})
	
	radio_container[index].classList.add("checked");
}

const handle_input = function(index){
	radio_btn[index].checked = true;
	radio_container.forEach((element)=>{
		element.classList.remove("checked");
	})
	
	radio_container[index].classList.add("checked");	
}


radio_label.forEach((element,index)=>{
	element.addEventListener("click", handle_radiobtn.bind(element,index));
});

radio_input.forEach((element,index)=>{
	element.addEventListener("input",handle_input.bind(element,index));
})