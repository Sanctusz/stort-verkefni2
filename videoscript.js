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

function PlayOrPause() {
  var getVideo = document.querySelector('video');
  if (getVideo.paused) {
    getVideo.play();
    document.images["jsbuttonplay"].src= "/img/play.svg";
    return true;
  } else {
    getVideo.pause();
    document.images["jsbuttonplay"].src = "/img/pause.svg";
    return true;
  }
}

function PlayOrPause() {
  var getVideo = document.querySelector('video');
  if (getVideo.paused) {
    getVideo.play();
    document.images["jsbuttonplay"].src= "/img/pause.svg";
    return true;
  } else {
    getVideo.pause();
    document.images["jsbuttonplay"].src = "/img/play.svg";
    return true;
  }
}

function MuteOrUnmute() {
  var getVideo = document.querySelector('video');
  if (getVideo.muted === false) {
    getVideo.muted = true;
    document.images["jsbuttonmute"].src = "./img/unmute.svg";
    return true;
  } else {
    getVideo.muted = false;
    document.images["jsbuttonmute"].src= "./img/mute.svg";
    return true;
  }
}

function RewindVideo() {
  var getVideo = document.querySelector('video');
  var curtime = getVideo.currentTime;
  if(curtime >= 3) {
    getVideo.currentTime += -3;
  } else {
    getVideo.currentTime = 0;
  }  
}

function ForwardVideo(){
  var getVideo = document.querySelector('video');
  var curtime = getVideo.currentTime;
      if(curtime <= getVideo.duration-3) {
        console.log(getVideo.currentTime);
        getVideo.currentTime += 3;
      } 
}
function FullscreenVideo(){
  var getVideo = document.querySelector('video');
  if(getVideo.requestFullscreen) {
    getVideo.requestFullscreen();
  } else if (getVideo.mozRequestFulscreen) {
    getVideo.mozRequestFulscreen();
  } 
  else if (getVideo.webkitRequestFullScreen) {
    getVideo.webkitRequestFullScreen();
  }  
}

var program = (function() {

  function show(video) {
    var videoDiv = document.createElement("div");
    var videoElement = document.createElement("video");
    var videoSource = document.createElement("source");
    
    var getVideoPath = video[getMyID].video;
    videoSource.src = getVideoPath;
    
    videoDiv.appendChild(videoElement);
    videoElement.appendChild(videoSource);
    result.appendChild(videoDiv);
  }
   
  function init() {
    loadJSON(function(response) {
      var videodata = JSON.parse(response);
      var video = videodata.videos;
      result = document.querySelector(".col");
      show(video);
    });
  }

  return {
    init: init
  }
})();
