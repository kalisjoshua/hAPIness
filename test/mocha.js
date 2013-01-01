/*jshint laxcomma:true strict:false*/
/*globals describe it module require*/

var assert = require("chai").assert
  , http = require("http")
  , key = (require("fs")).readFileSync("./api.key", "UTF-8")
  , qs = require("querystring")
  , hAPIness = require("../hAPIness")
  , url_parser = require("url");

function complete (done) {
  return function (response) {
    var data = '';

    response.on("data", function (chunk) {
      data += chunk;
    });
    response.on("end", function () {
      done(data);
    });
  };
}

describe("Smugmug API URL Helper", function () {
  it("should be a function.", function () {
    assert.isFunction(hAPIness);
  });

  it("should require arguments", function () {
    assert.throws(hAPIness, "No passed arguments is not valid.");

    assert.throws(function () {
      hAPIness("12345");
    }, "An API version must be supplied.");
    
    assert.throws(function () {
      hAPIness("12345", "1");
    }, "The version passed must be valid.");
  });

  it("should not throw an error on valid arguments", function () {
    assert.doesNotThrow(function () {
      hAPIness("1234", "1.3.0");
    }, "The version is valid even though the API key hasn't been tested.");
  });

  describe("API version methods", function () {
    it("should have API version 1.3.0 methods defined.", function() {
      var smugmug = hAPIness("1234", "1.3.0");
      assert(smugmug.accounts.browse, "Smugmug.accounts.browse should exist");
      assert(smugmug.sharegroups.albums.remove, "Smugmug.sharegroups.albums.remove should exist");
      assert(smugmug.coupons.restrictions.albums.add, "Smugmug.coupons.restrictions.albums.add should exist");
    });

    it("should have API version 1.2.2 methods defined.", function() {
      var smugmug = hAPIness("1234", "1.2.2");
      assert(smugmug.albums.applyWatermark, "Smugmug.albums.applyWatermark should exist");
      assert(smugmug.coupons.create, "Smugmug.coupons.create should exist");
      assert(smugmug.login.anonymously, "Smugmug.login.anonymously should exist");
    });
  });

  describe("Parameterization configuration", function () {
    var smugmug = hAPIness(key, "1.2.2");

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

  describe("Ping requests", function () {
    it("should work, with no param config.", function (done) {
      var smugmug = hAPIness(key, "1.2.2")
        , config = smugmug.service.ping()
        , url = config.url
          .replace("{params}", qs.stringify(config.params))
        , request_obj = url_parser.parse(url);

      http
        .request({
          host: request_obj.host
          ,path: request_obj.path
        }, complete(function (data) {
          data = JSON.parse(data);
          assert.equal(data.stat, "ok", "The status returned should be 'ok'.");
          done();
        }))
        .end();
    });

    it("should work, with param.", function (done) {
      var smugmug = hAPIness(key, "1.2.2")
            .setParamFn(qs.stringify)
        , request_obj = url_parser.parse(smugmug.service.ping());

      http
        .request({
          host: request_obj.host
          ,path: request_obj.path
        }, complete(function (data) {
          data = JSON.parse(data);
          assert.equal(data.stat, "ok", "The status returned should be 'ok'.");
          done();
        }))
        .end();
    });

    it("should work, without request config cleaning.", function (done) {
      var url = hAPIness(key, "1.2.2")
            .setParamFn(qs.stringify)
            .service.ping();

      http
        .request(url_parser.parse(url), complete(function (data) {
          data = JSON.parse(data);
          assert.equal(data.stat, "ok", "The status returned should be 'ok'.");
          done();
        }))
        .end();
    });
  });

  describe("Anonymous Login (1.2.2)", function () {
    var smugmug = hAPIness(key, "1.2.2")
          .setParamFn(qs.stringify);

    it("should get a Session.id from Smugmug.", function (done) {
      http
        .request(url_parser.parse(smugmug.login.anonymously({pretty: true, strict: true})), complete(function (data) {
          data = JSON.parse(data);

          assert.equal(data.stat, "ok", "The status returned should be 'ok'.");
          assert(data.Login.Session.id, "Smugmug returned a session id.");
          
          done();
        }))
        .end();
    });

    it("should be stored by hAPIness for use with methods that require it.", function (done) {
      http
        .request(url_parser.parse(smugmug.login.anonymously({pretty: true, strict: true})), complete(function (data) {
          data = JSON.parse(data);

          smugmug.setSessionID(data.Login.Session.id);

          assert.equal(data.Login.Session.id, smugmug.getSessionID(), "The getSessionID method should return the SessionID.");
          
          done();
        }))
        .end();
    });
  });

  describe("Authenticated requests", function () {});
});