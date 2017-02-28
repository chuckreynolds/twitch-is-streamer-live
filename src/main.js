/**
 * Twitch api call to see if a stream is live and pull info
 * repo: github.com/chuckreynolds/twitch-is-streamer-live
 *
 * This is the customization script that uses the library
 */
document.addEventListener("DOMContentLoaded", function(event) {

	// get your clientID here: https://www.twitch.tv/kraken/oauth2/clients/new
	let twitch               = new TwitchClient('<your-clientID-here>');

	// twitch username/channelname to use
	var tw_username          = '<twitch-username-here>';

	var tw_game              = [];
	var tw_viewers           = [];
	var tw_channel_url       = [];
	var tw_channel_followers = [];
	var tw_channel_views     = [];

	// runs main stream and channel checks and returns info to page
	populateTwitchInfo(twitch, tw_username);

	// loop populateTwitchInfo every 30s but cap at 1000 checks
	var count = 0;
	var loop  = setInterval(function() {
		populateTwitchInfo(twitch, tw_username);
		count++;
		if (count >= 1000) {
			clearInterval(loop);
		}
	}, 30000);

	// runs channel info only, added this to keep channel console info out of the loop, just check it on refresh
	populateTwitchChannelInfo(twitch, tw_username);

});

/**
 * Pull stream and channel info and output info if we are live
 */
function populateTwitchInfo(twitch, tw_username) {
	Promise.all([
		twitch.getChannelInfo(tw_username),
		twitch.getStreamInfo(tw_username)
	])
	.then(data => {
		var channelInfo = data[0];
		var streamInfo  = data[1];
		//console.log(streamInfo);

		var tw_channel_url         = channelInfo.url;
		var tw_channel_followers   = channelInfo.followers;
		var tw_channel_views       = channelInfo.views;
		var tw_channel_status      = channelInfo.status;
		var tw_channel_displayname = channelInfo.display_name;
		var liveMessage            = document.getElementById("twitch");

		// are we live?
		if (!!streamInfo.stream) {
			// live? YES
			var tw_game    = streamInfo.stream.game;
			var tw_viewers = streamInfo.stream.viewers;
			var tw_preview = streamInfo.stream.preview.medium;

			liveMessage.innerHTML = '<a href="' + tw_channel_url + '">' + tw_channel_displayname + ' is ONLINE!</a> Playing ' + tw_game + ' for ' + tw_viewers + ' viewers.'
								  + '<br>Title: ' + tw_channel_status
								  + '<br><img src="' + tw_preview + '">';
		} else {
			// live? NO
			return;
		}
	})
	.catch(err => {
		console.log(err);
	});
}

/**
 * Pull general info about the channel outside of the live loop
 */
function populateTwitchChannelInfo(twitch, tw_username) {
	Promise.all([
		twitch.getChannelInfo(tw_username)
	])
	.then(data => {
		var channelInfo = data[0];
		//console.log(channelInfo);

		console.log( 'channel followers: ' + channelInfo.followers );
		console.log( 'channel views: ' + channelInfo.views );

	})
	.catch(err => {
		console.log(err);
	});
}
