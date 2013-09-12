define(["require", "exports", "lib/immutable/package"], function(require, exports, __Immutable__) {
    var Immutable = __Immutable__;
    var List = Immutable.List;
    var Option = Immutable.Option;

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

    console.log("asArray", List(1, 2, 3, 4).asArray());

    console.log("reverse", List(1, 2, 3, 4).reverse().mkString(", "));

    console.log("headOption", List().headOption());

    console.log("lastOption", List().lastOption());

    console.log("headOption", List(1).headOption());

    console.log("append", List(1, 2, 3, 4).append(List(5, 6, 7, 8)).mkString(", "));

    console.log("prepend", List(5, 6, 7, 8).prepend(List(1, 2, 3, 4)).mkString(", "));

    console.log("prependOne", List(5, 6, 7, 8).prependOne(4).mkString(", "));

    console.log("appendOne", List(1, 2, 3).appendOne(4).mkString(", "));

    console.log("zip");
    List(1, 2, 3).zip(List(1, 2, 3)).foreach(function (t) {
        return console.log(t.toString());
    });

    console.log("zipWithIndex");
    List(1, 2, 3).zipWithIndex().foreach(function (t) {
        return console.log(t.toString());
    });

    console.log("init", List(1, 2, 3, 4).init().asArray());

    console.log("take", List(1, 2, 3, 4).take(2).asArray());

    console.log("takeWhile", List(1, 2, 3, 4).takeWhile(function (t) {
        return t > 3;
    }).asArray());

    console.log("reduceRight", List(1, 2, 3).reduceRight(function (t, acc) {
        return t + acc;
    }));

    console.log("reduceLeft", List(1, 2, 3).reduceLeft(function (acc, t) {
        return t + acc;
    }));

    console.log("get", List(1, 2, 3, 4).get(1));

    console.log("splitAt");
    console.log(List(1, 2, 3, 4, 5, 6).splitAt(3)._1.asArray());
    console.log(List(1, 2, 3, 4, 5, 6).splitAt(3)._2.asArray());

    console.log("filter", List(1, 2, 3, 4).filter(function (t) {
        return t < 3;
    }).asArray());

    console.log("filterNot", List(1, 2, 3, 4).filterNot(function (t) {
        return t < 3;
    }).asArray());

    console.log("count", List(1, 2, 3, 4).count(function (t) {
        return t < 3;
    }));

    console.log("find", List(1, 2, 3, 4).find(function (t) {
        return t == 4;
    }));

    console.log("contains", List(1, 2, 3, 4).contains(4));

    console.log("exists", List(1, 2, 3, 4).exists(function (t) {
        return t == 4;
    }));

    console.log("distinct", List(1, 4, 3, 4).distinct().asArray());

    console.log("drop", List(1, 2, 3, 4).drop(2).asArray());

    console.log("dropWhile", List(1, 2, 3, 4).dropWhile(function (t) {
        return t < 3;
    }).asArray());
});
