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
		content = $(".content"),
		work = $("#work"),
		$xs_tab = $(".xs-tab"),
		$med_content = $("#med_content"),
		$window = $(window),
		my_window = new CurrentWindow,
		breakpoints = [0,480,900],
		$flippable = $(".flippable");


	$flippable.on("mouseenter mouseleave", function(){
		$this = $(this);
		$this.toggleClass("flipped");
	});

	$flippable.on("click", function(){
		$this = $(this);
		$flippable.not($this).toggleClass("hidden");
	});


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




	
	setHandlers($window.width());
	$window.resize(function(){ 
		$this = $(this);
		if(checkBreakpointJump(my_window.getWidth(), $this.width(), breakpoints)){
			$xs_tab.removeClass("expanded");
			$xs_tab.children(".fa")
				.removeClass("expanded");
			$xs_tab.children(".xs_content, div:first-child")
				.addClass("hidden");
			$xs_tab.off();
			$med_content.children(".xs_content")
				.remove();
			$med_content.addClass("hidden");
			main_container.off();
			setHandlers($this.width());
			my_window.storeWidth();
			
		};
	});


	//Makes a certain tab the only one visible by ensuring it is expanded and hiding all the others
	//IN: target tab to be displayed
	function expandedTab(target_tab){
		tab.not(target_tab).addClass("hidden").removeClass("expanded");
		target_tab.removeClass("hidden").addClass("expanded");
	}

	//Sets event handlers for elements based on the size of the window
	//IN: width in pixels of current display window
	//OUT:--

	//If current window width jumps a breakpoint change the handlers accordingly
	function setHandlers(window_width){
		if(window_width<900){
			console.log("small");
			main_container.removeClass("hidden");
		}

		if(window_width<=480){
			if(!$("#home_nav").hasClass("hidden")){
					$("#home_nav").click();
			}
			$("#main_container").on("click", function(){
				$(this).toggleClass("expanded");
			});
			//Handles the clicking on xs-tab
			$xs_tab.on("click", function(){

				$("#med_content").addClass("G");
				var $this = $(this);
				
				$this.toggleClass("expanded");
				$this.children(".fa:first")
					.toggleClass("expanded");
				$this.children("div:first")  
					.toggleClass("hidden");
				$this.children(".xs_content")
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
		} 
		else if(window_width<=900){
			main_container.on("click", function(){
				$(this).toggleClass("expanded");
			});

			$xs_tab.on("click", function(){
				var $this = $(this);
				$med_content.children(".xs_content").remove();
				$med_content.append($this.children(".xs_content").clone());

				$med_content.removeClass();
				if($this.hasClass("expanded")){
					$med_content.addClass("hidden");
					$med_content.children(".xs_content").remove();
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
			});
		}
		else{
			main_container.addClass("hidden");
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

	//Moves DOM elements from one parent to another
	//IN:  target JQUERY DOM element to be moved,
	//	   JQUERY parent to which to append target DOM element
	//OUT:--
	function relocate(target_element, new_parent){
		var my_element = target_element.remove();
		new_parent.append(my_element);
	}
