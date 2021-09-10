"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var model; // webCam

var video = document.querySelector('video'); // webCam display

var canvas = document.getElementById('output');
var ctx = canvas.getContext('2d'); // debugMessage

var debugMessage = document.getElementById("debugMessage");
console.log("Width:", window.innerWidth);
console.log("Height:", window.innerHeight); // video setup

var constraints = window.constraints = {
  audio: false,
  video: {}
};
getMedia(constraints);
var cameraMessage = document.getElementById("cameraMessage");

function getMedia(constraints) {
  var stream, res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

  return regeneratorRuntime.async(function getMedia$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          stream = null;
          _context.next = 3;
          return regeneratorRuntime.awrap(navigator.mediaDevices.enumerateDevices());

        case 3:
          res = _context.sent;
          console.log(res);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;

          for (_iterator = res[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            i = _step.value;
            cameraMessage.innerHTML += i.deviceId + i.label + '<br>'; //cameraMessage.innerHTML += i.label;
          }

          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 16:
          _context.prev = 16;
          _context.prev = 17;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 19:
          _context.prev = 19;

          if (!_didIteratorError) {
            _context.next = 22;
            break;
          }

          throw _iteratorError;

        case 22:
          return _context.finish(19);

        case 23:
          return _context.finish(16);

        case 24:
          _context.prev = 24;
          _context.next = 27;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia(constraints));

        case 27:
          stream = _context.sent;
          console.log(stream);
          window.stream = stream;
          video.srcObject = stream;
          _context.next = 35;
          break;

        case 33:
          _context.prev = 33;
          _context.t1 = _context["catch"](24);

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 12, 16, 24], [17,, 19, 23], [24, 33]]);
} // creata load model and active cameras


function loadModel() {
  var targetFps, timeInvert;
  return regeneratorRuntime.async(function loadModel$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(cocoSsd.load());

        case 2:
          model = _context2.sent;
          // Set up canvas w and h
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight; // Set fps for canvas draw

          targetFps = 28;
          timeInvert = Math.floor(1000 / targetFps); // draw each timeInvert  seconds

          setInterval(predictModel, timeInvert);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function predictModel() {
  return regeneratorRuntime.async(function predictModel$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function _callee(rec, rej) {
            var result, i;
            return regeneratorRuntime.async(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(model.detect(video, 10, 0.45));

                  case 2:
                    result = _context3.sent;
                    ctx.drawImage(video, 0, 0);
                    ctx.font = '40px Arial';
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "blue";
                    ctx.fillStyle = "blue";

                    for (i = 0; i < result.length; i++) {
                      ctx.beginPath(); //three dots mean spread over object get all its properties

                      ctx.rect.apply(ctx, _toConsumableArray(result[i].bbox));
                      ctx.stroke();
                      ctx.fillText(result[i].score.toFixed(3) + ' ' + result[i]["class"], result[i].bbox[0], result[i].bbox[1] - 5);
                    }

                    rec();

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

video.addEventListener('loadeddata', function _callee2(event) {
  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log('Yay!');
          loadModel();

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});