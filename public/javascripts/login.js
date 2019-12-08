const radio_btn = document.querySelectorAll("input[type='radio']");
const radio_label = document.querySelectorAll("label");
const radio_container = document.querySelectorAll("label .radio");


const handle_radiobtn = function(index){

	radio_container.forEach((element)=>{
		element.classList.remove("checked");
	})
	
	radio_container[index].classList.add("checked");
}

radio_label.forEach((element,index)=>{
	element.addEventListener("click", handle_radiobtn.bind(element,index));
});