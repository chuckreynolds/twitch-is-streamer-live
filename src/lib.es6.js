/**
 * Twitch api call to see if a stream is live and pull info
 * repo: github.com/chuckreynolds/twitch-is-streamer-live
 *
 * This is the library to make it all work; shouldn't have to mess with this at all.
 */
class TwitchClient {

	constructor(clientId) {
		this.clientId = clientId;
	}

	// we need the streams endpoint to see if live=true, and pull current game
	getStreamInfo(tw_username) {
		return this.ajax('https://api.twitch.tv/kraken/streams/' + tw_username, 'GET')
			.then(function(result) {
				return JSON.parse(result);
			});
	}

	// we pull from here even though /streams has it because we want some of this if live=false
	getChannelInfo(tw_username) {
		return this.ajax('https://api.twitch.tv/kraken/channels/' + tw_username, 'GET')
			.then(function(result) {
				return JSON.parse(result);
			});
	}

	// general ajax helper func, h/t github.com/kernelcurry
	ajax(url, method, data) {
		var self = this;
		return new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			request.responseType = 'text';
			request.onreadystatechange = function() {
				if (request.readyState === XMLHttpRequest.DONE) {
					if (request.status === 200) {
						resolve(request.responseText);
					} else {
						reject(Error(request.statusText));
					}
				}
			};
			request.onerror = function() {
				reject(Error("Network Error"));
			};
			request.open(method, url, true);
			request.setRequestHeader('Client-Id', self.clientId);
			request.send(data);
		});
	}
}