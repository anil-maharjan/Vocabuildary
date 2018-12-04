var a = parseInt(document.querySelector(".index").value, 10);
var flag = true;

$(".wordsList").on("click", function(e){
	var b = $("li").index(e.target);
	$(".clickedIndex").val(b);
	if(flag){
		if(a===b){
			$(this).addClass("correct");
		}else{
			$(this).addClass("incorrect");
			$(".secret").css("display", "block");
		}	
		flag = false;
	}
})