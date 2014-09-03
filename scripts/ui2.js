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
		navigation = $(".navigation");
		
	 //Make all contents hidden to begin with?
	
	tab.on("click", function(){
		var $this = $(this),
			current_id = $(this).attr('id');
			

					
		tab.not($this).toggleClass("hidden");

		$this.toggleClass('expanded');
		$(".about_me").toggleClass("hidden");
		 // $(".about_me").toggle();
		
		switch(current_id){
			case "education":
				main_container.toggleClass("expanded_left");
				navigation.toggleClass("expanded_vertically");
				education_content.toggleClass("hidden");
				break;
			case "contact":
				main_container.toggleClass("expanded_top");
				navigation.toggleClass("expanded_horizontally");
				contact_content.toggleClass("hidden");
				break;
			case "projects":
				main_container.toggleClass('expanded_right');
				navigation.toggleClass("expanded_vertically");
				projects_content.toggleClass("hidden");
				break;
			case "work":
				main_container.toggleClass('expanded_bottom');
				navigation.toggleClass("expanded_horizontally");
				work_content.toggleClass("hidden");
				break;
		}
		


	});
	
	
	
	
	
});
