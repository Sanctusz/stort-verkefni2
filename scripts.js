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
  
    function show(video, cata) {
      var div = document.createElement("div");
      var divname = ["Mynd:", "Lengd:", "Titill:", "Gert:"];
      var divcontent = [video.poster, video.duration, video.title, video.created];
      for (var i = 0; i < cata.length; i++) { // this should be 0,1,2 or three catagories
        var cH2 = document.createElement("h2"); //create h2 element
        cH2.appendChild(document.createTextNode(cata[i].title)); //throw catagory title into h2 element
        div.appendChild(cH2)
        result.appendChild(div);
        var tempVid = cata[i].videos;
        for (var j = 0; j < tempVid.length; j++) { //this should be catagories and accessing videos
            var tempID = tempVid[j]; //get video ID for current j, for each id in 'videos' or cata[1]
            //insert video/placeholder images 
            var imageDiv = document.createElement("div");
            imageDiv.setAttribute('class', 'image');
            var a = document.createElement("a");
            var img = document.createElement("img");
            a.href = video[tempID-1].video;
            img.src = video[tempID-1].poster;
            imageDiv.appendChild(img);
            a.appendChild(imageDiv);
            div.appendChild(a);
            //insert Video title
            var cH3 = document.createElement("h3"); // create a h3 element
            cH3.appendChild(document.createTextNode(video[tempID-1].title)); // throw video title into h3 element
            div.appendChild(cH3)
            result.appendChild(div);
            //insert creation date
            var videoDuration = video[tempID-1].duration;
            if (videoDuration > 60) {
                //configure duraton
                var minutes = Math.floor(videoDuration / 60);
                var seconds = videoDuration - minutes * 60;
                var showDuration = minutes + ":" + seconds; 
                if (seconds < 10 && minutes < 10) {
                    var showDuration = "0" + minutes + ":0" + seconds;
                } else if(seconds < 10 && minutes > 9) {
                    var showDuration = minutes + ":0" + seconds;
                } else if (seconds > 10 && minutes < 10) {
                    var showDuration = "0" + minutes + ":" + seconds;
                }

            } else if (videoDuration < 10) {
                var showDuration = "00:0" + videoDuration;
            } else {
                var showDuration = "00:" + videoDuration;
            }
            var vidDuration = document.createElement("h4"); //h4 for now
            var vidSpan = document.createElement("span");
            vidDuration.appendChild(vidSpan);
            vidSpan.appendChild(document.createTextNode(showDuration));
            
            imageDiv.appendChild(vidDuration);
            //insert duration somehow
        }

      }
    }
  
    function init() {
      loadJSON(function(response) {
        var videodata = JSON.parse(response);
        var video = videodata.videos;
        var videoCatagories = videodata.categories;
        result = document.querySelector("div");
        show(video,videoCatagories);
      });
    }
  
    return {
      init: init
    }
  })();
  