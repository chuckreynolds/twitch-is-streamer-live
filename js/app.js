/*
 * Twitch api call to see if a stream is live and pull info
 * repo: github.com/chuckreynolds/twitch-is-streamer-live
 */
$(document).ready(function() {
	getTwitchIntel();
});
function getTwitchIntel() {

	// twitch username/channelname to use
	var tw_streamer     = 'monstercat';
	// get your clientID here: https://www.twitch.tv/kraken/oauth2/clients/new
	var tw_api_clientID = '';

	/*
	 * get twitch stream info to see if live and pull data
	 */
	$.ajax({
		type:     'GET',
		dataType: 'json',
		url:      'https://api.twitch.tv/kraken/streams/' + tw_streamer,
		headers: {
			'Client-ID': tw_api_clientID
		},
		success: function(data) {

			// console.log( data ); // dev dump

			var tw_islive   = [];
			var tw_game     = [];
			var tw_viewers  = [];
			var tw_username = [];
			var tw_url      = [];

			// find out if channel is streaming or not
			if (data.stream === null || data.stream == undefined) {

				tw_islive   = false; // not live

				console.log( 'streaming:' + tw_islive );

			} else {

				tw_islive   = true; // live
				tw_url      = data.stream.channel.url;
				tw_game     = data.stream.game;
				tw_viewers  = data.stream.viewers;
				tw_username = data.stream.channel.display_name;

				console.log( 'streaming:' + tw_islive );

				// output to DOM
				var pageMessage = '<a href="' + tw_url + '">' + tw_username + ' is ONLINE!</a> Playing ' + tw_game + ' with ' + tw_viewers + ' viewers.' ;
				$("#twitch").append(pageMessage);

			}
		}
	});

	/*
	 * get twitch channel info for reference in console
	 */
	$.ajax({
		type:     'GET',
		dataType: 'json',
		url:      'https://api.twitch.tv/kraken/channels/' + tw_streamer,
		headers: {
			'Client-ID': tw_api_clientID
		},
		success: function(data) {

			// console.log( data ); // dev dump

			tw_channel_followers = data.followers;
			tw_channel_views     = data.views;
			console.log( 'channel followers: ' + tw_channel_followers );
			console.log( 'channel views: ' + tw_channel_views );

		}
	});

} // end getTwitchIntel()