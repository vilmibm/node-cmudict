var fs = require('fs');

function CMUDict() {
  this._cache = null;
}

CMUDict.prototype.get = function(lookup, cb) {
  if (this._cache === null) {
    this._cache = {};

    // locate the dictionary flat file. Use require.resolve to try and figure
    // it out.
    var possibles = ['cmudict', './cmudict'];
    var path = null;
    possibles.forEach(function(x) {
      try {
        path = require.resolve(x);
      } catch(e) { }
    });
    if (path === null) {
      throw 'cmudict.js cannot find its lib directory.';
    }
    path = path.split('/');
    path = path.slice(0, path.length-1).join('/') + '/cmu/cmudict.0.7a';

    // Note: this originally used node-mmap but repeated runs showed basically
    // the same performance so I just stuck with readFileSync.
    //var buffer = mmap.map(size, mmap.PROT_READ, mmap.MAP_SHARED, fd, 0);
    var buffer = fs.readFileSync(path);
    var linesep = '\n'.charCodeAt(0);
    var comment = ';'.charCodeAt(0);
    var strbuf = '';
    var current = null;
    for (pos in buffer) {
      current = buffer[pos];
      if (current === linesep) {
        if (strbuf[0] === comment) {
          strbuf = '';
          continue;
        }
        else {
          strbuf = strbuf.split('  ');
          this._cache[strbuf[0]] = strbuf[1];
          strbuf = '';
        }
      }
      else {
        strbuf += String.fromCharCode(current);
      }
    }
  }
  return this._cache[lookup.toUpperCase()];
};

exports.CMUDict = CMUDict;
