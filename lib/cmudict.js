var events = require('events');
var sys = require('sys');

var mmap = require('mmap');

function LineByLine(buffer) {
  events.EventEmitter.call(this);
  this._buffer = buffer;
};

LineByLine.prototype.read = function() {
  var linesep = '\n'.charCodeAt(0);
  var linebuf = '';
  var current = null;
  for (pos in buffer) {
    current = buffer[pos];
    if (current === linesep) {
      this.emit('line', linebuf);
      linebuf = '';
    }
    else {
      linebuf += String.fromCharCode(97 + current);
    }
  }
  this.emit('end');
};


sys.inherits(LineByLine, events.EventEmitter);

function CMUDict() {
  this._cache = {};
}
CMUDict.prototype.get = function(lookup, cb) {
  function finish(lookup) {
    return this._cache[lookup.toUpperCase()];
  }
  if (this._cache === {}) {
    fs.open('./cmu/cmudict.0.7.a', 'r', null, function(err, fd) {
      fs.fstat(fd, function(err, stats) {
        buffer = mmap.map(stats.size, mmap.PROT_READ, mmap.MAP_SHARED, fd, 0);
        var lbl = new LineByLine(buffer);
        lbl.on('line', function(line) {
          if (line[0] === ';') { return; }
          else {
            var def = line.split('  ');
            this._cache[def[0]] = def[1];
          }
        });
        lbl.on('end', function() { finish(lookup); });
        lbl.read();
      });
    });
  }
  else {
    return finish(lookup);
  }
};
exports.CMUDict = CMUDict;
