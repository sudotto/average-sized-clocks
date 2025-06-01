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

function update_clock(name){
	const date = new Date();
	const offset = date.getTimezoneOffset();
	const clock = document.getElementById(name);
	var time = "broken";

	if(name == "normal"){
		time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	} else if(name == "epoch"){
		time = `${date.getTime()}`
	} else if(name == "timezone"){
		var index = (-offset / 60) - 1;
		time = `8:${date.getMinutes()}:${date.getSeconds()} (${timezones.at(index + (8 - index))})`;
	} else if(name == "special"){
		time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	} else if(name == "c(l)ock"){
		var shaft = "";
		for(let i = 0; i < date.getHours(); i++){
			shaft += "=";
		}
		time = `<${shaft}3`;
	}

	if(clock){
		clock.innerHTML = `${time}`;
	}
}

function update_all_clocks(){
	update_clock("normal");
	update_clock("epoch");
	update_clock("timezone");
	update_clock("special");
	update_clock("c(l)ock");
}

update_all_clocks();

setInterval(update_all_clocks, 1000);
