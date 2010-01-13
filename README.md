# flickrnode

A lightweight API that leverages the asynchronous nature of node.js to interface with flickr.

## Usage
The API should be compatible with the actual Flickr API as documented here (http://www.flickr.com/services/api/). 
There are also some utility methods implemented that enable easier usage of the responses and for helping with the authentication model.

### Using Non authenticated methods
When constructing API calls that require no authentication (or no signing) then the simplest instantiation of 
the FlickrAPI should be used for example:

    var FlickrAPI= require('flickr').FlickrAPI;
    var sys= require('sys');
    var flickr= new FlickrAPI(your_api_key_here);
   
    // Search for photos with a tag of 'badgers'
    flickr.photos.search(undefined,'badgers' ).addErrback(fail).addCallback(function(results) {
        sys.puts(sys.inspect(result));
    });

### Using methods that require signing
When executing methods that require signing (and for methods that require authentication) you must also provide your 'shared secret key':

    var FlickrAPI= require('flickr').FlickrAPI;
    var sys= require('sys');
    var flickr= new FlickrAPI(your_api_key_here, your_shared_secret_key);

    // Get hold of a 'frob' (requires the method to be signed, does not require authentication)
    flickr.auth.getFrob().addErrback(fail).addCallback(function(frob) {
        sys.puts("FROB: "+ sys.inspect(frob)); 
    });

### Using methods that require authentication
Some methods require the API calls to have been previously authenticated, the process of authentication is non-sequential and involves the end-user,
for details of how to properly implement this please see: http://www.flickr.com/services/api/auth.spec.html The relevant code snippets follow:

#### Getting the URL and 'frob' that can be used to get hold of an authenticated session
    var FlickrAPI= require('flickr').FlickrAPI;
    var sys= require('sys');
    var flickr= new FlickrAPI(your_api_key_here, your_shared_secret_key);
    
    flickr.getLoginUrl("read").addErrback(fail).addCallback(function(url, frob) {
        // Make a note of the frob and inform the user they need to visit the url passed in here. ......
    });
    
#### Getting hold of an Authentication token after the user has visited (and accepted) the above url
Please note this method consumes the passed frob and should only be called once per session.
    var FlickrAPI= require('flickr').FlickrAPI;
    var sys= require('sys');
    var flickr= new FlickrAPI(your_api_key_here, your_shared_secret_key);
    
    flickr.auth.getToken(frob).addErrback(fail).addCallback(function(res){
        // Make a note res.token as this is what you will be using everywhere else.
    });
    
#### Setting the FlickrAPI up so that it is 'authenticated' 
    var FlickrAPI= require('flickr').FlickrAPI;
    var sys= require('sys');
    var flickr= new FlickrAPI(your_api_key_here, your_shared_secret_key, authentication_token);

    // This method requires authentication
    flickr.blogs.getList().addErrback(fail).addCallback(function(foo) {
        sys.puts(sys.inspect(foo));
    });

#### Setting the FlickrAPI up so that it is 'authenticated' (alternative approach)
        var FlickrAPI= require('flickr').FlickrAPI;
        var sys= require('sys');
        var flickr= new FlickrAPI(your_api_key_here, your_shared_secret_key);
        flickr.setAuthenticationToken(authentication_token);

        // This method requires authentication
        flickr.blogs.getList().addErrback(fail).addCallback(function(foo) {
            sys.puts(sys.inspect(foo));
        });