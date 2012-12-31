/*jshint laxcomma:true strict:false*/
/*globals describe it module require*/

var assert = require("chai").assert
  , Smugmug = require("../smugmug.api");

describe("Smugmug API", function () {
  it("should be a function that returns an object", function () {
    assert(Smugmug);
  });
});