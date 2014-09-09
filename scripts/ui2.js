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
		about_me = $(".about_me");

	
	tab.on("click", function(){
		var $this = $(this),
			current_id = $(this).attr('id');


		changeDisplay(about_me, "hidden", 500);

					
		tab.not($this).toggleClass("hidden");

		$this.toggleClass('expanded');


		
		switch(current_id){
			case "education":
				main_container.toggleClass("expanded_left");
				navigation.toggleClass("expanded_vertically");
				changeDisplay(education_content, "hidden", 1000);
				break;
			case "contact":
				main_container.toggleClass("expanded_top");
				navigation.toggleClass("expanded_horizontally");
				contact_content.toggleClass("hidden");
				break;
			case "projects":
				main_container.toggleClass('expanded_right');
				navigation.toggleClass("expanded_vertically");
				changeDisplay(projects_content, "hidden", 1000);
//				projects_content.toggleClass("hidden");
				break;
			case "work":
				main_container.toggleClass('expanded_bottom');
				navigation.toggleClass("expanded_horizontally");
				work_content.toggleClass("hidden");
				break;
		}
		


	});



//Change content's visibility state
//If it is visible, hide immediately
//If content is hidden, delay its appearance by a certain nuber of ms. 
//IN: target content, class name for hidden state, delay time in ms
function changeDisplay(target_content, hidden_class_name, delay){
	if(target_content.hasClass(hidden_class_name)){
		setTimeout(function(){
			target_content.toggleClass(hidden_class_name);
		}, delay);
	}
	else{
		target_content.toggleClass(hidden_class_name);
	}
}
	
	
	
});
