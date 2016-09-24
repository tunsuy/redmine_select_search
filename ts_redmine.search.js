
//拼音支持
document.write("<script language='javascript' src='/javascripts/hz2py.js'></script>");

function addSelectInput() {
  $('select').each(function() {
	var item = $(this);
	if(! item.attr("id")) {
		return true;
	}
	var id = 's' + 'e' + 'a' + 'r' + 'c' + 'h' + '_' + 'i' + 'n' + 'p' + 'u' + 't' + '_';
	if($('#' + id + item.attr("id")).length > 0) {
		$('#' + id + item.attr("id")).attr('disabled', item.attr('disabled'));
		$('#' + id + item.attr("id")).css('display', item.css('display'));
		return true;
	}
	
	var cnt = 0;
	$('#' + item.attr("id") + ' option').each(function () {
		cnt ++;
	});
	if(cnt < 10) {
		return true;
	}
	item.after( "<input type=\"text\" id=\"" + id + item.attr('id') + "\"/>" );
	
	item.change(function(){
		if(item.val() != $(id + item.attr("id")).val()) {
			$('#' + id + item.attr("id")).val("");
		}
	});
	
	$('#' + id + item.attr("id")).keyup(function() {
		var val = $(this).val().replace(/\s+/g, "");
		if(val == "") {
			return;
		}
		
		$('#' + item.attr("id") + ' option').each(function () {
			if($(this).text().replace(/\s+/g, "") == val || cmp($(this), val)) {
				item.val($(this).val());
				return false;
			}
		});
	});
  });
}

function cmp(src, destStr){
	var pySrc = src.toPinyin().toLowerCase();
	var items = pySrc.split(" ");
	
	var tempStr = "";
	for(i = 0; i < items.length; i ++) {
		var str = items[i];
		if(str != "") {
			tempStr = tempStr + str.substring(0, 1);
		}
	}
	if(items.length == 0 || tempStr == "") {
		return false;
	}
	return tempStr == destStr 
		|| destStr == (items[0] + tempStr.substring(1))
		|| destStr == pySrc.replace(/\s+/g, "");
}

window.setInterval("addSelectInput()", 1000);