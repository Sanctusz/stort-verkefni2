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
  
var program = (function() {
    
    function show(video, cata) {
        var div = document.createElement('div');
        for (var i = 0; i < cata.length; i++) { // this should be 0,1,2 or three catagories

            var cH2 = document.createElement('h2'); //create h2 element
            var cDiv = document.createElement('div');
            var vRow = document.createElement('div');
            cDiv.setAttribute('class', 'col col-12 col-sm-12');
            vRow.setAttribute('class', 'row');
            cH2.appendChild(document.createTextNode(cata[i].title)); //throw catagory title into h2 element
            cDiv.appendChild(cH2);
            div.appendChild(cDiv);
            cDiv.appendChild(vRow);

            div.setAttribute('class', 'row');
            var tempVid = cata[i].videos;
            for (var j = 0; j < tempVid.length; j++) { //this should be catagories and accessing videos
                var tempID = tempVid[j]-1; //get video ID for current j, for each id in 'videos' or cata[1]
                //insert video/placeholder images
                var imageDiv = document.createElement('div');
                imageDiv.setAttribute('class', 'col col-4 col-sm-12 image');
              
                var a = document.createElement('a');
                var img = document.createElement('img');
                a.href = 'video.html?video=' + tempID;
                img.src = video[tempID].poster;

                //insert Video title
                var cH3 = document.createElement('h3'); // create a h3 element
                cH3.appendChild(document.createTextNode(video[tempID].title)); // throw video title into h3 element

                vRow.appendChild(imageDiv);
                a.appendChild(img);
                imageDiv.appendChild(a);
                vRow.appendChild(imageDiv);
                div.appendChild(cDiv);

                //insert creation date
                var videoDuration = video[tempID].duration;
                //make this a function?
                if (videoDuration > 60) {
                    //configure duraton
                    var minutes = Math.floor(videoDuration / 60);
                    var seconds = videoDuration - minutes * 60;
                    var showDuration = minutes + ':' + seconds; 
                    if (seconds < 10 && minutes < 10) {
                        showDuration = '0' + minutes + ':0' + seconds;
                    } else if(seconds < 10 && minutes > 9) {
                        showDuration = minutes + ':0' + seconds;
                    } else if (seconds > 10 && minutes < 10) {
                        showDuration = '0' + minutes + ':' + seconds;
                    }
  
                } else if (videoDuration < 10) {
                    showDuration = '00:0' + videoDuration;
                } else {
                    showDuration = '00:' + videoDuration;
                }
                var vidDuration = document.createElement('h4'); //h4 for now
                var vidSpan = document.createElement('span');
                vidDuration.appendChild(vidSpan);
                vidSpan.appendChild(document.createTextNode(showDuration));
              
                imageDiv.appendChild(vidDuration); //Insert Duration
                imageDiv.appendChild(cH3); //Insert Title

                var videoCreated = video[tempID].created;
                var now = new Date();
                var diff = now - videoCreated;
              
                var cSeconds = diff / 1000;
                var cMinutes = cSeconds / 60;
                var cHours = cMinutes / 60;
                var cDays = cHours / 24;
                var cWeeks = cDays / 7;
                var cMonths = cDays / 30;
                var cYears = cDays / 365;

                var p = document.createElement('p');
                var showCreated;

                if (cHours <= 24) {
                    showCreated = 'Fyrir ' + Math.round(cHours) + ' klukkustundum síðan.';
                } else if (cDays <= 7) {
                    showCreated = 'Fyrir ' + Math.round(cDays) + ' dögum síðan.';
                } else if (cDays >= 8 && cDays <= 30) {
                    showCreated = 'Fyrir ' + Math.round(cWeeks) + ' vikum síðan.';
                } else if (cDays >= 31 && cDays <= 365) {
                    showCreated = 'Fyrir ' + Math.round(cMonths) + ' mánuðum síðan.';
                } else {
                    showCreated = 'Fyrir ' + Math.round(cYears) + ' árum síðan.';
                }
              
                p.appendChild(document.createTextNode(showCreated));
                imageDiv.appendChild(p);
            }
            var hr = document.createElement('hr');
            cDiv.appendChild(hr);
        }
        result.appendChild(div); //Hendi Result inní Div
    }
    
    function init() {
        loadJSON(function(response) {
            var videodata = JSON.parse(response);
            var video = videodata.videos;
            var videoCatagories = videodata.categories;
            result = document.querySelector('div');
            show(video, videoCatagories);
        });
    }
    
    return {
        init: init
    };
})();
  