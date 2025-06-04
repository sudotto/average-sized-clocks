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

var clock_gems = parseInt(localStorage.clock_gems);
if(!clock_gems){
	clock_gems = 0;
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
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1><p>${time}</p>`;
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
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1><p>${time}</p>`;
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
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1><p>${time}</p>`;
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
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1><p>${time}</p>`;
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
		this.element.innerHTML = `<img class="gif" src="img/${this.img}.gif"></img><h1>${this.name}</h1><p>${time}</p>`;
	}
};
cock.element.addEventListener('click', function() {cock.buy()}, false);

function update_all_clocks(){
	const cc = document.getElementById("clock_coin");
	localStorage.clock_coin = clock_coin;
	if(cc){
		cc.innerHTML = `<div class="tooltip">get these by watching your clocks</div><img src="img/cc.png"></img>Clock Coins: $${clock_coin}`;
	}
	const cg = document.getElementById("clock_gems");
	localStorage.clock_gems = clock_gems;
	if(cg){
		cg.innerHTML = `<div class="tooltip">buy em, or convert from coins</div><img src="img/cg.png"></img>Clock Gems: ${clock_gems}`;
	}
	normal.render();
	epoch.render();
	timezone.render();
	special.render(); 
	cock.render(); 
}

var buy_gems1 = document.getElementById("buy_gems1");
if(buy_gems1){
	buy_gems1.addEventListener('click', function() {
		alert("you didn't really think i'd let you spend real money right?");
	}, false);
}

var buy_gems5 = document.getElementById("buy_gems5");
if(buy_gems1){
	buy_gems5.addEventListener('click', function() {
		alert("you didn't really think i'd let you spend real money right?");
	}, false);
}

var buy_gems10 = document.getElementById("buy_gems10");
if(buy_gems1){
	buy_gems10.addEventListener('click', function() {
		alert("you didn't really think i'd let you spend real money right?");
	}, false);
}

var gem_input = document.getElementById("gem_input");
var coin_input = document.getElementById("coin_input");
if(gem_input && coin_input){
	gem_input.addEventListener('change', function() {
		if(gem_input.value > clock_gems){
			gem_input.value = clock_gems;
		}
		coin_input.value = gem_input.value * 5;
	}, false);
	coin_input.addEventListener('change', function() {
		if(coin_input.value > clock_coin){
			console.log("more");
			coin_input.value = clock_coin;
		}
		gem_input.value = coin_input.value / 5;
	}, false);
}

var claim_gem = document.getElementById("claim_gem");
var claim_coin = document.getElementById("claim_coin");
if(claim_gem && claim_coin){
	claim_gem.addEventListener('click', function() {
		clock_gems += parseInt(gem_input.value);
		clock_coin -= parseInt(coin_input.value);
	}, false);
	claim_coin.addEventListener('click', function() {
		clock_coin += parseInt(coin_input.value);
		clock_gems -= parseInt(gem_input.value);
	}, false);
}

update_all_clocks();

setInterval(update_all_clocks, 1000);
