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

var cameraMessage = document.getElementById("cameraMessage");
var videoSource = document.getElementById("videoSource");
var globalId;

function getResult() {
  var res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

  return regeneratorRuntime.async(function getResult$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(navigator.mediaDevices.enumerateDevices());

        case 2:
          res = _context2.sent;
          console.log(res);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 7;

          for (_iterator = res[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            i = _step.value;
            videoSource.innerHTML += " <option value=\"".concat(i.deviceId, "\">").concat(i.label, "</option>");
          }

          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 15:
          _context2.prev = 15;
          _context2.prev = 16;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 18:
          _context2.prev = 18;

          if (!_didIteratorError) {
            _context2.next = 21;
            break;
          }

          throw _iteratorError;

        case 21:
          return _context2.finish(18);

        case 22:
          return _context2.finish(15);

        case 23:
          videoSource.addEventListener('change', function _callee() {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    globalId = videoSource.value;
                    console.log(globalId);
                    getMedia();

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 11, 15, 23], [16,, 18, 22]]);
}

getResult();
getMedia();

function getMedia() {
  var stream, constraints;
  return regeneratorRuntime.async(function getMedia$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          stream = null;
          constraints = window.constraints = {
            audio: false,
            video: {
              deviceId: globalId,
              facingMode: 'enironment'
            }
          }; //let res = await navigator.mediaDevices.enumerateDevices();

          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia(constraints));

        case 5:
          stream = _context3.sent;
          console.log(stream);
          window.stream = stream;
          video.srcObject = stream;
          _context3.next = 13;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 11]]);
} // creata load model and active cameras


function loadModel() {
  var targetFps, timeInvert;
  return regeneratorRuntime.async(function loadModel$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(cocoSsd.load());

        case 2:
          model = _context4.sent;
          // Set up canvas w and h
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight; // Set fps for canvas draw

          targetFps = 28;
          timeInvert = Math.floor(1000 / targetFps); // draw each timeInvert  seconds

          setInterval(predictModel, timeInvert);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function predictModel() {
  return regeneratorRuntime.async(function predictModel$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise(function _callee2(rec, rej) {
            var result, i;
            return regeneratorRuntime.async(function _callee2$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(model.detect(video, 10, 0.45));

                  case 2:
                    result = _context5.sent;
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
                    return _context5.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

video.addEventListener('loadeddata', function _callee3(event) {
  return regeneratorRuntime.async(function _callee3$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log('Yay!');
          loadModel();

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
});