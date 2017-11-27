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
    //play
    var videoPlayButton = document.createElement("button");
    videoPlayButton.setAttribute('class', 'play');
    //mute
    var videoSoundButton = document.createElement("button");
    videoSoundButton.setAttribute('class', 'sound');
    //rewind
    var videoRewindButton = document.createElement("button");
    videoRewindButton.setAttribute('class', 'rewind');
    //forward
    var videoForwardButton = document.createElement("button");
    videoForwardButton.setAttribute('class', 'forward');
    //fullscreen
    var videoFullscreenButton = document.createElement("button");
    videoFullscreenButton.setAttribute('class', 'fullscreen');

 
    var getVideoPath = video[getMyID].video;
    videoSource.src = getVideoPath;


    videoElement.appendChild(videoSource);
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(videoPlayButton);
    videoDiv.appendChild(videoSoundButton);
    videoDiv.appendChild(videoRewindButton);
    videoDiv.appendChild(videoForwardButton);
    videoDiv.appendChild(videoFullscreenButton);
    result.appendChild(videoDiv);


    var getVideo = document.querySelector('video');
    var videoPlayButton = document.querySelector('.play');
    var videoSoundButton = document.querySelector('.sound');
    var videoRewindButton = document.querySelector('.rewind');
    var videoForwardButton = document.querySelector('.forward');
    var videoFullscreenButton = document.querySelector('.fullscreen');
    //play
    videoPlayButton.addEventListener('click', function () {
      if (getVideo.paused) {
        getVideo.play();
      } else {
        getVideo.pause();
      }
    });
    //mute
    videoSoundButton.addEventListener('click', function () {
      if (getVideo.muted === false) {
        getVideo.muted = true;
      } else {
        getVideo.muted = false;
      }
    });
    //rewind
    videoRewindButton.addEventListener('click', function () {
      var curtime = getVideo.currentTime;
      if(curtime >= 3) {
        getVideo.currentTime += -3;
      } else {
        getVideo.currentTime = 0;
      }  
    });
    //forward
    videoForwardButton.addEventListener('click', function () {
      var curtime = getVideo.currentTime;
      if(curtime <= video[getMyID].duration-3) {
        console.log(getVideo.currentTime);
        getVideo.currentTime += 3;
      } else {
        console.log(getVideo.currentTime);
        console.log("video is has less than three seconds left.")
      }  
    });
    //fullscreen
    videoFullscreenButton.addEventListener('click', function () {
      if(getVideo.requestFullscreen) {
        getVideo.requestFullscreen();
      } else if (getVideo.mozRequestFulscreen) {
        getVideo.mozRequestFulscreen();
      } 
      else if (getVideo.webkitRequestFullScreen) {
        getVideo.webkitRequestFullScreen();
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
