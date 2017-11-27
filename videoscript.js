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

var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};

document.addEventListener('DOMContentLoaded', function () {
    program.init(result);
});

var thisOne = getQueryString(string);
console.log(thisOne);

var buttonDiv = document.createElement("div");
result

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
   
      function init() {
        loadJSON(function(response) {
          var videodata = JSON.parse(response);
          var video = videodata.videos;
          var videoCatagories = videodata.categories;
          result = document.querySelector("div");
          show(video, videoCatagories);
        });
      }
    
      return {
        init: init
      }
    })();
