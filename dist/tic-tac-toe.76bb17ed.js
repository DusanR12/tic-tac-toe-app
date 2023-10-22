// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"logic/tic-tac-toe.js":[function(require,module,exports) {
// If the game squares were numbered from 0 to 8.
var WIN_CONDITIONS = [[0, 1, 2],
// first row
[3, 4, 5],
// second row
[6, 7, 8],
// third row
[0, 3, 6],
// first column
[1, 4, 7],
// second column
[2, 5, 8],
// third column
[0, 4, 8],
// first diagonal
[2, 4, 6] // second diagonal
];

var player1Mark;
var currentPlayerName;
var BOARD_WIDTH = 3;
var movesTaken = 0;
var currentPlayerMark = "X";
var tie = false;

/* Components */
var newGameVsCpuButton = document.getElementById("primary-button-1");
var newGameVsPlayerButton = document.getElementById("primary-button-2");
var xMarkButton = document.getElementById("secondary-button-1");
var oMarkButton = document.getElementById("secondary-button-2");
var quitButton = document.getElementById("accent-button-1");
var nextRoundButton = document.getElementById("accent-button-2");
var restartButton = document.getElementById("restart-button");
var newGameContainer = document.getElementById("container-1");
var gameContainer = document.getElementById("container-2");
var gameSquares = document.querySelectorAll(".dr-button-game-square");
var winStateSection = document.getElementById("section");
var overlay = document.getElementById("overlay");

/* Text, colors etc... */
var turn = document.getElementById("dynamic-text-1-js");
var whoIsX = document.getElementById("dynamic-text-2-js");
var xWinsCount = document.getElementById("dynamic-text-3-js");
var tiesCount = document.getElementById("dynamic-text-4-js");
var whoIsO = document.getElementById("dynamic-text-5-js");
var oWinsCount = document.getElementById("dynamic-text-6-js");
var whoWon = document.getElementById("dynamic-text-7-js");
var whoTakesTheRound = document.getElementById("dynamic-text-8-js");
var dynamicMark = document.getElementById("dynamic-text-9-js");
var roundWonOrTied = document.getElementById("dynamic-text-10-js");
newGameVsCpuButton.addEventListener("click", gameWithCpu);
newGameVsPlayerButton.addEventListener("click", gameWithPlayer);
xMarkButton.addEventListener("click", player1IsX);
oMarkButton.addEventListener("click", player1IsO);
nextRoundButton.addEventListener("click", nextRound);
quitButton.addEventListener("click", quit);
restartButton.addEventListener("click", restartGame);
gameSquares.forEach(function (gameSquare, i) {
  gameSquare.addEventListener("click", function () {
    makeMove(gameSquare);
  });
});
newGameVsCpuButton.disabled = true;
newGameVsPlayerButton.disabled = true;
function player1IsX() {
  xMarkButton.disabled = true;
  oMarkButton.disabled = false;
  currentPlayerName = "player 1";
  player1Mark = "X";
  newGameVsCpuButton.disabled = false;
  newGameVsPlayerButton.disabled = false;
}
function player1IsO() {
  oMarkButton.disabled = true;
  xMarkButton.disabled = false;
  currentPlayerName = "player 2";
  player1Mark = "O";
  whoIsX.textContent = "(P2)";
  whoIsO.textContent = "(P1)";
  newGameVsCpuButton.disabled = false;
  newGameVsPlayerButton.disabled = false;
}

