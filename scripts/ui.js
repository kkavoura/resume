run = function(){
	$(document).ready(function(){
		$rollButton = $("#rollButton");
		$dice = $(".dice");
		$category = $(".category");
		$yahtzee = $("#12");
		$instructions_container = $("#instructions_container");
		$main_container = $("#main_container");
		$this = $(this);
		$newGameButton = $("#new_game_button"),
		$extras_container = $("#extras_container"),
		// $rollCounter = $("#rollCounter"),
		$score = $(".score"),
		$window = $(window),
		$menu = $("#menu"),
		$score_selection = $("#score_selection");
		
		$rollButton.click(function(){
			if(rollCounter!=3){
				randomizeImages(function(){
					roll();
					changeImage();
				});
				console.log(diceArray);
				changeImage();
			}
			else{
				alert("Can't roll again, must score!");
			}
		});
		
		$category.on("click", function() {
			var success = false;
			if(!justScored){
				var $this = $(this),
					categoryID = parseInt($this.attr("id"));

				success = scoreCategory(categoryID);

				if(success){
					$this.removeClass("active");
					$this.next(".score")
						.addClass("scored")
						.text(categoryArray[categoryID].getScore());
					$("#subtotal").next(".score").text(getSubtotal());
					setBonus();
					$("#bonus").next(".score").text(bonus.getScore());				
					$("#13").next(".score").text(yahtzeeBonus.getScore());
					
					if(!checkCompletion()){
						$filter.css("display", "block")
							.fadeTo(500,0.75)
							.removeClass("hidden");
					}
					else{
						$("#bonus").next(".score").text(bonus.getScore());
						$filter.css("display", "block")
							.fadeTo(500,0)
							.removeClass("hidden");
						$rollButton.addClass("hidden");
					}
				}				
			}
			else{
				alert("You must roll again before scoring!");
			}		
		});
		
		$dice.on("click", function(){
			var $this = $(this),
			diceObject = ui_id_to_logic($this.attr("id"));
			if(rollCounter!=0){
				diceObject.toggleHeld();
				$this.toggleClass("held");
			}
			else{
				alert("Cannot hold dice before rolling!");
			}
		});

		$newGameButton.on("click", function(){
			newGame();
			$("#rollButton").removeClass("hidden");
			$category.addClass("active");
			$menu.toggleClass("expanded");
		});	
		
		
	});

/****************************************************************!!***************************************************************/

	$(".fa-bars").on("click", function(){
		$menu.toggleClass("expanded");
	});

	$(".fa-times-circle").on("click", function(){
		$instructions_container.toggleClass("expanded");
	})

	$("#instructions_button").on("click", function(){
		$instructions_container.toggleClass("expanded");
		$menu.toggleClass("expanded");
	});

	// Bring up scoring selection menu that scrolls you to appropriate category scoreboard
	$("#score_button").on("click", function(){
		$score_selection.toggleClass("hidden");
	});

	$("#score_selection_numbers").on("click", function(e){
		e.stopPropagation();
		$("html, body").animate({
			scrollTop: $(".left").offset().top
		}, 500);
		$score_selection.toggleClass("hidden");
	});

	$("#score_selection_combos").on("click", function(e){
		e.stopPropagation();
		$("html, body").animate({
			scrollTop: $(".right").offset().top
		}, 500);
		$score_selection.toggleClass("hidden");
	});

	//Testing testing
	$score.on("click", function(){
		$(this).toggleClass("scored");
	});


}

//Changes the images on the dice to match the current values
//IN: --
//OUT:--
changeImage = function(){
	for(var i=0; i<5; i++){
		$(".dice:nth-child("+ (i+1) +")")
			.children("img")
			.attr("src","images/d" + diceArray[i].getValue() + ".png");
	}
}

//Changes the images on non-held dice randomly to make them appear animated
//IN:--
//OUT:--
function randomizeImages(cb){
	var randomNumber = 0,
		randCounter = 0;

	var randImg = setInterval(function(){
		$dice.not(".held")
			.each(function(index, el){
				var randomNumber = Math.ceil(Math.random()*6);
				$(this)
					.children("img")
					.attr("src", "images/d"+randomNumber+".png");
			});
		randCounter++;
		if(randCounter===5){
			clearInterval(randImg);
			cb();
		}	
	}, 150);

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

//Edits the UI when a new game is started
//Resets dice to default value, removes all held animations, clears scoreboard
//IN:-
//OUT:-
function resetUI(){
	$dice.removeClass("held");
	changeImage();
	$score
		.text("")
		.removeClass("scored");
}

addLoadEvent(run);
