var FlickrAPI= require('../lib/flickr').FlickrAPI;
var sys= require('sys');


var API_KEY= "put here"
var SHARED_SECRET= "put here"
var AUTHENTICATION_TOKEN= "put here"


var flickr= new FlickrAPI(API_KEY, SHARED_SECRET);
flickr.setAuthenticationToken(AUTHENTICATION_TOKEN);
var args={};
args["is_public"] = "0";


flickr.upload.async("./test/girls.jpg","girls.jpg", args, function(err, ticketid) {
	sys.p(ticketid);
});