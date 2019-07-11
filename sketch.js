var button;
var divs = [];
var playerOne;
var playerTwo;
var playerOneChars = [];
var playerTwoChars = [];
var playerTypes = "Select One:,Starter,Linker,Ender,Mixed,Ten";
var names = "Select One:,Grave,Jaina,Geiger,Arg,Setsuki,Valerie,Rook,Midori,Lum,DeGrey"
var splitNames;
var splitPlayerTypes;
function setup(){
	splitNames = split(names, ",");
	splitPlayerTypes = split(playerTypes, ",")


	divs.push(createDiv('Team 1'));
	playerOne = PlayerSelect();
	playerOne.parent(divs[0]);

	divs.push(createDiv('Characters'));

	divs.push(createElement("br"));

	divs.push(createDiv('Team 2'));
	playerTwo = PlayerSelect();
	playerTwo.parent(divs[3]);

	divs.push(createDiv('Characters'));


	button = createButton('START GAME');
	button.mousePressed(startGame);
	button.hide();
}

function draw(){
	
}

function PlayerSelect(){
	var player = createSelect();
	for(var i = 0; i<splitPlayerTypes.length; i++){
		player.option(splitPlayerTypes[i]);
	}
	player.changed(UpdatePlayers);
	return player;
}

function CharacterSelect(player){
	var character = createSelect();
	for(var i = 0; i<splitNames.length; i++){
		character.option(splitNames[i]);
	}
	character.changed(UpdateCharacters);
	character.parent(player)
	return character;
}

function SetNumberChars(player, number){
	if(player == 0){
		if(playerOneChars.length == number){
			return;
		}
		for(var i=playerOneChars.length-1; i>=0; i--){
			playerOneChars[i].remove();
			playerOneChars.pop();
		}
		for(var i=0; i<number; i++){
			var x = CharacterSelect(divs[1]);
			playerOneChars.push(x);
		}
	}else{
		if(playerTwoChars.length == number){
			return;
		}
		for(var i=playerTwoChars.length-1; i>=0; i--){
			playerTwoChars[i].remove();
			playerTwoChars.pop();
		}
		for(var i=0; i<number; i++){
			var x = CharacterSelect(divs[4]);
			playerTwoChars.push(x);
		}
	}
	
}

function UpdatePlayers(){
	print("Updating Players")
	switch(playerOne.value()){
		case 'Starter':
			SetNumberChars(0,2);
			break;
		case 'Linker':
			SetNumberChars(0,3);
			break;
		case 'Ender':
			SetNumberChars(0,4);
			break;
		case 'Mixed':
			SetNumberChars(0,3);
			break;
		case 'Ten':
			SetNumberChars(0,10);
			break;
		default:
			SetNumberChars(0,0);
			break;
	}

	switch(playerTwo.value()){
		case 'Starter':
			SetNumberChars(1,2);
			break;
		case 'Linker':
			SetNumberChars(1,3);
			break;
		case 'Ender':
			SetNumberChars(1,4);
			break;
		case 'Mixed':
			SetNumberChars(1,3);
			break;
		case 'Ten':
			SetNumberChars(1,10);
			break;
		default:
			SetNumberChars(1,0);
			break;
	}
}

function UpdateCharacters(){
	print("Updating Characters");
	if(playerOneChars.length != 0 && playerTwoChars.length != 0){
		var allSelected = true;
		for(var i = 0; i < playerOneChars.length && allSelected; i++){
			if(playerOneChars[i].value() == 'Select One:'){
				allSelected = false;
			}
		}
		for(var i = 0; i < playerTwoChars.length && allSelected; i++){
			if(playerTwoChars[i].value() == 'Select One:'){
				allSelected = false;
			}
		}
		if(allSelected){
			button.show();
		}else{
			button.hide();
		}
	}
}

