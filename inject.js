
var btn = '<a class="_42ft _4jy0 _4jy4 _517h _51sy"  id="blockLater">Block Later</a><br />'

var name='';
var userID=4;
var imgUrl ='';

var moveForce = 30; // max popup movement in pixels
var rotateForce = 20; // max popup rotation in deg

$(document).mousemove(function(e) {
    var docX = $(document).width();
    var docY = $(document).height();
    
    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;
    
    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);
    
    $('.popup')
        .css('left', moveX+'px')
        .css('top', moveY+'px')
        .css('transform', 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
});

setInterval(function() {	
	if ($('#blockLater').length == 0) {
		var locate = $($($('#fbTimelineHeadline').children()[0]).find('div')[0])
		$(locate.children()[0]).prepend(btn);
			
		$('#blockLater').click(function (e) {
			e.preventDefault();
		 
			 var profilePicture = $('.profilePic');
			 name = profilePicture.attr('alt');
			 imgUrl = profilePicture.attr('src');
			 userID = $('.entity._4v1s').attr("data-uid");
			 
			 var banDate = new Date();
			 banDate.setSeconds(banDate.getSeconds() + 604800);
			 
			 saveChanges({
				 id:userID,
				 name:name.replace('\'s Profile Photo',''),
				 imgUrl:imgUrl,
				 date: banDate.toJSON()
			 });
			
			 var message = '<div class="moving-zone">'+
				'<div class="popup">'+
				'	<div class="popup-content">'+
				'		<div class="popup-text">'+
				'			<b>'+name+'</b> listeye eklendi. '+
				'			 <b>'+ banDate.toLocaleString() +'</b> tarihinde engellenecek!'+
				'		</div>'+
				'	</div>'+
				'</div>'+
				'</div>';  
				
			 $('body').append(message);
		});	
	}
}, 1000);


 function saveChanges(data) {
       chrome.storage.local.get({bans: []}, function (result) {
		// the input argument is ALWAYS an object containing the queried keys
		// so we select the key we need
		var bans = result.bans;
		
		var hasExists = false;
		for (var i = 0; i<bans.length;i++) {
			if (bans[i].id === data.id) {
				hasExists = true;
				break;
			}
		}
		
		if (hasExists) return;
		
		bans.push(data);
		// set the new array value to the same key
		chrome.storage.local.set({bans: bans}, function () {
			// you can use strings instead of objects
			// if you don't  want to define default values
			chrome.storage.local.get('bans', function (result) {
				console.log(result.bans)
			});
		});
	});
}
