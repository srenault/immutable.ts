import ts = require("collections");

var List = ts.collections.immutable.List

var l1 = List(1, 2, 3);
var l2 = List(4, 5, 6)
var l3 = l1.append(l2);

console.log(l3, l3.length())