/* Feature to be added */
function gameWithCpu() {
  /* Feature */
}
function gameWithPlayer() {
  newGameContainer.classList.add("dr-display-none");
  gameContainer.classList.remove("dr-display-none");
}
function makeMove(gameSquare) {
  switch (currentPlayerMark) {
    case "X":
      gameSquare.textContent = "X";
      gameSquare.classList.add("dr-clr-primary-500");
      turn.textContent = "O";
      break;
    case "O":
      gameSquare.textContent = "O";
      gameSquare.classList.add("dr-clr-primary-400");
      turn.textContent = "X";
      break;
    default:
      throw new Error("Something went wrong");
  }
  gameSquare.disabled = true;
  movesTaken++;
  if (didPlayerWin()) {
    playerWon();
  } else if (movesTaken >= BOARD_WIDTH * BOARD_WIDTH) {
    tieGame();
  } else {
    currentPlayerName = currentPlayerName === "player 1" ? "player 2" : "player 1";
    currentPlayerMark = currentPlayerMark === "X" ? "O" : "X";
  }
}
function didPlayerWin() {
  return WIN_CONDITIONS.some(function (condition) {
    return condition.every(function (gameSquarePosition) {
      return gameSquares[gameSquarePosition].textContent === currentPlayerMark;
    });
  });
}
function playerWon() {
  winStateSection.classList.remove("dr-display-none");
  overlay.classList.remove("dr-display-none");
  restartButton.disabled = true;
  gameSquares.forEach(function (gameSquare) {
    gameSquare.disabled = true;
  });
  whoWon.textContent = "".concat(currentPlayerName, " wins");
  dynamicMark.textContent = "".concat(currentPlayerMark);
  if (currentPlayerMark === "X") {
    whoTakesTheRound.classList.add("dr-clr-primary-500");
  } else {
    whoTakesTheRound.classList.add("dr-clr-primary-400");
  }
}
function tieGame() {
  tie = true;
  winStateSection.classList.remove("dr-display-none");
  overlay.classList.remove("dr-display-none");
  restartButton.disabled = true;
  whoWon.classList.add("dr-display-none");
  winStateSection.classList.add("dr-gap-9", "dr-padding-block-11");
  winStateSection.classList.remove("dr-padding-block-10");
  whoTakesTheRound.classList.add("dr-clr-accent-200");
  whoTakesTheRound.removeChild(dynamicMark);
  roundWonOrTied.textContent = "round tied";
}
function restartGame() {
  reset();
}
function nextRound() {
  /* Score */
  if (tie) {
    tiesCount.textContent++;
  } else if (currentPlayerMark === "X") {
    xWinsCount.textContent++;
  } else {
    oWinsCount.textContent++;
  }
  reset();
}
function quit() {
  newGameVsPlayerButton.disabled = true;
  newGameVsCpuButton.disalbed = true;
  tiesCount.textContent = "0";
  xWinsCount.textContent = "0";
  oWinsCount.textContent = "0";
  player1Mark = undefined;
  gameContainer.classList.add("dr-display-none");
  newGameContainer.classList.remove("dr-display-none");
  reset();
}
function reset() {
  winStateSection.classList.add("dr-display-none");
  overlay.classList.add("dr-display-none");
  movesTaken = 0;
  currentPlayerMark = "X";
  currentPlayerName = undefined;
  turn.textContent = "X";
  tie = false;
  xMarkButton.disabled = false;
  oMarkButton.disabled = false;
  restartButton.disabled = false;
  whoWon.classList.remove("dr-display-none");
  whoTakesTheRound.insertBefore(dynamicMark, whoTakesTheRound.firstChild);
  whoTakesTheRound.classList.remove("dr-clr-primary-500", "dr-clr-primary-400", "dr-clr-accent-200");
  winStateSection.classList.remove("dr-gap-9", "dr-padding-block-11");
  winStateSection.classList.add("dr-padding-block-10");
  winStateSection.classList.remove("dr-clr-accent-200");
  roundWonOrTied.textContent = "takes the round";
  gameSquares.forEach(function (gameSquare) {
    gameSquare.disabled = false;
    gameSquare.textContent = "";
    gameSquare.classList.remove("dr-clr-primary-500", "dr-clr-primary-400");
  });
  switch (player1Mark) {
    case "X":
      player1IsX();
      break;
    case "O":
      player1IsO();
      break;
  }
}
console.log();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52059" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","logic/tic-tac-toe.js"], null)
//# sourceMappingURL=/tic-tac-toe.76bb17ed.js.map