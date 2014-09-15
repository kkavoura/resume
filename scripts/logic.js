
  //**********************************************************************//
 // OBJECT CONSTRUCTORS                                                  //
//**********************************************************************//

function Dice(){
	if(!(this instanceof Dice)) {
		return new Dice();
	}
	var value = 0;
	var held = false;
	
	this.isHeld = function(){
		return held;
	}
	
	this.getValue = function(){
		return value;
	}
	
	this.setValue = function(newValue){
		value = newValue;		
	}
	
	this.toggleHeld = function(){
		held = !(held);
	}

}



function Category(){
	var description = "";
	var currentScore = 0;
	var scored = false;	
	
	this.getScore = function(){
		return currentScore;
	}
	
	this.setScore = function(newScore){
		currentScore += newScore;
		scored = true;
		rollCounter=0;
		console.log("Score was set to ", newScore);
	}
	
	this.setDescription = function(description_text){
		description = description_text;
	}
	
	this.getDescription = function(){
		return description;
	}
	
	this.isAlreadyScored = function(){
		return scored;
	}

}

function Game(){
	var isOver= false;
	var finalScore = 0;
	
	this.getIsOver = function(){
		return isOver;
	}
	
	this.setIsOver = function(){
		isOver = checkCompletion();
	}
	
}



  //*****************************************************************************// 
 //									FUNCTIONS									//
//*****************************************************************************//


//Produces 5 random numbers between 1-6 and assigns them to their respective dice
//if they are not currently being held. Dice that are being held do not have their 
//value changed
function roll(){
	if(rollCounter!=0 && rollCounter%3===0){
		console.log("Cannot roll again!");
		alert("You cannot roll again, must score!");
		return;
	}
	for (var i=0; i<5; i++){
		currentDie = diceArray[i];
		var num=Math.floor(Math.random()*6+1);
		if (!currentDie.isHeld()){
			currentDie.setValue(num);
		}
	}
	console.log(diceArray);
	printValues();
	rollCounter +=1;
}


//Prints the current roll to the console
function printValues(){
	var diceValues = [];
	for(var i=0; i<diceArray.length; i++){
		diceValues[i] = diceArray[i].getValue();
	}
	console.log(diceValues);
}


//Prints the current scorecard to the console
function printScorecard(){
	for(var i=0; i<categoryArray.length; i++){
		console.log(categoryArray[i], categoryArray[i].getScore());
	}
}



///Takes a certain score and category. Enters the category in the score if has not already had a score entered.
//If the category being scored is Yahtzee and a yahtzee has already been scored, 100 points are added to the
//yahtzeeBonus category instead.
function enterScore(category, score){
	
	if(checkCompletion()){
		alert("You have finished the game!");
		var finalScore = getFinalScore();
		alert("Your final score is", finalScore);
	}
	var newCategory = categoryArray[category-1];
	
	if (newCategory===yahtzee){
		var yahtzeeBonusCategory = categoryArray[13];
		if(newCategory.isAlreadyScored()){
			yahtzeeBonusCategory.setScore(100);
			removeHeldAnimation();
			clearHeld();
			return;
		}
		newCategory.setScore(score);
		removeHeldAnimation();
		clearHeld();
		
		return;
	}
	if (newCategory.isAlreadyScored()){
		return;
	}
	newCategory.setScore(score);
	clearHeld();

	removeHeldAnimation();
}

//Toggles the held dice making them all unheld
function clearHeld(){
	for(var i=0; i<diceArray.length; i++){
		if(diceArray[i].isHeld()){
			diceArray[i].toggleHeld();
		}
	}
}


//Takes as input a number, calculates the score for the category corresponding to that number and then calls enterScore to enter it.
//Other than 1-6 which intuitivelly correspond to their equivalent number/top level categories, the following are associated:
//  7: three-of-a-kind
//  8: four-of-a-kind
//  9: full house
// 10: Small straight
// 11: Large straight
// 12: Yahtzee
// 13: Chance

function scoreCategory(number){
	
	var sumOfAllDice = 0;		
	for(var i=1; i<=6; i++){
		sumOfAllDice += i*occurs(i);
	}
	
	if(number>=1 && number<=6){			//If the number is between 1-6 this will be scored in the number categories
		var counter = occurs(number);  //(top half of game)
		var score = counter*number;
		category = number;
		enterScore(category,score);
		return;
	}
	
	switch(number){							
		case 7:
			if(checkThreeKind()){
				enterScore(7, sumOfAllDice);
			}
			else{
				enterScore(7,0);
			}
			break;
		case 8:
			if(checkFourKind()){
				enterScore(8,sumOfAllDice);
			}
			else{
				enterScore(8,0);
			}
			break;
		case 9:
			if(checkFullHouse()){
				enterScore(9, 25);
			}
			else{
				enterScore(9,0);
			}
			break;
		case 10:
			if(checkSmallStraight()){
				enterScore(10,30);
			}
			else{
				enterScore(10,0);
			}
			break;
		case 11:
			if(checkLargeStraight()){
				enterScore(11,40);
			}
			else{
				enterScore(11,0);
			}
			break;
		case 12:
			if(checkYahtzee()){
				enterScore(12,50);
			}
			else{
				enterScore(12,0);
			}
			break;
		case 13:
			enterScore(13,sumOfAllDice);
			break;
		default:
			console.log("Wrong category entered, please try again.");
	}
	
}


//Returns an integer corresponding to how many times a certain number occurs in the current roll.
function occurs(number){
	var counter = 0;
	for(var i=0; i<5; i++){
		if(diceArray[i].getValue()===number){
			counter+=1;
		}
	}

	return counter;
}


