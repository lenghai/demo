function addLoadEvent(func) {
        var oldonload = window.onload;
        if(typeof window.onload != 'function') {
                window.onload = func;
        }else {
                window.onload = function() {
                        oldonload();
                        func();
                }
        }
}

function showUserList() {
	var oMessage = document.getElementById("message");
	var oPicture = oMessage.getElementsByClassName("picture");
	var oInfo = oMessage.getElementsByClassName("user_info");
	for(var i = 0;i < oPicture.length;i++) {
		oPicture[i].onmouseover = function() {
			this.parentNode.getElementsByClassName("user_info")[0].style.display = "block";
		}
	}
    for(var i=0;i<oInfo.length;i++) {
    	oInfo[i].onmouseout = function() {
    		this.parentNode.style.display = "none";
    	}
    }
}

addLoadEvent(showUserList);