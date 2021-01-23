"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Script to get all vaild available url from txt
var WebLink2 = // class method to implementing
function WebLink2(name, url) {
  _classCallCheck(this, WebLink2);

  this.webName = name;
  this.webUrl = url;
};

function firstFunction() {
  return new Promise(function (resolve, reject) {
    var y = 0;
    var request = new XMLHttpRequest();
    request.open('GET', 'songWebText.txt', false); // if file is a raw txt with line

    request.send();
    var videoList = request.responseText.split("\n"); //Array list of the video list

    var classList = [];

    for (var i = 0; i < videoList.length; i += 2) {
      classList.push(new WebLink(videoList[i], videoList[i + 1]));
    }

    videoList = new Array();
    resolve(classList);
  });
}

function youTubeGetID2(url) {
  return new Promise(function (resolve, reject) {
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    var k = undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    resolve(k);
  });
}

function checkValid(id, li) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";

    img.onload = function () {
      this.width === 120 ? resolve(0) : resolve(li);
    };
  });
}

function doing() {
  var result, i, a, b;
  return regeneratorRuntime.async(function doing$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(firstFunction());

        case 2:
          result = _context.sent;
          i = 0;

        case 4:
          if (!(i < result.length)) {
            _context.next = 16;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(youTubeGetID2(result[i].webUrl));

        case 7:
          a = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(checkValid(a, result[i]));

        case 10:
          b = _context.sent;

          if (b != 0) {
            console.log(b);
          }

          console.log(i);

        case 13:
          i++;
          _context.next = 4;
          break;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

;
doing();