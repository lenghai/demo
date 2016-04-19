window.onload = function() {
    var oTable = document.getElementById("cart");
    var oInputs = oTable.getElementsByTagName("input");
    var oBtnSelectAll = oTable.getElementsByTagName("input")[0];
    var oButtons = oTable.getElementsByTagName("button");
    var oBtnPrice = oTable.tHead.getElementsByTagName("a")[0];
    var oBtnArea = oTable.tHead.getElementsByTagName("a")[1];
    var i;
     //隔行变色
     interlaceColor();

     //添加事件
     for(i=0;i<oInputs.length;i++) {
        oInputs[i].onclick = totalPrice;
     }
     for(i=0;i<oButtons.length;i++) {
        oButtons[i].onclick = doDelete;
     }
     oBtnSelectAll.onclick = function() {
        selectAll();
        totalPrice();
     }
     
     oBtnPrice.href = "javascript:void(0);";
     oBtnPrice.order = "none";
     oBtnPrice.onclick = sortByPrice;

     oBtnArea.href = "javascript:void(0);";
     oBtnArea.order = "none";
     oBtnArea.onclick = sortByArea;

};


function totalPrice() {
    var oTable = document.getElementById("cart");
    var oRows = oTable.tBodies[0].rows;
    var result = 0.0;
    var ospanPrice = oTable.tFoot.getElementsByTagName("span")[0];
    var i;
    for(i=0;i<oRows.length;i++) {
        if(oRows[i].getElementsByTagName("input")[0].checked) {
            result+= parseFloat(oRows[i].getElementsByTagName("span")[0].innerHTML.substring(1));
        }
    }
    ospanPrice.innerHTML="&yen;" + result.toFixed(2) + "元";
}

function selectAll() {
    var oTable = document.getElementById("cart");
    var oBtnSelectAll = oTable.getElementsByTagName("input")[0];
    var oInputs = oTable.tBodies[0].getElementsByTagName("input");
    var i;
    for(i=0;i<oInputs.length;i++) {
        oInputs[i].checked = oBtnSelectAll.checked;  //全选、反选
    }
}

function interlaceColor() {
    var oTable = document.getElementById("cart");
    var oRows = oTable.tBodies[0].rows;
    var i;
    for(i=0;i<oRows.length;i++) {
        if(i%2) {
            oRows[i].style.background = "#fafafa";
        }
        else {
            oRows[i].style.background = "";
        }
    }
        
}


function doDelete() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    interlaceColor();
}

function sortTable(fn) {
    var oTable = document.getElementById("cart");
    var oRows = oTable.tBodies[0].rows;
    var oRowsForSort = [];
    var oFragment = document.createDocumentFragment();
    var i;

    for(i=0;i<oRows.length;i++) {
        oRowsForSort.push(oRows[i]);
    }
    oRowsForSort.sort(fn);
    for(i=0;i<oRowsForSort.length;i++) {
        oFragment.appendChild(oRowsForSort[i]);
    }
    oTable.tBodies[0].appendChild(oFragment);
    interlaceColor();
}

function sortByPrice() {
    var oTable = document.getElementById("cart");
    var oBtnPrice = oTable.tHead.getElementsByTagName("a")[0];
    var oBtnArea = oTable.tHead.getElementsByTagName("a")[1];
    var result = 1;

    switch(oBtnPrice.order) {
        case 'none':
        case 'asc':
            oBtnPrice.className = "btn_active";
            oBtnPrice.order = "desc";
            result = 1;
            break;
        case 'desc':
            oBtnPrice.className = "btn_down";
            oBtnPrice.order = "asc";
            result = -1;
            break;
    }
    oBtnArea.order = "none";
    oBtnArea.className = "btn";

    sortTable
    (
        function (vRow1, vRow2)
        {
            var sPrice1 = vRow1.cells[2].getElementsByTagName("span")[0].innerHTML;
            var sPrice2 = vRow2.cells[2].getElementsByTagName("span")[0].innerHTML;
            var fPrice1 = parseFloat(sPrice1.substring(1));
            var fPrice2 = parseFloat(sPrice2.substring(1));
            if(fPrice1 > fPrice2) 
            {
                return result;
            }
            else if(fPrice1 < fPrice2)
            {
                return -result;
            }
            else
            {
                return 0;
            }
        } 
    );
}

function sortByArea()
{
    var oTable=document.getElementById('cart');
    var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
    var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
    var result=1;
    
    switch(oBtnArea.order)
    {
        case 'none':
        case 'asc':
            oBtnArea.className='btn_active';
            oBtnArea.order='desc';
            result=1;
            break;
        case 'desc':
            oBtnArea.className='btn_down';
            oBtnArea.order='asc';
            result=-1;
            break;
    }
    
    oBtnPrice.order='none';
    oBtnPrice.className='btn';
    
    sortTable
    (
        function (vRow1, vRow2)
        {
            var sArea1=vRow1.cells[3].innerHTML;
            var sArea2=vRow2.cells[3].innerHTML;
            
            return result*sArea1.localeCompare(sArea2);
        }
    );
}