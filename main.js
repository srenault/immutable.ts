define(["require", "exports", "list", "option"], function(require, exports, __c__, __o__) {
    var c = __c__;
    var o = __o__;

    var List = c.ts.List;
    var Option = o.ts.Option;

    var l1 = List(1, 2, 3);
    var l2 = List(4, 5, 6);
    var l3 = l1.append(l2);

    console.log("head " + l3.head());

    var l4 = l3.map(function (t) {
        return t * 2;
    });

    l4.foreach(function (t) {
        console.log(t);
    });

    l4.asArray();
    l4.mkString(", ");
    List(1, 2).mkString(", ");

    Option(null).isDefined();
    Option(null).getOrElse(function () {
        return true;
    });

    Option(3).map(function (n) {
        return n * 3;
    });

    Option(3).flatMap(function (n) {
        return Option(4).map(function (n1) {
            return n * n1;
        });
    });
});
