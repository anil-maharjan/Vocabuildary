$(".more").on("click", function(){
	 $(this).prev('.aboutWord').toggleClass('display');
});

// $(".uBtn").on("click", function(){
// 	$(this).text("Added");
// });	
var rand = Math.floor(Math.random()*10);