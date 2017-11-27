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


var currfield = window.location.search;

var qs = (function(a) {
  if (a == "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i)
  {
      var p=a[i].split('=', 2);
      if (p.length == 1)
          b[p[0]] = "";
      else
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));
console.log(currfield + " Current URL");
var getMyID = qs["video"];
console.log(getMyID+ " MYID");
//QS



var buttonDiv = document.createElement("div");

function changePlayImage()
{
document.images["jsbutton"].src= "./img/play.svg";
return true;
}
function changePauseImageBack()
{
 document.images["jsbutton"].src = "./img/pause.svg";
 return true;
}

var program = (function() {

  function show(video) {
    var videoDiv = document.createElement("div");
    var videoElement = document.createElement("video");
    var videoSource = document.createElement("source");
    var videoPlayButton = document.createElement("button");
    videoPlayButton.setAttribute('class', 'play');
 
    var getVideoPath = video[getMyID].video;
    videoSource.src = getVideoPath;


    videoElement.appendChild(videoSource);
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(videoPlayButton);
    result.appendChild(videoDiv);


    var getVideo = document.querySelector('video');
    var videoPlayButton = document.querySelector('.play');

    videoPlayButton.addEventListener('click', function () {
      if (getVideo.paused) {
        getVideo.play();
        videoPlayButton.removeChild(videoPlayButton.firstChild);
        videoPlayButton.appendChild(document.createTextNode('Pause'));
      } else {
        getVideo.pause();
        videoPlayButton.removeChild(videoPlayButton.firstChild);
        videoPlayButton.appendChild(document.createTextNode('Play'));
      }
    });
  }
  
   
  function init() {
    loadJSON(function(response) {
      var videodata = JSON.parse(response);
      var video = videodata.videos;
      result = document.querySelector("div");
      show(video);
    });
  }

  return {
    init: init
  }
})();
