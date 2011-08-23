node-cmudict
============
cmudict is a basic wrapper around the [CMU Pronouncing Dictonary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict). The purpose of this
wrapper is to enable phoneme extraction from a given word to do linguistic
operations such as syllable counting and rhyming. Note that the dictionary is
finite: though large, it will not find certain words. In this case you will
have to improvise.

Usage
-----
    var CMUDict = require('cmudict').CMUDict;
    var cmudict = new CMUDict();
    var phoneme_str = cmudict.get('prosaic'); // 'P R OW0 Z EY1 IH0 K'

Counting syllables and determining the end rhyme is an exercise left up to the
reader as there are a number of ways to do this.  (see:  [Word Hy-phen-a-tion by Com-put-er](http://www.tug.org/docs/liang/)).

Installation
------------
`npm install cmudict`

Performance
-----------
The dictionary is a huge flatfile. It is lazily read into memory upon the first
call to `.get()`. It takes about 1 second, on average, to read this file in,
but from that point on accesses are a simple object property lookup. I
originally used [node-mmap](https://github.com/bnoordhuis/node-mmap) but found
the performance of `fs.readFileSync()` to be comparable.

Attribution
-----------
The nodejs code was written by Nathaniel K Smith <nathanielksmith@gmail.com>.
The CMU Pronouncing Dictionary is Copyright (C) 1993-2008 by Carnegie Mellon
University.

License
-------
All code not under copyright by CMU is licensed under a [Creative Commons Attribution-ShareAlike 3.0](http://creativecommons.org/licenses/by-sa/3.0/).