//Returns a boolean corresponding to whether 3 of a kind has been achieved.
function checkThreeKind(){
	for(var i=1; i<=6; i++){
		if (occurs(i)>=3){
			return true;
		}
	}
	return false;
}



//Returns a boolean corresponding to whether 4 of a kind has been achieved.
function checkFourKind(){
	for(var i=1; i<=6; i++){
		if(occurs(i)>=4){
			return true;
		}
	}
	return false;
}	


//Returns a boolean corresponding to whether a full house has been achieved. (3 of one kind and 2 of another)
function checkFullHouse(){
	if(checkThreeKind()){
		for (var i=0; i<=6; i++){
			if(occurs(i)===2){
				return true;
			}
		}
	}
	return false;
}


//Returns a boolean corresponding to whether or not a Small Straight has been achieved. (4 numbers in a row)
//Creates an array with the dice values, sorts it and removes duplicates and puts the result in a string.
//Then compares that string to the strings '1234', '2345', '3456'. If it matches one of those values,
//a small straight has occured
function checkSmallStraight(){
	var diceValues  = [];
	for(var i=0; i<diceArray.length; i++){
		diceValues[i]=diceArray[i].getValue();
	}
	diceValues.sort()
	for ( var i = 1; i < diceValues.length; i++ ) {
  	  if ( diceValues[i] === diceValues[ i - 1 ] ) {
     	   diceValues.splice( i--, 1 );
     }
	}
	console.log(diceValues);
	var uniques ="";
	for(var i=0; i<diceValues.length; i++){
		uniques = uniques + String(diceValues[i]);
	}
	console.log(uniques);
	if(uniques==="1234" | uniques==="2345" | uniques==="3456"){
		return true;
	}
	return false;
}


//Returns a boolean corresponding to whether or not a Large Straight has been achieved (5 numbers in a row).
//The only possible values for this are "12345" or "23456". The function calls checkSmallStraight. If that has
//been achieved, it checks to see if (1) and (5) both occur in the roll simultaneously, or (2) and (6).
function checkLargeStraight(){
	if(checkSmallStraight){
		if((occurs(1)>0 && occurs(5)>0) || (occurs(2)>0 && occurs(6)>0)){
			return true;
		}
	}
	return false;
	
}


//Returns a boolean corresponding to whether or not Yahtzee has been achieved (5 of the same number).
function checkYahtzee(){
	for(var i=0; i<diceArray.length; i++){
		if(occurs(i+1)===5){
			return true;
		}
	}
	return false;
}


//Checks to see if there are any categories left to score. If there are categories that have not already
//been scored, returns false.
function checkCompletion(){

	for(var i=0; i<14; i++){
		if(categoryArray[i].isAlreadyScored()==false){
			return false;
		}
	}
	return true;
}

//Gets the subtotal from the categories in the top half(1-6)
function getSubtotal(){
	var subtotal = 0;
	for(var i=0; i<6; i++){
		subtotal += categoryArray[i].getScore();
	}
	return subtotal;
}


//Checks the subtotal in the first categories and if is is over 65
//it adds another 35 points to the total score.
function checkForBonus(){
	
}

//Calculates the total final score of the game
getFinalScore = function(){
	var sum=0;
	for (var i=0; i<categoryArray.length; i++){
		sum+=categoryArray[i].getScore();
	}
	return sum;
}

  //**********************************************************************//
 //							RUNTIME                                      //
//**********************************************************************// 

	var die1 = new Dice(),
		die2 = new Dice(),
		die3 = new Dice(),
		die4 = new Dice(),
		die5 = new Dice(),
		ones = new Category(),
		twos = new Category(),
		threes = new Category(),
		fours = new Category(),
		fives = new Category(),
		sixes = new Category(),
		subtotal = new Category(),
		bonus = new Category(),
		threeKind = new Category(),
		fourKind = new Category(),
		fullHouse = new Category(),
		smallStraight = new Category(),
		largeStraight = new Category(),
		yahtzee = new Category(),
		yahtzeeBonus = new Category(),
		chance = new Category(),
		grandTotal = new Category();
		
	 diceArray = [die1, die2, die3, die4, die5];
	 categoryArray = [ones,twos,threes,fours,fives,sixes,threeKind,fourKind,fullHouse,smallStraight,largeStraight,yahtzee,chance,yahtzeeBonus];
	 rollCounter = 0;	
	heldArray = [die1.is]
	
	//Prints out the current roll
	for (var i=0; i<diceArray.length; i++){
		//console.log(diceArray[i].getValue());
		console.dir(diceArray[i]);
	}
	
		
	
	ones.setDescription("The sum of all the dice with the value 1.");
	twos.setDescription("The sum of all the dice with the value 2.");
	threes.setDescription("The sum of all the dice with the value 3.");
	fours.setDescription("The sum of all the dice with the value 4.");
	fives.setDescription("The sum of all the dice with the value 5.");
	sixes.setDescription("The sum of all the dice with the valie 6.");
	subtotal.setDescription("The sum of all the scores 1-6.");
	bonus.setDescription("If the subtotal is over than 65, an extra 35 points are added here.");
	threeKind.setDescription("Add the total of all the dice.");
	fourKind.setDescription("Add the total of all the dice.");
	fullHouse.setDescription("25 points.");
	smallStraight.setDescription("30 points.");
	largeStraight.setDescription("40 points.");
	yahtzee.setDescription("50 points.");
	chance.setDescription("Add the total of all the dice.");
	yahtzeeBonus.setDescription("For every aditional Yahtzee scored, add 100 points.");
	grandTotal.setDescription("The total of all the categories.");
	
//Consider changing checkCompletion to take an argument for up to where to check
//Why is yahtzee bonus score not showing? may be ui