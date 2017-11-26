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
    var divname = ["Mynd:", "Lengd:", "Titill:", "Gert:"];
    var divcontent = [video.poster, video.duration, video.title, video.created];
    for (var i = 0; i < divcontent.length; i++) {
      if (i === 0) {
        //Mynd
        var a = document.createElement("a");
        var img = document.createElement("img");
        a.href = "http://youtube.com";
        img.src = divcontent[i];
        a.appendChild(img);
        div.appendChild(a);
      }
      else if (i === 1) {
        //lengd
        var divc = document.createElement("div");
        divc.innerHTML = divcontent[i];
        div.appendChild(divc);
      }
      else if (i === 2) {
        //Titill
        var divc = document.createElement("div");
        divc.innerHTML = divcontent[i];
        div.appendChild(divc);
      }
      else {
        //Gert
        var divc = document.createElement("div");
        divc.innerHTML = "Myndband búið til " + divcontent[i];
        div.appendChild(divc);
      }
    }
    result.appendChild(div);
  }

  function init() {
    loadJSON(function(response) {
      var videodata = JSON.parse(response);
      var video = videodata.videos;
      result = document.querySelector("div");
      for (var i = 0; i < video.length; i++) {
        show(videodata.videos[i]);
      }
    });
  }

  return {
    init: init
  }
})();
