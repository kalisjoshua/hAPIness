/*jshint laxcomma:true strict:false*/
/*globals describe it module require*/

var assert = require("chai").assert
  , http = require("http")
  , key = (require("fs")).readFileSync("./api.key", "UTF-8")
  , qs = require("querystring")
  , smugmug_builder = require("../smugmug.api")
  , url_parser = require("url");

describe("SmugmugAPI", function () {
  it("should be a function.", function () {
    assert.isFunction(smugmug_builder);
  });

  it("should require arguments", function () {
    assert.throws(smugmug_builder, "No passed arguments is not valid.");

    assert.throws(function () {
      smugmug_builder("12345");
    }, "An API version must be supplied.");
    
    assert.throws(function () {
      smugmug_builder("12345", "1");
    }, "The version passed must be valid.");
  });

  it("should not throw an error", function () {
    assert.doesNotThrow(function () {
      smugmug_builder("1234", "1.3.0");
    }, "The version is valid even though the API key hasn't been tested.");
  });

  describe("Methods", function () {
    it("should have API version 1.3.0 methods defined.", function() {
      var api = smugmug_builder("1234", "1.3.0");
      assert(api.accounts.browse, "Smugmug.accounts.browse should exist");
      assert(api.sharegroups.albums.remove, "Smugmug.sharegroups.albums.remove should exist");
      assert(api.coupons.restrictions.albums.add, "Smugmug.coupons.restrictions.albums.add should exist");
    });

    it("should have API version 1.2.2 methods defined.", function() {
      var api = smugmug_builder("1234", "1.2.2");
      assert(api.albums.applyWatermark, "Smugmug.albums.applyWatermark should exist");
      assert(api.coupons.create, "Smugmug.coupons.create should exist");
      assert(api.login.anonymously, "Smugmug.login.anonymously should exist");
    });
  });

  describe("Parameterization configuration", function () {
    var smugmug = smugmug_builder(key, "1.2.2");

    it("should be null by default.", function () {
      assert.isUndefined(smugmug.params, "No default parameterization provided.");
    });

    it("should be injectable.", function () {
      assert(smugmug.setParamFn, "Set method for parameterization.");
      assert.isUndefined(smugmug.param, "Default param method is undefined.");
      smugmug.setParamFn(qs.stringify);
      assert(smugmug.param, "Default param method is set.");
    });

    it("should now return a string as the request url and not an object with params.", function () {
      assert.isUndefined(smugmug.service.ping().params, "String object does not have property 'params'.");
      assert(/string/i.test({}.toString.call(smugmug.service.ping())), "Call should return a String.");
    });
  });

  // describe("Requests", function () {
  //   var smugmug = smugmug_builder(key, "1.2.2")
  //     , config = smugmug.service.ping()
  //     , url = config.url
  //       .replace("{params}", qs.stringify(config.params))
  //     , request_obj = url_parser.parse(url);

  //   it("should get a response from a url.", function (done) {
  //     function complete (response) {
  //       var m = '';

  //       response.on("data", function (chunk) {
  //         m += chunk;
  //       });

  //       response.on("end", function () {
  //         console.log(m);
  //         done();
  //       });
  //     }

  //     http
  //       .request({
  //         host: request_obj.host
  //         ,path: request_obj.path
  //       }, complete)
  //       .end();
  //   });
  // });
});