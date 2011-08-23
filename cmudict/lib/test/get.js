var assert = require('assert');

var CMUDict = require('../cmudict').CMUDict;

var c = new CMUDict();

assert.equal(c.get('zweber'), 'Z W IY1 B ER0');
assert.equal(c.get('zywicki'), 'Z IH0 W IH1 K IY0');
assert.equal(c.get('championing'), 'CH AE1 M P IY0 AH0 N IH0 NG');
assert.equal(c.get('a'), 'EY1');
assert.equal(c.get('aaker'), 'AA1 K ER0');
assert.equal(c.get('NOT IN DICT'), undefined);
