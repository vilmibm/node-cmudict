var CMUDict = require('./cmudict').CMUDict;

var c = new CMUDict();

var tests = [
  'zweber',
  'zywicki',
  'championing',
  'a',
  'aaker',
  'NOT IN DICT'
];

tests.forEach(function(x) {
  console.log(c.get(x));
});
