# SmugMug hAPIness

The hAPIness function wraps the complexities of creating valid and usable URLs for requests to the Smugmug API by requiring only the necessary information and allows for dependancy injection if desired for easier use.

AN API is great for providing access to data but interacting with one is not something that is fun for us humans.

## Dependancies

NONE! Well, JavaScript.

The library doesn't have any external dependancies; this does also mean that it doesn't actually do any ajax requests for you or parameter string creation, you'll need to provide that based on your library of choice.

## Usage

First, you will need to include the `hAPIness.js` file in you project somehow; be that"

```
<script src="hAPIness.js"></script>
```

or via some other method.

Then, you will need to configure it for your use.

```
// use smugmug as the variable name to make you code fit the
// API methods SmugMug provides; e.g. smugmug.albums.get()
var smugmug = hAPIness("myAPIkey", "1.3.0");

// if you like using jQuery I suggest
// this gives hAPIness the ability to fully create URLs for you
hAPIness.setParamFn($.param);

// now hAPIness can create URLs for you to use in ajax calls
// again if you are using jQuery for ajax
$.ajax({
  dataType: "jsonp"
  ,success: function (data) {
    // data.Albums is an array of all user's albums
  })
  ,url: smugmug.albums.get({NickName: "SmugMug_username"})
});
```