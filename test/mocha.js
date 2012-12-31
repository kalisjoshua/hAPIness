/*jshint laxcomma:true strict:false*/
/*globals describe it module require*/

var assert = require("chai").assert
  , Smugmug = require("../smugmug.api");

describe("SmugmugAPI", function () {
  it("should be a function.", function () {
    assert.isFunction(Smugmug);
  });

  it("should require arguments", function () {
    assert.throws(Smugmug, "No passed arguments is not valid.");

    assert.throws(function () {
      Smugmug("12345");
    }, "An API version must be supplied.");
    
    assert.throws(function () {
      Smugmug("12345", "1");
    }, "The version passed must be valid.");
  });
});