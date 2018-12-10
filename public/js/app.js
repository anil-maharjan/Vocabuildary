$(".more").on("click", function(){
	 $(this).prev('.aboutWord').toggleClass('abtWord');
	 $(this).val()==="More"?$(this).val("Less"):$(this).val("More");
});

// $(".uBtn").on("click", function(){
// 	$(this).text("Added");
// });	



