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
		$xs_tab = $(".xs-tab");

	
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
	



	//Makes a certain tab the only one visible by ensuring it is expanded and hiding all the others
	//IN: target tab to be displayed
	function expandedTab(target_tab){
		tab.not(target_tab).addClass("hidden").removeClass("expanded");
		target_tab.removeClass("hidden").addClass("expanded");
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////	
	// // media query event handler
	if (matchMedia) {
		var mq = window.matchMedia("(max-width: 800px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}

// media query change
	function WidthChange(mq) {

		if (mq.matches) {
			// window width is up to 480px
			$("#main_container").on("click", function(){
				$(this).toggleClass("expanded");
			});
		}
		else {
			$("#main_container").off("click");
			// window width is > 480px
			mq.removeListener()
		}
	}

	//Handles the clicking on xs-tab(<=480)
	$xs_tab.on("click", function(){
		var $this = $(this);
		
		$this.toggleClass("expanded");
		$this.children(".fa:first")
			.toggleClass("expanded");
		$this.children("div:first")  //CAN I COMMA SEPARATE OR SOMETHING??
			.toggleClass("hidden");
		$this.children(".xs_content_container")
			.toggleClass("hidden");
		if($this.hasClass("expanded")){
			$('html, body').animate({
	      	  scrollTop: $this.offset().top
	   		}, 500);
		}
		$xs_tab.not($this)	
			.removeClass("expanded")
			.children("div")
			.addClass("hidden");

		$xs_tab.not($this)
			.children(".fa")
			.removeClass("expanded");

	});

	
});
