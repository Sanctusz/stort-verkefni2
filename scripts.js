<<<<<<< HEAD
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'videos.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
  console.log("json connected");
}

document.addEventListener('DOMContentLoaded', function () {
  program.init();
});

var program = (function() {

  function init() {
    loadJSON(function(response) {
      // Parse JSON string into object
      var videodata = JSON.parse(response);
      var video = videodata.videos;
      console.log("LOADED");
      console.log(video[0].title);
    });
  }

  return {
    init: init
  }
})();
=======
var API_URL = '/video.json?id=';
>>>>>>> 3c4fc688ebffd37f4c7e8514289ed521e1a44fd0
