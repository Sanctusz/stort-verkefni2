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

var result;

document.addEventListener('DOMContentLoaded', function () {
  program.init(result);
});

var program = (function() {

  function show(video) {
    var div = document.createElement("div");
    var divname = ["ID:", "Titill:", "Gert:", "Lengd:", "Mynd:", "Myndband:"];
    var divcontent = [video.id, video.title, video.created, video.duration, video.poster, video.video];
    for (var i = 0; i < divname.length; i++) {
      var divn = document.createElement("div");
      var divc = document.createElement("div");
      divn.innerHTML = divname[i];
      divc.innerHTML = divcontent[i];
      console.log(divname);
      div.appendChild(divn);
      div.appendChild(divc);
    }
    result.appendChild(div);
  }

  function init() {
    loadJSON(function(response) {
      // Parse JSON string into object
      var videodata = JSON.parse(response);
      var video = videodata.videos;
      result = document.querySelector("div");
      console.log("LOADED");
      console.log("Video nr 1 er:" + video[0].title);
      show(videodata.videos[0]);
    });
  }

  return {
    init: init
  }
})();
