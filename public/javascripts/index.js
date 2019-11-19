

const Menu_icon = document.querySelector("#menu_icon");



const toggle_menu = function(event) {
	const Menu = document.querySelector("#menu");
	const Nav = document.querySelector('#Nav');
	const Login = document.querySelector('#login');
	const Content = document	.querySelector('#Content');
	const login = document.querySelector("#login");


	if (Menu.classList.contains("hidden")){
		setTimeout(()=>{
			Menu.classList.remove("hidden");
			Login.classList.add("menuOn");
			Content.classList.add("menuOn");
			Nav.classList.add("menuOn");
		},300);
	} else{
		setTimeout(()=>{
			Menu.classList.add("hidden");
			Nav.classList.remove("menuOn");
			Content.classList.remove("menuOn");
			Login.classList.remove("menuOn");
		})
	}

};


Menu_icon.addEventListener('click',toggle_menu);

login.addEventListener('click',()=>{
	window.location.href="/login";		
});
