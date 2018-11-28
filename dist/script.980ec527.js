// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/keyboarder.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Square from './Square'
// import {COLORS, GRID_SIZE} from './constants'
// import Hazard from './Hazard'
// import Coin from './Coin'

var Keyboarder = function () {
  function Keyboarder() {
    _classCallCheck(this, Keyboarder);

    this.keyState = {};

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true;
    }.bind(this));

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false;
    }.bind(this));
  }

  _createClass(Keyboarder, [{
    key: 'isDown',
    value: function isDown(keyCode) {
      return this.keyState[keyCode] === true;
    }
  }, {
    key: 'on',
    value: function on(keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback();
        }
      });
    }
  }]);

  return Keyboarder;
}();

Keyboarder.KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  S: 83
};

exports.default = Keyboarder;
},{}],"src/constants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GRID_SIZE = exports.GRID_SIZE = 60;

var ticksPerMove = exports.ticksPerMove = 10;

var COLORS = exports.COLORS = {
  background: '#243196',
  square: '#FFFFFF',
  wall: '#FFFFFF',
  hazard: '#000000',
  coin: '#eac610'
};
},{}],"src/Square.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboarder = require('./keyboarder');

var _keyboarder2 = _interopRequireDefault(_keyboarder);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Hazard from './Hazard'
// import Coin from './Coin'

var Square = function () {
  function Square(game, pos) {
    var _this = this;

    _classCallCheck(this, Square);

    this.game = game;
    this.pos = { x: 0, y: 3 };
    this.size = { x: 50, y: 50 };
    this.keyboarder = new _keyboarder2.default();
    this.keyboarder.on(_keyboarder2.default.KEYS.LEFT, function () {
      _this.moveSquare('left');
    });
    this.keyboarder.on(_keyboarder2.default.KEYS.RIGHT, function () {
      _this.moveSquare('right');
    });
    this.keyboarder.on(_keyboarder2.default.KEYS.UP, function () {
      _this.moveSquare('up');
    });
    this.keyboarder.on(_keyboarder2.default.KEYS.DOWN, function () {
      _this.moveSquare('down');
    });
  }

  _createClass(Square, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'draw',
    value: function draw() {
      var context = this.game.context;
      context.fillStyle = _constants.COLORS.square;
      context.fillRect(_constants.GRID_SIZE * (3 + this.pos.x) + 5, _constants.GRID_SIZE * (3 + this.pos.y) + 5, this.size.x, this.size.y);
    }
  }, {
    key: 'moveSquare',
    value: function moveSquare(direction) {
      this.direction = direction;

      if (this.direction === 'up') {
        this.pos.y--;
      } else if (this.direction === 'down') {
        this.pos.y++;
      } else if (this.direction === 'left') {
        this.pos.x--;
      } else if (this.direction === 'right') {
        this.pos.x++;
      }

      this.pos.x = Math.min(Math.max(this.pos.x, 0), 3);
      this.pos.y = Math.min(Math.max(this.pos.y, 0), 3);
    }
  }, {
    key: 'center',
    get: function get() {
      return {
        x: _constants.GRID_SIZE * (3 + this.pos.x) + 5 + this.size.x / 2,
        y: _constants.GRID_SIZE * (3 + this.pos.y) + 5 + this.size.y / 2
      };
    }
  }]);

  return Square;
}();

exports.default = Square;
},{"./keyboarder":"src/keyboarder.js","./constants":"src/constants.js"}],"src/Hazard.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import Keyboarder from './keyboarder'
// import Square from './Square'


// import Coin from './Coin'

var Hazard = function () {
  function Hazard(game, pos, vel) {
    _classCallCheck(this, Hazard);

    this.game = game;
    this.velocity = vel;
    this.length = 240;
    this.center = pos;
    this.size = { x: 30, y: 30

      // this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
    };
  }

  _createClass(Hazard, [{
    key: 'update',
    value: function update() {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var context = this.game.context;
      context.fillStyle = _constants.COLORS.hazard;
      context.fillRect(this.center.x - 15, this.center.y - 15, this.size.x, this.size.y);
    }
  }]);

  return Hazard;
}();

exports.default = Hazard;
},{"./constants":"src/constants.js"}],"src/Coin.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import Keyboarder from './keyboarder'
// import Square from './Square'


// import Hazard from './Hazard'
// import {colliding} from './Game'

var Coin = function () {
  function Coin(game, pos) {
    _classCallCheck(this, Coin);

    this.game = game;
    this.pos = { x: 3, y: 0 };
    this.center = {
      x: 390,
      y: 210
    };
    this.size = {
      x: 30,
      y: 30
    };
  }

  _createClass(Coin, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'draw',
    value: function draw() {
      var context = this.game.context;
      context.fillStyle = _constants.COLORS.coin;
      context.fillRect(_constants.GRID_SIZE * (3 + this.pos.x) + 15, _constants.GRID_SIZE * (this.pos.y + 3) + 15, 30, 30);
    }
  }]);

  return Coin;
}();

exports.default = Coin;
},{"./constants":"src/constants.js"}],"src/Game.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Square = require('./Square');

var _Square2 = _interopRequireDefault(_Square);

var _constants = require('./constants');

var _Hazard = require('./Hazard');

var _Hazard2 = _interopRequireDefault(_Hazard);

