// Data

let reservation_info = {
	headcount : 2,
	
	d :[
	{	person_type : "일반", seat_type: "일반석"}
		]
}
mem1=mem.split(",");
console.log(mem1)
let tickets_price = parseInt(mem1[0])*7000 + parseInt(mem1[1])*10000+parseInt(mem1)*5000;

let Payment_status = {
	payment_no : 1,
	payment_breakdown : "온라인구매",
	payment_method : null,
	payment_amount : tickets_price,
	discounts : 0
};


//Element Ref

let CouponList = document.querySelectorAll("#Coupon-list  input");
let Payment = document.querySelectorAll("#Payment");
let price = document.querySelector("#price");
let discounts = document.querySelector("#discounts");
let total_price = document.querySelector("#total_price");


const make_CouponList = function(){
	const CouponList = document.querySelector("#Coupon-list");
	if(coupon == null){
		CouponList.appendChild(document.createElement(document.createTextNode("보유하신 쿠폰이 없습니다")));
	}
	for(var i=0;i<coupon.length;i++){
		const newCoupon = document.createElement("li");
		const newCoupon_label = document.createElement("label");
		const newCoupon_input= document.createElement("input");
		newCoupon_input.setAttribute("type","checkbox");
		const newCoupon_name= document.createElement("h5");
		const newCoupon_discounts = document.createElement("h5");
		const newCoupon_expiredate= document.createElement("h5");

		newCoupon_name.classList.add("coupon_name");
		newCoupon_discounts.classList.add("coupon_discounts");
		newCoupon_expiredate.classList.add("coupon_expireDate");
		var newCoupon_discountsText ;
		var newCoupon_nameText = document.createTextNode("할인쿠폰");
		var newCoupon_expiredateText = document.createTextNode(coupon[i][2].split("T")[0]);
		if(coupon[i][0]=='price'){
		newCoupon_input.setAttribute("value", coupon[i][1]);
		 newCoupon_discountsText = document.createTextNode(coupon[i][1]);
		}else{
			if(coupon[i][1]==100){
				newCoupon_nameText = document.createTextNode("무료쿠폰");
				newCoupon_input.setAttribute("value", "!");
				newCoupon_discountsText = document.createTextNode("");
			}else{
			str = String(coupon[i][1]);
			str=str.concat("%","");
			newCoupon_input.setAttribute("value", str);
		newCoupon_discountsText = document.createTextNode(str);
			}
		}
		newCoupon_input.setAttribute("value",coupon[i][0].concat('-',coupon[i][1]).concat("-",coupon[i][3]) );

		newCoupon_name.appendChild(newCoupon_nameText);
		newCoupon_discounts.appendChild(newCoupon_discountsText);
		newCoupon_expiredate.appendChild(newCoupon_expiredateText);

		newCoupon_label.appendChild(newCoupon_input);
		newCoupon_label.appendChild(newCoupon_name);
		newCoupon_label.appendChild(newCoupon_discounts);
		newCoupon_label.appendChild(newCoupon_expiredate);
		newCoupon.appendChild(newCoupon_label);
		CouponList.appendChild(newCoupon);
	};
}

const change_Payment = function(){
	const price = document.querySelector("#price");
	const discounts = document.querySelector("#discounts");
	const total_price = document.querySelector("#total_price");

	price.innerHTML = tickets_price;
	discounts.innerHTML = Payment_status.discounts;
	total_price.innerHTML = Payment_status.payment_amount;
	document.getElementById("amount").value = Payment_status.payment_amount;

};


const change_PaymentStatus = function(){
	var a =0;
	if(this.checked==true) a = 1
	var list = document.getElementById("Coupon-list");
	for(let i = 1 ; i <list.childElementCount ;i++){
	list.children[i].children[0].children[0].checked=false;
	}
	if(a==1) this.checked=true;
	else this.checked=false;
	str = this.value.split("-")
	if(this.checked == true){	
		if(str[0]=='price')	Payment_status.discounts  = parseInt(str[1]);
			else Payment_status.discounts  = tickets_price*parseInt(str[1])/100;
		Payment_status.payment_amount = tickets_price - Payment_status.discounts;
		document.getElementById("coupon_id").value = str[2];

	} else {
		Payment_status.discounts  = 0;
		Payment_status.payment_amount = tickets_price ;
	}
	change_Payment();
};

make_CouponList();
change_Payment();

CouponList = document.querySelectorAll("#Coupon-list  input");

CouponList.forEach((element)=>{
	element.addEventListener('click',change_PaymentStatus.bind(element));
})
function check() {
	
	  alert("완료되었습니다.");
	
  
  }

