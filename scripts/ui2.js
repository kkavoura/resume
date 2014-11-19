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
		about_me = $(".about_me"),
		content = $(".content"),
		work = $("#work"),
		$xs_tab = $(".xs-tab"),
		$med_content = $("#med_content"),
		$window = $(window),
		my_window = new CurrentWindow
		breakpoints = [0,480,900];


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

	
	tab.on("click", function(){
		var $this = $(this),
			current_id = $(this).attr('id');


		$this.attr("class", "expanded");
		tab.not($this).attr("class", "hidden");
		
		switch(current_id){
			case "education":
				about_me.addClass("hidden");
				main_container.attr("class", "expanded_left");
				navigation.removeClass("hidden");
				navigation.removeClass("expanded_horizontally");
				navigation.addClass("expanded_vertically");
				$("#education_nav").addClass("hidden");
				if(education_content.hasClass("hidden")){
					setTimeout(function(){
						education_content.removeClass("hidden");
					}, 750);
				};
				break;
				
			case "contact":
				about_me.addClass("hidden");
				main_container.attr("class", "expanded_top");
				navigation.removeClass("hidden");
				navigation.removeClass("expanded_vertically");
				navigation.addClass("expanded_horizontally");
				$("#contact_nav").addClass("hidden");
				contact_content.removeClass("hidden");
				break;
				
			case "projects":
				about_me.addClass("hidden");
				main_container.attr("class", "expanded_right");
				navigation.removeClass("hidden");
				navigation.removeClass("expanded_horizontally");
				navigation.addClass("expanded_vertically");
				$("#projects_nav").addClass("hidden");
				if(projects_content.hasClass("hidden")){
					setTimeout(function(){
						projects_content.removeClass("hidden");
					}, 750);
				};
				break;
			
			case "work":
				about_me.addClass("hidden");
				main_container.attr("class", "expanded_bottom");
				navigation.removeClass("hidden");
				navigation.removeClass("expanded_vertically");
				navigation.addClass("expanded_horizontally");
				$("#work_nav").addClass("hidden");
				work_content.removeClass("hidden");
				break;

		}



	});
	
	$("#home_nav").on("click", function(){
		main_container.attr("class", "");
		content.addClass("hidden");
		tab.removeClass("expanded hidden");
		navigation.removeClass("expanded_vertically expanded_horizontally");
		navigation.addClass("hidden");
		setTimeout(function(){
			about_me.removeClass("hidden");
		}, 500);
	});
	
	$("#projects_nav").on("click", function(){
		expandedTab(projects);
		main_container.attr("class", "expanded_right");
		projects_content.removeClass("hidden");
		navigation.removeClass("hidden");
		navigation.removeClass("expanded_horizontally");
		navigation.addClass("expanded_vertically");
		$("#projects_nav").addClass("hidden");
	});
	
	$("#contact_nav").on("click", function(){
		main_container.attr("class", "expanded_top");
		expandedTab(contact);
		contact_content.removeClass("hidden");
		navigation.removeClass("hidden");
		navigation.removeClass("expanded_vertically");
		navigation.addClass("expanded_horizontally");
		$("#contact_nav").addClass("hidden");
	});
	
	$("#education_nav").on("click", function(){
		main_container.attr("class", "expanded_left");
		expandedTab(education);
		education_content.removeClass("hidden");
		navigation.removeClass("hidden");
		navigation.removeClass("expanded_horizontally");
		navigation.addClass("expanded_vertically");
		$("#education_nav").addClass("hidden");
	});
	
	$("#work_nav").on("click", function(){
		main_container.attr("class", "expanded_bottom");
		expandedTab(work);
		work_content.removeClass("hidden");
		navigation.removeClass("hidden");
		navigation.removeClass("expanded_vertically");
		navigation.addClass("expanded_horizontally");
		$("#work_nav").addClass("hidden"); //$THIS? 
	});
	
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
		}

	}



// 	///////////////////////////////////////////////////////////////////////////////////////////////////////	
// 	// // media query event handler
// 	if (matchMedia) {
// 		var mql = window.matchMedia("(max-width: 480px)"),
// 			mql_med = window.matchMedia("(min-width:481px) and (max-width:801px)"),
// 			mql_large = window.matchMedia("(min-width:801px");
// 		mql.addListener(onWidthChange);
// 		mql_med.addListener(onWidthChange);
// 		mql_large.addListener(onWidthChange);
// 		onWidthChange(mql, mql_med, mql_large);
// 	}

// // media query change
// 	function onWidthChange(mql, bb, mql_large) {

// 		if (mql.matches) {	// window width is up to 480px
// 			if(!$("#home_nav").hasClass("hidden")){
// 					$("#home_nav").click();;
// 			}
// 			$("#main_container").on("click", function(){
// 				$(this).toggleClass("expanded");
// 			});
// 			console.log("small");
// 			tab.addClass("hidden");
// 		}
// 		console.log(mql);
// 		if (bb.matches){

// 		}
// 		// console.log(bb);
// 		// console.log(mql_large);
// 		// else if (bb.matches){ //window between 481px and 800px
// 		// 	console.log("MED");
// 		// 	$xs_tab.on("click", function(){
// 		// 		$med_content.toggleClass("G");
// 		// 	});
// 		// }
// 		// else if(mql_large.matches){			// window width is > 801px
// 		// 	$("#main_container").off("click");
// 		// 	tab.removeClass("hidden");
// 		// 	console.log("big");
// 		// 	// mql.removeListener()
// 		// 	// mql_med.removeListener();
// 		// }
// 	}

	// //Handles the clicking on xs-tab
	// $xs_tab.on("click", function(){

	// 	$("#med_content").addClass("G");
	// 	var $this = $(this);
		
	// 	$this.toggleClass("expanded");
	// 	$this.children(".fa:first")
	// 		.toggleClass("expanded");
	// 	$this.children("div:first")  
	// 		.toggleClass("hidden");
	// 	$this.children(".xs_content_container")
	// 		.toggleClass("hidden");

	// 	$xs_tab.not($this)	
	// 		.removeClass("expanded")
	// 		.children("div")
	// 		.addClass("hidden");

	// 	$xs_tab.not($this)
	// 		.children(".fa")
	// 		.removeClass("expanded");

	// 	if($this.hasClass("expanded")){
	// 		$('html, body').animate({
	//       	  scrollTop: $this.offset().top
	//    		}, 500);
	// 	}

	// });

	
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


