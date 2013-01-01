/*jshint laxcomma:true*/
/*global module*/
(function () {
  "use strict";

  function APIHelper (key, version, endpoint) {
    if (!key || !version) {
      throw "An API key and valid version must be supplied to use the Smugmug API.";
    }

    this.endpoint = endpoint || "json";
    this.APIKey   = key;
    this.version  = version;
    this.url = "http{secure}://api.smugmug.com/services/api/{endpoint}/{version}/?{params}&JSONCallback=?"
      .replace("{endpoint}", this.endpoint)
      .replace("{version}", this.version);
  }

  APIHelper.prototype = {
    getSessionID: function () {
      return this.SessionID;
    }
    ,setParamFn: function (fn) {
      this.param = fn;

      return this;
    }
    ,setSessionID: function (id) {
      if (!id) {
        throw "A SessionID must be passed in to set it on the object";
      }

      this.SessionID = id;

      return this;
    }
  };

  function configForCallToAPI (method, params, https) {
    /*jshint validthis:true */
    params = params || {};
    params.method = method;
    params.APIKey = params.APIKey || this.APIKey;

    if (this.SessionID && !params.SessionID) {
      params.SessionID = this.SessionID;
    }

    var u = this.url.replace("{secure}", (!!https ? "s" : ""));
    
    if (this.param) {
      return u.replace("{params}", this.param(params));
    } else {
      return {
        "params": params
        ,"url": u
      };
    }
  }

  function hAPIness (key, version) {
    var helper = new APIHelper(key, version)
      , versions = {
        "1.2.2": [
          "albums.applyWatermark"
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
          ,"login.anonymously"
          ,"login.withHash"
          ,"login.withPassword"
          ,"logout"
          ,"printmarks.create"
          ,"printmarks.delete"
          ,"printmarks.get"
          ,"printmarks.getInfo"
          ,"printmarks.modify"
          ,"products.get  deprecated"
          ,"service.ping"
          ,"sharegroups.albums.add"
          ,"sharegroups.albums.get"
          ,"sharegroups.albums.remove"
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
          ,"watermarks.getInfo"
        ]
        ,"1.3.0": [
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
        };

    if (versions[version]) {
      versions[version]
        .reduce(function (acc, fn) {
          var namespace = fn.split(".")
            , last = namespace.pop();

          namespace.reduce(function (acc, part) {
            return (acc[part] = acc[part] || {});
          }, acc)[last] = configForCallToAPI.bind(helper, "smugmug." + fn);

          return acc;
        }, helper);
    } else {
      throw "Version '{version}' not available in [{keys}]."
        .replace("{version}", version)
        .replace("{keys}", Object.keys(versions).join(","));
    }

    return helper;
  }

  typeof module === "undefined" ? this.hAPIness = hAPIness : module.exports = hAPIness;
}.call(this));