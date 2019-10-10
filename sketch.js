var button;
var divs = [];
var seed = [];
var playerOne;
var playerTwo;
var playerOneChars = [];
var playerTwoChars = [];
var playerTypes = "Select One:,Three Characters,Two Characters,Four Characters,Five Characters,Ten Characters";
var names = "Select One:,Grave,Jaina,Geiger,Arg,Setsuki,Valerie,Rook,Midori,Lum,DeGrey,Quince,Onimaru,BBB,Troq,Menelker,Perse,Gloria,Gwen,Vendetta,Zane"
var splitNames;
var splitPlayerTypes;
var seed = 0;
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
	
	seed.push(createDiv('Seed (Type 0 for no seed):'));
	seed.push(createInput('0'));
	


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
		case 'Two Characters':
			SetNumberChars(0,2);
			break;
		case 'Three Characters':
			SetNumberChars(0,3);
			break;
		case 'Four Characters':
			SetNumberChars(0,4);
			break;
		case 'Five Characters':
			SetNumberChars(0,5);
			break;
		case 'Ten Characters':
			SetNumberChars(0,10);
			break;
		default:
			SetNumberChars(0,0);
			break;
	}

	switch(playerTwo.value()){
		case 'Two Characters':
			SetNumberChars(1,2);
			break;
		case 'Three Characters':
			SetNumberChars(1,3);
			break;
		case 'Four Characters':
			SetNumberChars(1,4);
			break;
		case 'Five Characters':
			SetNumberChars(1,5);
			break;
		case 'Ten Characters':
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

