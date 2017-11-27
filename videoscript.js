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

var myimgobj = document.images["jsbutton"];

var buttonDiv = document.createElement("div");

function changePlayImage()
{
document.images["jsbuttonplay"].src= "/img/play.svg";
return true;
}
function changePauseImage()
{
 document.images["jsbuttonplay"].src = "/img/pause.svg";
 return true;
}

function changeMuteImage()
{
document.images["jsbuttonmute"].src= "./img/mute.svg";
return true;
}
function changeUnmuteImage()
{
 document.images["jsbuttonmute"].src = "./img/unmute.svg";
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

    var buttonImage = document.createElement("img");
    buttonImage.scr = "./img/pause.svg";

    videoPlayButton.appendChild(buttonImage);
    
    var getVideoPath = video[getMyID].video;
    videoSource.src = getVideoPath;
    
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(videoPlayButton);
    videoDiv.appendChild(videoSoundButton);
    videoDiv.appendChild(videoRewindButton);
    videoDiv.appendChild(videoForwardButton);
    videoDiv.appendChild(videoFullscreenButton);

    videoElement.appendChild(videoSource);
    result.appendChild(videoDiv);


    var getVideo = document.querySelector('video');
    var videoPlayButton = document.querySelector('.play');
    var videoSoundButton = document.querySelector('.sound');
    var videoRewindButton = document.querySelector('.rewind');
    var videoForwardButton = document.querySelector('.forward');
    var videoFullscreenButton = document.querySelector('.fullscreen');
    //play
    /*
    function PauseOrPlay() {
      if (getVideo.paused) {
        getVideo.play();
        videoPlayButton.class='playImageButton';
      } else {
        getVideo.pause();
        videoPlayButton.class='pauseImageButton';
      }
    }
    */
    videoPlayButton.addEventListener('click', function () {
      if (getVideo.paused) {
        getVideo.play();
        changePauseImage();
      } else {
        getVideo.pause();
        changePlayImage();
      }
    });
    
    //mute

    videoSoundButton.addEventListener('click', function () {
      if (getVideo.muted === false) {
        getVideo.muted = true;
        changeUnmuteImage();
      } else {
        getVideo.muted = false;
        changeMuteImage();
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
      result = document.querySelector(".col");
      show(video);
    });
  }

  return {
    init: init
  }
})();
