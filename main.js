define(["require", "exports", "collections"], function(require, exports, __ts__) {
    var ts = __ts__;

    var List = ts.collections.immutable.List;

    var l1 = List(1, 2, 3);
    var l2 = List(4, 5, 6);
    var l3 = l1.append(l2);

    console.log(l3, l3.length());
});
