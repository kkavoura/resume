$(document).ready(function(){
	
	var education = $("#education"),
		education_content = $("#education_content"),
		projects_content = $("#projects_content"),
		main_container = $("#main_container"),
		contact_content = $("#contact_content"),
		work_content = $("#work_content"),
		contact = $("#contact"),
		projects = $("#projects"),
		tab = $(".tab"),
		navigation = $(".navigation"),
		work = $("#work"),
		$xs_tab = $(".xs-tab"),
		$med_content = $("#med_content"),
		$window = $(window),
		my_window = new CurrentWindow,
		breakpoints = [0,480,900],
		$flippable = $(".flippable"),
		$body = $("body"),
		$lg_content = $("#lg_content"),
		has_content = false,
		$about_me_xs = $("#about_me_xs"),
		$backButton = $("#backButton"),
		$lastClickedHex = '',
		$tab = $(".tab"),
		$content=$("#content");


	if($window.width()>=900){
		$(".tab").children(".tab-content")
			.removeClass("hidden");
	} 

	//Handle hex hover
	$flippable.on("mouseenter mouseleave", function(){
		$this = $(this);
		$this.toggleClass("flipped");
	});

	//Handle hex clicking
	$flippable.on("click", function(){
		var $this = $(this),
			newBorderColor = $this.children(".face").css("background-color"),
			newBgColor = newBorderColor.replace(")", ", 0.5)").replace("rgb", "rgba"),
			hexID = $this.attr("id"),
			myContent = '';

		if(!has_content){	//If there is no content, add it, change colors
			$lg_content.css({
				"border-color" : newBorderColor,
				"background-color" : newBgColor
			});		
			if(hexID === "about_me"){
				$lg_content.css("background-color", "rgba(51,51,51,0.2)");
			}	
			$myContent = $("#" + hexID + "_xs").children(".content").clone(); //Retrieve copy of content from equivalent xs_tab	
			if(hexID === "projects" || hexID === "education"){
				$myContent.children("h2").remove();
			}
			$myContent.removeClass("hidden");	
			$lg_content.append($myContent); 
		}
		else{
			$lg_content.children(".content").remove(); //If there is content, remove it
		}

		$flippable.not($this).toggleClass("hidden");	//Reset content to original state
		$this.toggleClass("focused flipped");
		$lg_content.toggleClass("offscreen");
		has_content = !has_content;
		$lastClickedHex = $this;
	});

	$backButton.on("click", function(){				//Reset content to original state
		$lg_content.toggleClass("offscreen");
		$flippable.removeClass("hidden");
		$lastClickedHex.toggleClass("focused flipped");
		has_content = !has_content;
		$lg_content.children(".content").remove();

	});

	

	
	setHandlers($window.width()); //Default call to set handlers for current width
	$window.resize(function(){
		$this = $(this),
		$thisWidth = $this.width();


		if(checkBreakpointJump(my_window.getWidth(), $thisWidth, breakpoints)){ //If window size changes breakpoints, resets containers to default state
			$xs_tab.removeClass("expanded");									   //so they transition properly, and resets event handlers to correct ones
			$xs_tab.children(".fa")
				.removeClass("expanded");
			$xs_tab.children(".content, div:first-child")
				.addClass("hidden");
			$xs_tab.off();
			$med_content.children(".content")
				.remove();
			$med_content.addClass("hidden");

			//robotics handler
			$tab.off();
			$tab.removeClass("expanded")
				.children(".icon")
				.removeClass("expanded")
				.children()
				.removeClass("expanded");
			$tab.children(".tab-content").addClass("hidden");
			$content.addClass("hidden")
				.children()
				.remove();
			setHandlers($thisWidth);
			my_window.storeWidth();

		if($window.width()>=900){
			$(".tab").children(".tab-content")
				.removeClass("hidden");
	}
			
		};
	});


	//Sets event handlers for elements based on the size of the window
	//IN: width in pixels of current display window
	//OUT:--
	function setHandlers(window_width){

		if(window_width<=480){

			//Handles the clicking on xs-tab
			$xs_tab.on("click", function(){

				var $this = $(this);
				
				$this.toggleClass("expanded");
				$this.children(".fa:first")
					.toggleClass("expanded");
				$this.children("div:first")  
					.toggleClass("hidden");
				$this.children(".content")
					.toggleClass("hidden");

				$xs_tab.not($this)	
					.removeClass("expanded")
					.children("div")
					.addClass("hidden");

				$xs_tab.not($this)
					.children(".fa")
					.removeClass("expanded");

				if($this.hasClass("expanded")){
					$('html, body').animate({
			      	  scrollTop: $this.offset().top
			   		}, 500);
				}
			});

			//Robotics handlers
			$tab.on("click", function(){
				var $this = $(this);			//Expand tab to show content
				$this.toggleClass("expanded");
				$this.children(".icon")
					.toggleClass("expanded")
					.children(".fa, h2")
					.toggleClass("expanded");
				$this.children(".tab-content")
					.toggleClass("hidden");
				$tab.not($this)					//Minimize all other tabs and hide content
					.removeClass("expanded")
					.children(".icon")
					.removeClass("expanded")
					.children(".fa, h2")
					.removeClass("expanded");
				$tab.not($this)
					.children(".tab-content")
					.addClass("hidden");


				if($this.hasClass("expanded")){	//Scroll to top of clicked tab if enough room
					$('html, body').animate({
			      	  scrollTop: $this.offset().top
			   		}, 500);
				}
			});

		} 
		else if(window_width<=900){
			$about_me_xs.children(".content").removeClass("hidden");
			
			$xs_tab.not("#about_me_xs").on("click", function(){
				var $this = $(this);
				$med_content.children(".content").remove();
				$med_content.append($this.children(".content").clone());

				$med_content.removeClass();
				if($this.hasClass("expanded")){
					$med_content.addClass("hidden");
					$med_content.children(".content").remove();
				}

				switch($this.attr("id")){
					case "contact_xs":
						$med_content.addClass("expanded_contact");
						break;
					case "projects_xs":
						$med_content.addClass("expanded_projects");
						break;
					case "work_xs":
						$med_content.addClass("expanded_work");
						break;
					case "education_xs":
						$med_content.addClass("expanded_education");
						break;
				}
				$this.children(".fa").toggleClass("expanded");
				$xs_tab.not($this)
					.removeClass("expanded")
					.children(".fa")
					.removeClass("expanded");
				$this.toggleClass("expanded");
				$med_content.children().removeClass("hidden");

				$('html, body').animate({
			    	scrollTop: $this.offset().top
			   	}, 500);
			});

			//robotics handlers
			$tab.on("click", function(){
				var $this = $(this),
					selectedContent = $this.children(".tab-content").children().clone();
				selectedContent.removeClass("hidden");
				$content.removeClass("hidden");
				$content.empty();
				$content.append(selectedContent);
				$this.addClass("highlighted");
				$tab.not($this).removeClass("highlighted");
			});
		}
		else{
			// main_container.addClass("hidden");
		}

	}

// Object keeping track of the width of the window to serve as comparison with current state 
// Makes it possible to check if a breakpoint jump has occurred
	function CurrentWindow(){
		this.last_known_width = $window.width();

		this.storeWidth = function(){
			this.last_known_width = $window.width();
		}

		this.getWidth = function(){
			return this.last_known_width;
		}
	}
	
});

	//Checks if the width is changing between breakpoints
	//IN:breakpoints in pixels
	//OUT:boolean indicating whether a breakpoint was jumped
	function checkBreakpointJump(width_before, width_after, breakpoints){
		for(var i=0; i<breakpoints.length; i++){
			if((width_before<=breakpoints[i] && width_after>breakpoints[i]) || (width_before>breakpoints[i] && width_after<=breakpoints[i])){
				console.log("JUMP!");
				return true;
			}
		}
		return false;

	}
