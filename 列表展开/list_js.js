window.onload = function () {
	var aList = document.getElementById("list")
	var a_p = aList.getElementsByTagName("p")[0];
	var aImg = aList.getElementsByTagName("img")[0];
	var aUl = aList.getElementsByTagName("ul")[0];
	a_p.onclick = function () {
		if(aUl.style.display === "none") {
			aUl.style.display = "block";
			aImg.src = "images/down.gif";
		}
		else {
			aUl.style.display = "none";
			aImg.src = "images/up.gif";
		}
	};
}