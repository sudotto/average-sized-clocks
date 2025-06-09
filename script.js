var nuked = localStorage.nuked;
if(!nuked){
	nuked = "f";
}
if(nuked == "t"){
	const all_elems = document.body.getElementsByTagName('*');
	const bg = document.getElementById("bg");
	bg.style.backgroundImage = 'url("img/warning.gif")';
	for(let i = 0; i < all_elems.length; i++){
		all_elems[i].style.filter = "grayscale(1) brightness(0.4)";
		if(all_elems[i] != bg){
			all_elems[i].style.transform = `rotate(${Math.floor(Math.random() * 90)}deg)`;
		}
	}
}

function big_boom(){
	let darkness = 10;
	let desat = 0;
	let intensity = 0;
	const all_elems = document.body.getElementsByTagName('*');
	const bg = document.getElementById("bg");
	bg.style.backgroundImage = 'url("img/warning.gif")';
	const alarm = new Audio('aud/alarm.mp3');
	alarm.play();
	setTimeout(() => {
		alarm.pause();
		const ringing = new Audio('aud/ringing.mp3');
		ringing.play();

		let soot_interval = setInterval(() => {
			darkness -= 0.4;
			desat += 0.05;
			intensity += 1;
			for(let i = 0; i < all_elems.length; i++){
				if(all_elems[i].className != "explosion"){
					all_elems[i].style.filter = `grayscale(${desat}) brightness(${darkness})`;
					if(all_elems[i] != bg){
						all_elems[i].style.transform = `rotate(${Math.floor(Math.random() * intensity)}deg)`;
					}
				}
			}
		}, 100);
		setTimeout(() => {
			clearInterval(soot_interval);
		}, 3000);

		let boom_interval = setInterval(spawn_explosion, 100);
		setTimeout(() => {
			clearInterval(boom_interval);
		}, 3000);
	}, 10000);
}


function spawn_explosion() {
	const img = document.createElement("img");
	const audio = new Audio('aud/boom.mp3');
	img.src = "img/boom.gif";
	img.className = "explosion";
	img.style.top = `${Math.floor(Math.random() * (document.documentElement.offsetHeight - 0 + 1)) + 0}px`;
	img.style.left = `${Math.floor(Math.random() * (document.documentElement.offsetWidth - 0 + 1)) + 0}px`;
	img.style.filter = ``;
	img.width = `${Math.floor(Math.random() * 500)}`

	document.body.appendChild(img);
	audio.play();

	requestAnimationFrame(() => {
		img.style.opacity = 1;
	});

	setTimeout(() => {
		img.style.opacity = 0;
		setTimeout(() => img.remove(), 1000);
	}, 2000 + Math.random() * 1000);
}

var clock_coin = parseInt(localStorage.clock_coin);
if(!clock_coin){
	clock_coin = 0;
}

var clock_gems = parseInt(localStorage.clock_gems);
if(!clock_gems){
	clock_gems = 0;
}

const ad_list = document.getElementsByClassName("ad");
const ad_count = 7;
var rand = Math.floor(Math.random() * (ad_count - 0 + 1)) + 0;
for(let i = 0; i < ad_list.length; i++){
	if(rand + i > ad_count){
		rand = 0;
	}
	ad_list[i].src = `img/ad${rand + i}.png`;
}

var coin_mod = parseInt(localStorage.coin_mod);
if(!coin_mod){
	coin_mod = 1;
}

const x2_coin = {
	element: document.getElementById("2x_coin"),
	name: "2x Coin Multiplier",
	price: 100 * coin_mod,
	level: coin_mod,
	buy: function() {
		if(clock_gems >= this.price){
			clock_gems -= this.price;
			coin_mod *= 2;
			this.price = 100 * coin_mod;
			this.level = coin_mod;
			localStorage.coin_mod = coin_mod;
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} (x${coin_mod} Coins/sec) for ${this.price} Gems`);
		}
	},
	render: function() {
		if(coin_mod == 1){
			this.element.innerHTML = `<h1>${this.name} (x${coin_mod} Coins/sec)</h1>Unlock for ${this.price} Gems`;
		} else {
			this.element.innerHTML = `<h1>${this.name} (x${coin_mod} Coins/sec)</h1>Upgrade for ${this.price} Gems`;
		}
	}
};
x2_coin.element.addEventListener('click', function() {x2_coin.buy()}, false);


const nuke = {
	element: document.getElementById("nuke_website"),
	name: "Nuke Website",
	price: 1000,
	buy: function(){
		if(nuked == "t"){
			return;
		}
		if(clock_gems >= this.price){
			clock_gems -= this.price;
			alert("you are doing the world a favor");
			nuked = "t";
			localStorage.nuked = "t";
			big_boom();
		} else {
			alert(`insufficient funds, cannot purchase ${this.name} for ${this.price} Gems`);
		}
	},
	render: function() {
		this.element.innerHTML = `<h1>${this.name}</h1>Nuke Website for ${this.price} Gems`;
	}
};
nuke.element.addEventListener('click', function() {nuke.buy()}, false);

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

const normal = {
	name: "Clock",
	img: "clock1",
	element: document.getElementById("normal"),
	price: 0,
	coin_product: 1,
	unlocked: true,
	render: function() {
		if(!this.unlocked){
			this.element.innerHTML = `<img class="gif" src="img/clock_lock.png"></img><h1>${this.name}</h1>Unlock for $${this.price}`;
			return;
		}
		clock_coin += this.coin_product * coin_mod;
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
	coin_product: 2,
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
		clock_coin += this.coin_product * coin_mod;
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
	coin_product: 3,
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
		clock_coin += this.coin_product * coin_mod;
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
	coin_product: 4,
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
		clock_coin += this.coin_product * coin_mod;
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
	coin_product: 5,
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
		clock_coin += this.coin_product * coin_mod;
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
	if(nuked == "t"){
		return;
	}
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
	
	x2_coin.render();
	nuke.render();
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
		if(gem_input.value > 0 && coin_input.value > 0){
			clock_gems += parseInt(gem_input.value);
			clock_coin -= parseInt(coin_input.value);
		} else {
			alert("nice try with the negative value");
		}
	}, false);
	claim_coin.addEventListener('click', function() {
		if(gem_input.value > 0 && coin_input.value > 0){
			clock_coin += parseInt(coin_input.value);
			clock_gems -= parseInt(gem_input.value);
		} else {
			alert("nice try with the negative value");
		}
	}, false);
}

update_all_clocks();

//big_boom();

setInterval(update_all_clocks, 1000);
