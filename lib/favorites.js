var Favorites= function Favorites(request) {
    this._request= request;
};

Favorites.prototype.getPublicList= function(user_id, callback){
      this._request.executeRequest("flickr.favorites.getPublicList",
                                         {"user_id": user_id}, false, null, callback);
};

exports.Favorites= Favorites;
