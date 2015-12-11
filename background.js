var waitOperate = false;

function operateData(data, bans, goPage) {
		var location = data.id;
		var newBans = [];
		for (var x=0;x<bans.length;x++) 
		{
			if (data.id !== location)
			newBans.push(bans[x]);
		}							
		
		chrome.storage.local.set({bans: newBans}, function () {
			if (goPage === true) {
				var url = 'https://www.facebook.com/'+location;
				chrome.tabs.executeScript(null,  {code:"location.href='"+url+"'"});
				waitOperate = false;
			} else {
				waitOperate = false;
			}
		});
}

function blockAction() {
	
	if (waitOperate) return;
	
	 chrome.storage.local.get({bans: []}, function (result) {
		var bans = result.bans;
		var waitOperate = false;
		var location = '';
		for (var i=0;i<bans.length;i++) 
		{
			var d = new Date(bans[i].date);
			if (new Date()> d) {
				waitOperate = true;
				var r = confirm(bans[i].name + ' engellenmeye hazır. Şimdi engellemek ister misin?');
				operateData(bans[i], bans, r);
				break;
			} 
		}
	 });
}

setInterval(blockAction, 1000);
