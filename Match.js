var playerOneTeam = [];
var playerTwoTeam = [];
var playerOneTeamRemaining = [];
var playerTwoTeamRemaining = [];
var playerOneLosses = [];
var playerTwoLosses = [];
var button1;
var button2;
var charOne;
var charTwo;
var currentMatch = [];
var confirmButton;

function startGame(){
	try{
		seed = parseInt(seedBoxes.text);
	}catch{
		seed = 0;
	}
	if(seed != 0){
		randomSeed(seed);
	}
	for(var i = 0; i < playerOneChars.length; i++){
		playerOneTeam.push(playerOneChars[i].value());
	}
	
	for(var i = 0; i < playerTwoChars.length; i++){
		playerTwoTeam.push(playerTwoChars[i].value());
	}

	for(var i=divs.length-1; i>=0; i--){
		divs[i].remove();
		divs.pop();
	}

	for(var i=playerOneChars.length-1; i>=0; i--){
		playerOneChars[i].remove();
		playerOneChars.pop();
	}

	for(var i=playerTwoChars.length-1; i>=0; i--){
		playerTwoChars[i].remove();
		playerTwoChars.pop();
	}
	button.remove();

	var teamOneText = "Team 1:";
	for(var i = 0; i < playerOneTeam.length; i++){
		teamOneText += " " + playerOneTeam[i];
	}

	divs.push(createDiv(teamOneText));

	var teamTwoText = "Team 2:";
	for(var i = 0; i < playerTwoTeam.length; i++){
		teamTwoText += " " + playerTwoTeam[i];
	}
	
	divs.push(createDiv(teamTwoText));

	divs.push(createElement("br"));

	playerOneTeamRemaining = playerOneTeam;
	playerTwoTeamRemaining = playerTwoTeam;

	confirmButton = createButton("Confirm");
	confirmButton.mousePressed(confirm);
	
	addMatch();
}

function addMatch(){
	currentMatch = [];

	charOne = random(playerOneTeamRemaining);
	charTwo = random(playerTwoTeamRemaining);
	print(charOne + " vs. " + charTwo)

	var c = createDiv(""); 
	currentMatch.push(c);

	var temp1 = createSpan(charOne + " vs. " + charTwo);
	temp1.parent(c);

	var temp2 = createSelect();
	temp2.option("Who Won?");
	temp2.option(charOne + "(Team 1)");
	temp2.option(charTwo + "(Team 2)");
	temp2.changed(matchUpdate);
	temp2.parent(c);
	

	
	confirmButton.parent(c);
	confirmButton.hide();
}

function matchUpdate(){
	if(this.value() != "Who Won?"){
		confirmButton.show();
		confirmButton.sibling = this;
	}else{
		confirmButton.hide();
	}
}

function confirm(){
	if(this.sibling.value() == charOne + "(Team 1)"){
		playerOneTeamRemaining.remove(charOne);
		playerTwoTeamRemaining.remove(charTwo);
		playerTwoLosses.push(charTwo);
	}else if(this.sibling.value() == charTwo + "(Team 2)"){
		playerOneTeamRemaining.remove(charOne);
		playerTwoTeamRemaining.remove(charTwo);
		playerOneLosses.push(charOne);
	}else{
		print("error");
	}

	var temp = createSpan("      Winner: " + this.sibling.value());
	temp.parent(this.sibling.parent());

	this.sibling.remove();

	if(playerOneTeamRemaining.length == 0){
		playerOneTeamRemaining = playerOneLosses;
	}
	if(playerTwoTeamRemaining.length == 0){
		playerTwoTeamRemaining = playerTwoLosses;
	}

	if(playerOneTeamRemaining.length == 0){
		confirmButton.hide();
		var temp = createDiv("Team 1 Wins!");
	}else if(playerTwoTeamRemaining.length == 0){
		confirmButton.hide();
		var temp = createDiv("Team 2 Wins!");
	}else{
		addMatch();
	}
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
