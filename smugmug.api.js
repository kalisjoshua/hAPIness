(function () {

  function callAPI (method, params, callback, https) {
      // params.method
      // params.APIKey
      // params.SessionID
  
      var url =
          "http" + (https ? "s" : "") + "://api.smugmug.com" +
          Smugmug.EndPoint[Smugmug.Version] +
          "?" + $.param(params) +
          (Smugmug.Version > "1.2.1" ? "&Callback=?" : "&JSONCallback=?");
      
      $.ajax({
          "data": null,
          "dataType": "jsonp",
          "success": callback,
          "url": url
      });
  };

  var _api_key
    , _session_id
    , Smugmug = [
      "accounts.browse"
      ,"albums.applyWatermark"
      ,"albums.browse"
      ,"albums.changeSettings"
      ,"albums.comments.add"
      ,"albums.comments.get"
      ,"albums.create"
      ,"albums.delete"
      ,"albums.get"
      ,"albums.getInfo"
      ,"albums.getStats"
      ,"albums.removeWatermark"
      ,"albums.reSort"
      ,"albumtemplates.changeSettings"
      ,"albumtemplates.create"
      ,"albumtemplates.delete"
      ,"albumtemplates.get"
      ,"auth.checkAccessToken"
      ,"auth.getAccessToken"
      ,"auth.getRequestToken"
      ,"categories.create"
      ,"categories.delete"
      ,"categories.get"
      ,"categories.rename"
      ,"communities.get"
      ,"coupons.create"
      ,"coupons.get"
      ,"coupons.getInfo"
      ,"coupons.modify"
      ,"coupons.restrictions.albums.add"
      ,"coupons.restrictions.albums.remove"
      ,"family.add"
      ,"family.get"
      ,"family.remove"
      ,"family.removeAll"
      ,"fans.get"
      ,"featured.albums.get"
      ,"friends.add"
      ,"friends.get"
      ,"friends.remove"
      ,"friends.removeAll"
      ,"images.applyWatermark"
      ,"images.changePosition"
      ,"images.changeSettings"
      ,"images.collect"
      ,"images.comments.add"
      ,"images.comments.get"
      ,"images.crop"
      ,"images.delete"
      ,"images.get"
      ,"images.getEXIF"
      ,"images.getInfo"
      ,"images.getStats"
      ,"images.getURLs"
      ,"images.removeWatermark"
      ,"images.rotate"
      ,"images.uploadFromURL"
      ,"images.zoomThumbnail"
      ,"printmarks.create"
      ,"printmarks.delete"
      ,"printmarks.get"
      ,"printmarks.getInfo"
      ,"printmarks.modify"
      ,"service.ping"
      ,"sharegroups.albums.add"
      ,"sharegroups.albums.get"
      ,"sharegroups.albums.remove"
      ,"sharegroups.browse"
      ,"sharegroups.create"
      ,"sharegroups.delete"
      ,"sharegroups.get"
      ,"sharegroups.getInfo"
      ,"sharegroups.modify"
      ,"styles.getTemplates"
      ,"subcategories.create"
      ,"subcategories.delete"
      ,"subcategories.get"
      ,"subcategories.getAll"
      ,"subcategories.rename"
      ,"themes.get"
      ,"users.getInfo"
      ,"users.getStats"
      ,"users.getTree"
      ,"watermarks.changeSettings"
      ,"watermarks.create"
      ,"watermarks.delete"
      ,"watermarks.get"
      ,"watermarks.getInfo"]
        .reduce(function (acc, fn) {
          var namespace = fn.split(".")
            , last = namespace.pop();

          namespace.reduce(function (acc, part) {
            return (acc[part] = acc[part] || {});
          }, acc)[last] = id.bind("smugmug." + fn);

          return acc;
        }, {});

  Smugmug.call = callAPI;

  Smugmug.setAPIkey = function (key) {
    _api_key = key;
  };

  Smugmug.setSessionID = function (id) {
    _session_id = id;
  };

  return Smugmug;
}());