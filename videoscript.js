function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'videos.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var result;

document.addEventListener('DOMContentLoaded', function () {
    program.init(result);
});

var qs = (function(a) {
    if (a == '') return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = '';
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
})(window.location.search.substr(1).split('&'));
<<<<<<< HEAD
console.log(currfield + " Current URL");
var getMyID = qs["video"];
console.log(getMyID+ " MYID");
//QS

var buttonDiv = document.createElement("div");
=======
var getMyID = qs['video'];
>>>>>>> f6df250c42b4d1965f61008da8a63f158bff25f4

function PlayOrPause() {// eslint-disable-line
    var getVideo = document.querySelector('video');
    if (getVideo.paused) {
        getVideo.play();
        document.images['jsbuttonplay'].src= '/img/pause.svg';
        return true;
    } else {
        getVideo.pause();
        document.images['jsbuttonplay'].src = '/img/play.svg';
        return true;
    }
}

function MuteOrUnmute() {// eslint-disable-line
    var getVideo = document.querySelector('video');
    if (getVideo.muted === false) {
        getVideo.muted = true;
        document.images['jsbuttonmute'].src = './img/unmute.svg';
        return true;
    } else {
        getVideo.muted = false;
        document.images['jsbuttonmute'].src= './img/mute.svg';
        return true;
    }
}

function RewindVideo() {// eslint-disable-line
    var getVideo = document.querySelector('video');
    var curtime = getVideo.currentTime;
    if(curtime >= 3) {
        getVideo.currentTime += -3;
    } else {
        getVideo.currentTime = 0;
    }  
}

<<<<<<< HEAD
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
=======
function ForwardVideo(){// eslint-disable-line
    var getVideo = document.querySelector('video');
    var curtime = getVideo.currentTime;
    if(curtime <= getVideo.duration-3) {
>>>>>>> f6df250c42b4d1965f61008da8a63f158bff25f4
        getVideo.currentTime += 3;
    } 
}
function FullscreenVideo(){// eslint-disable-line
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
        var videoDiv = document.createElement('div');
        var videoElement = document.createElement('video');
        var videoSource = document.createElement('source');
    
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
            result = document.querySelector('.col');
            show(video);
        });
    }

    return {
        init: init
    };
})();