var _Coin = require('./Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import Keyboarder from './keyboarder'


function isSamePos(pos, posSquare) {
  return pos.x === posSquare.x && pos.y === posSquare.y;
}

function doesIntersectWithSquare(pos, posSquare) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = posSquare[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _pos = _step.value;

      if (isSamePos(_pos, posSquare)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.getElementById('screen');
    this.context = this.canvas.getContext('2d');
    this.size = {
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.squares = {
      x: this.size.width / _constants.GRID_SIZE,
      y: this.size.height / _constants.GRID_SIZE
    };
    this.square = new _Square2.default(this);
    this.coin = new _Coin2.default(this);
    this.hazardsArray = [];
    this.score = 0;
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      var _this = this;

      if (isSamePos(this.square.pos, this.coin.pos)) {
        this.score += 1;
        this.coin.pos = {
          x: Math.floor(Math.random() * 4),
          y: Math.floor(Math.random() * 4)
        };
      }
      this.square.update();
      this.coin.update();

      while (this.hazardsArray.length < 3) {
        this.sendHazards();
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.hazardsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var hazard = _step2.value;

          hazard.update();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.hazardsArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _hazard = _step3.value;

          if (collision(this.square, _hazard)) {
            this.score = 0;
            _hazard.hit = true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.hazardsArray = this.hazardsArray.filter(function (hazard) {
        return !hazard.hit && hazard.center.x >= 0 && hazard.center.x <= _this.size.width && hazard.center.y >= 0 && hazard.center.y <= _this.size.height;
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.size.width, this.size.height);

      this.background();
      // this.grid()
      this.border();
      this.drawScore();

      this.square.draw();
      this.coin.draw();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.hazardsArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var hazard = _step4.value;

          hazard.draw();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this.context.font = '30px courier';
      this.context.fillStyle = _constants.COLORS.wall;
      this.context.fillText('use arrow keys to take the coin', _constants.GRID_SIZE * 1, _constants.GRID_SIZE * 9, _constants.GRID_SIZE * 8);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var _this2 = this;

      this.ticks++;
      this.update();
      this.draw();
      window.requestAnimationFrame(function () {
        return _this2.tick();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.tick();
    }
  }, {
    key: 'border',
    value: function border() {
      this.context.strokeStyle = _constants.COLORS.wall;
      this.context.lineWidth = 20;
      this.context.strokeRect(150, 150, 300, 300);
    }
  }, {
    key: 'background',
    value: function background() {
      this.context.fillStyle = _constants.COLORS.background;
      this.context.fillRect(0, 0, this.size.width, this.size.height);
    }
  }, {
    key: 'grid',
    value: function grid() {
      this.context.strokeStyle = _constants.COLORS.wall;
      this.context.lineWidth = 1;

      this.context.beginPath();
      for (var x = 0; x < this.size.width; x += _constants.GRID_SIZE) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.size.height);
      }

      for (var y = 0; y < this.size.height; y += _constants.GRID_SIZE) {
        this.context.moveTo(0, y);
        this.context.lineTo(this.size.width, y);
      }

      this.context.stroke();
    }
  }, {
    key: 'drawScore',
    value: function drawScore() {
      this.context.font = '26px courier';
      this.context.fillStyle = _constants.COLORS.wall;
      this.context.fillText('current score:' + this.score, _constants.GRID_SIZE * 3, _constants.GRID_SIZE * 1.5, _constants.GRID_SIZE * 4);
    }
  }, {
    key: 'placeCoin',
    value: function placeCoin() {
      var foundValidPos = false;
      var pos = void 0;
      while (!foundValidPos) {
        pos = {
          x: Math.floor(Math.random() * this.squares.x),
          y: Math.floor(Math.random() * this.squares.y)
        };

        foundValidPos = !(doesIntersectWithSquare(pos, this.coin) || doesIntersectWithSquare(pos, this.square));
      }
    }
  }, {
    key: 'removeCoin',
    value: function removeCoin(pos) {
      this.coin = this.coin.filter(function (coin) {
        return !isSamePos(pos, coin);
      });
    }
  }, {
    key: 'sendHazards',
    value: function sendHazards() {
      var entrySide = Math.floor(Math.random() * 4 + 1);
      var x = void 0,
          y = void 0,
          vx = void 0,
          vy = void 0;
      if (entrySide === 1) {
        x = Math.floor(Math.random() * 4) * 60 + 210;
        y = 0;
        vx = 0;
        vy = 2;
      } else if (entrySide === 2) {
        x = 0;
        y = Math.floor(Math.random() * 4) * 60 + 210;
        vx = 2;
        vy = 0;
      } else if (entrySide === 3) {
        x = 600;
        y = Math.floor(Math.random() * 4) * 60 + 210;
        vx = -2;
        vy = 0;
      } else if (entrySide === 4) {
        x = Math.floor(Math.random() * 4) * 60 + 210;
        y = 600;
        vx = 0;
        vy = -2;
      }
      this.hazardsArray.push(new _Hazard2.default(this, {
        x: x,
        y: y
      }, {
        x: vx,
        y: vy
      }));
    }
  }]);

  return Game;
}();

function collision(b1, b2) {
  return !(b1 === b2 || b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 || b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 || b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 || b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
}

exports.default = Game;
},{"./Square":"src/Square.js","./constants":"src/constants.js","./Hazard":"src/Hazard.js","./Coin":"src/Coin.js"}],"script.js":[function(require,module,exports) {
'use strict';

var _Game = require('./src/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startGame() {
  var game = new _Game2.default('screen');
  game.start();
}

startGame();
},{"./src/Game":"src/Game.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60741' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.980ec527.map