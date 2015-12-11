
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function fill() {
	chrome.storage.local.get({bans: []}, function (result) {
			// the input argument is ALWAYS an object containing the queried keys
			// so we select the key we need
			var bans = result.bans;
			
			var template = "<img src='{0}' height='75'/> <br /> {1} <br /> {2} <br /> <hr />";
			var content = ''
			for (var i=0;i<bans.length;i++) 
			{
				console.log(bans[i])
				content += template.format(bans[i].imgUrl, bans[i].name, bans[i].date);
			}
			
			if (bans.length == 0) {
				$('#clearAll').hide();
				$('#status').html('<b> Kimse yok  :)</b>');
			} else {
				$('#status').html(content);
			}
			//document.writeln(content);
			
	});
}


 function clearData() {
	chrome.storage.local.set({bans: []}, function () {
			// you can use strings instead of objects
			// if you don't  want to define default values
			chrome.storage.local.get('bans', function (result) {
				console.log(result.bans)
			});
		});
}


document.addEventListener('DOMContentLoaded', function() {
	$('#clearAll').click(function(e) {
		e.preventDefault();
		clearData();
		fill();
	}); 
});


fill();



