timezones = [
	"GMT",  // UTC±0
	"CET",  // UTC+1
	"EET",  // UTC+2
	"MSK",  // UTC+3
	"YEKT", // UTC+4
	"PKT",  // UTC+5
	"BST",  // UTC+6
	"ICT",  // UTC+7
	"CST",  // UTC+8
	"JST",  // UTC+9
	"AEST", // UTC+10
	"SBT",  // UTC+11
	"NZST", // UTC+12
	"IDLW", // UTC-12
	"NT",   // UTC-11
	"HST",  // UTC-10
	"AKST", // UTC-9
	"PST",  // UTC-8
	"MST",  // UTC-7
	"CST",  // UTC-6
	"EST",  // UTC-5
	"AST",  // UTC-4
	"ART",  // UTC-3
	"GST",  // UTC-2
	"WAT"   // UTC-1
];

var clock_coin = parseInt(localStorage.clock_coin);
if(!clock_coin){
	clock_coin = 0;
}

const normal = {
	name: "Clock",
	img: "clock1",
	element: document.getElementById("normal"),
	price: 0,
	unlocked: true,
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin++;
		const date = new Date();
		const offset = date.getTimezoneOffset();
		var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1>${time}`;
	}
};

const epoch = {
	name: "Uncensored Clock",
	img: "clock4",
	element: document.getElementById("epoch"),
	price: 100,
	unlocked: localStorage.epoch_unlock,
	buy: function() {
		if(clock_coin >= this.price){
			clock_coin -= this.price;
			this.unlocked = true;
			localStorage.epoch_unlock = true;
			alert(`thank you for purchasing ${this.name} for $${this.price}`);
			this.element.removeEventListener('click', function() {this.buy()}, false);
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} for $${this.price}`);
		}
	},
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin++;
		const date = new Date();
		const offset = date.getTimezoneOffset();
		var time = `${date.getTime()}`;
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1>${time}`;
	}
};
epoch.element.addEventListener('click', function() {epoch.buy()}, false);

const timezone = {
	name: "Always 8 Clock",
	img: "clock2",
	element: document.getElementById("timezone"),
	price: 200,
	unlocked: localStorage.timezone_unlock,
	buy: function() {
		if(clock_coin >= this.price){
			clock_coin -= this.price;
			this.unlocked = true;
			localStorage.timezone_unlock = true;
			alert(`thank you for purchasing ${this.name} for $${this.price}`);
			this.element.removeEventListener('click', function() {this.buy()}, false);
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} for $${this.price}`);
		}
	},
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin++;
		const date = new Date();
		const offset = date.getTimezoneOffset();
		var index = (-offset / 60) - 1;
		var time = `${date.getMinutes()}:${date.getSeconds()} (${timezones.at(index + (8 - index))})`;
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1>${time}`;
	}
};
timezone.element.addEventListener('click', function() {timezone.buy()}, false);

const special = {
	name: "Special Clock",
	img: "clock3",
	element: document.getElementById("special"),
	price: 400,
	unlocked: localStorage.special_unlock,
	buy: function() {
		if(clock_coin >= this.price){
			clock_coin -= this.price;
			this.unlocked = true;
			localStorage.special_unlock = true;
			alert(`thank you for purchasing ${this.name} for $${this.price}`);
			this.element.removeEventListener('click', function() {this.buy()}, false);
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} for $${this.price}`);
		}
	},
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin++;
		const date = new Date();
		const offset = date.getTimezoneOffset();
		var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1>${time}`;
	}
};
special.element.addEventListener('click', function() {special.buy()}, false);

const cock = {
	name: "C(l)ock",
	img: "clock4",
	element: document.getElementById("c(l)ock"),
	price: 800,
	unlocked: localStorage.cock_unlock,
	buy: function() {
		if(clock_coin >= this.price){
			clock_coin -= this.price;
			this.unlocked = true;
			localStorage.cock_unlock = true;
			alert(`thank you for purchasing ${this.name} for $${this.price}`);
			this.element.removeEventListener('click', function() {this.buy()}, false);
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} for $${this.price}`);
		}
	},
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin++;
		const date = new Date();
		const offset = date.getTimezoneOffset();
		var shaft = "";
		for(let i = 0; i < date.getHours(); i++){
			shaft += "=";
		}
		var time = `<${shaft}3`;
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1>${time}`;
	}
};
cock.element.addEventListener('click', function() {cock.buy()}, false);

function update_all_clocks(){
	const cc = document.getElementById("clock_coin");
	localStorage.clock_coin = clock_coin;
	if(cc){
		cc.innerHTML = `<img src="img/cc.png"></img>Clock Coins: $${clock_coin}`;
	}
	normal.render();
	epoch.render();
	timezone.render();
	special.render(); 
	cock.render(); 
}

update_all_clocks();

setInterval(update_all_clocks, 1000);
