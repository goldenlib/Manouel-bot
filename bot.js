const Twit = require('twit');
const config = require('./config.js');

var T = new Twit({

  consumer_key:         config.consumer_key,

  consumer_secret:      config.consumer_secret,

  access_token:         config.access_token,

  access_token_secret:  config.access_token_secret,

})


T.post("statuses/update", {status: "Pardon, mais qui êtes-vous ?"});

try {
var stream = T.stream('statuses/filter', {follow :"70385068"})
} catch(err) {
console.log(err)
}

stream.on('tweet',function(tweet) {
	if (tweet.user.screen_name != 'Mettez votre pseudo ici sinon il va vous repondre a vous meme'){
		var filePath = 'pardon.jpg'
		T.postMediaChunked({ file_path: filePath }, function (err, data, response) {
			T.post("statuses/update",{status:"@" + tweet.user.screen_name + " Pardon, mais qui êtes-vous ?", in_reply_to_status_id:tweet.id_str, media_ids: [data.media_id_string]})
console.log(data)
		})
	}
})