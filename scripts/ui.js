run = function(){
	$(document).ready(function(){
		$rollButton = $("#rollButton");
		$dice = $(".dice");
		$filter = $("#filter");
		$category = $(".category");
		$yahtzee = $("#12");
		$instructions_container = $("#instructions_container");
		$main_container = $("#main_container");
		$this = $(this);
		$newGameButton = $("#newGameButton"),
		$extras_container = $("#extras_container"),
		$rollCounter = $("#rollCounter"),
		$score = $(".score");
		
		$rollButton.click(function (){
			roll();
			console.log(diceArray);
			changeImage();
			$filter.addClass("hidden");
			$rollCounter.text(rollCounter);
		});
		
		$category.on("click", function() {
			if(!justScored){
				var $this = $(this),
					categoryID = parseInt($this.attr("id"));

				scoreCategory(categoryID);
				$filter.css("display", "block")
					.fadeTo(500,0.75);
				$filter.removeClass("hidden");
				$this.next(".score").text(categoryArray[categoryID].getScore());
				if(!checkCompletion()){
					$("#subtotal").next(".score").text(getSubtotal());
				}
			}
			else{
				alert("You must roll again before scoring!");
			}		
		});
		
		$dice.on("click", function(){
			$this = $(this);
			var diceObject = ui_id_to_logic($this.attr("id"));
			diceObject.toggleHeld();
			$this.toggleClass("held");
		});
		
		$yahtzee.on("click", function(){
			changeBonusDisplay();
		});		

			
		// $rollButton.click(function(){
		// 	$filter.css("display", "none")
		// 	.css("opacity", 0);
		// 	$rollCounter.text(rollCounter);
		// });
		
			
		$instructions_container.on("click", function(){
			$instructions_container.toggleClass("expanded");
			$("#extras_container").toggleClass("moved");
		});

		$newGameButton.one("click", function(){
			var $this = $(this),
			removedButton = $this.detach();
			$("#rollButton").toggleClass("hidden");
			$extras_container.append(removedButton);
			$extras_container.removeClass("hidden");
		});

		$newGameButton.on("click", function(){
			newGame();
		});	
		
		
	});
}


changeImage = function(divID, diceValue){
	var diceValues = [];
	for (var i=0; i<diceArray.length; i++){
		diceValues[i] = diceArray[i].getValue();
	}
	$(".dice").each(function(index,el) {
		$(this)
		.children("img")
		.attr("src","images/d" + diceValues[index] + ".png");
	});
}

//Takes the id of a certain die from the user interface and returns the corresponding Dice object from the logic.js file 
ui_id_to_logic = function(diceID){
	switch(diceID){
		case "i":
			return die1;
			break;
		case "ii":
			return die2;
			break;
		case "iii":
			return die3;
			break;
		case "iv":
			return die4;
			break;
		case "v":
			return die5;
			break;
	}
}


//Changes the display of the yahtzee bonus category to reflect its current value
changeBonusDisplay = function(){
	console.log("SSSS");
	$("#14").next(".score").text(categoryArray[13].getScore());
}

//Edits the UI when a new game is started
//Resets dice to default value, removes all held animations, clears scoreboard
//IN:-
//OUT:-
function resetUI(){
	$dice.removeClass("held");
	changeImage();
	$rollCounter.text(rollCounter);
	$score.text("");
}



addLoadEvent(run);


//Fix scoring button situation(click to score or what?)
//Fix the CSS so its not all retarded. Avoid absolute positioning.
//Ask hackett about function declaration
//Another CSS
//Make meny with instructions/help
//Mention to hackett about changing css but also having to change ui.js. No good! what do?
//commas
//set body margin to 0