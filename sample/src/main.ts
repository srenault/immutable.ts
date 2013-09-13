import _list = require("lib/immutable/List");
import _option = require('./lib/immutable/Option');

var List = _list.List;
var Option = _option.Option;

var l1 = List(1, 2, 3);
var l2 = List(4, 5, 6)
var l3 = l1.append(l2);

console.log("head " + l3.head());

var l4 = l3.map((t) => {
    return t * 2
});

l4.foreach((t) => {
    console.log(t);
});

l4.mkString(", ");
List(1, 2).mkString(", ");

Option(null).isDefined();
Option(null).getOrElse(() => {
    return true;
});

Option(3).map((n) => {
    return n * 3;
});

Option(3).flatMap((n) => {
    return Option(4).map((n1) => {
        return n * n1;
    });
});

console.log("asArray", List(1,2,3,4).asArray());

console.log("reverse", List(1,2,3,4).reverse().mkString(", "));

console.log("headOption", List().headOption());

console.log("lastOption", List().lastOption());

console.log("headOption", List(1).headOption());

console.log("append", List(1,2,3,4).append(List(5,6,7,8)).mkString(", "));

console.log("prepend", List(5,6,7,8).prepend(List(1,2,3,4)).mkString(", "));

console.log("prependOne", List(5,6,7,8).prependOne(4).mkString(", "));

console.log("appendOne", List(1,2,3).appendOne(4).mkString(", "));

console.log("zip")
List(1,2,3).zip(List(1,2,3)).foreach((t) => console.log(t.toString()))

console.log("zipWithIndex")
List(1,2,3).zipWithIndex().foreach((t) => console.log(t.toString()))

console.log("init", List(1,2,3,4).init().asArray());

console.log("take", List(1,2,3,4).take(2).asArray());

console.log("takeWhile", List(1,2,3,4).takeWhile((t) => t > 3).asArray());

console.log("reduceRight", List(1,2,3).reduceRight((t, acc) => { return t + acc }));

console.log("reduceLeft", List(1,2,3).reduceLeft((acc, t) => { return t + acc }));

console.log("get", List(1,2,3,4).get(1));

console.log("splitAt");
console.log(List(1,2,3,4,5,6).splitAt(3)._1.asArray());
console.log(List(1,2,3,4,5,6).splitAt(3)._2.asArray());

console.log("filter", List(1,2,3,4).filter((t) => { return t < 3 }).asArray());

console.log("filterNot", List(1,2,3,4).filterNot((t) => { return t < 3 }).asArray());

console.log("count", List(1,2,3,4).count((t) => { return t < 3 }));

console.log("find", List(1,2,3,4).find((t) => { return t == 4 }));

console.log("contains", List(1,2,3,4).contains(4));

console.log("exists", List(1,2,3,4).exists((t) => {return t == 4;}));

console.log("distinct", List(1,4,3,4).distinct().asArray());

console.log("drop", List(1,2,3,4).drop(2).asArray());

console.log("dropWhile", List(1,2,3,4).dropWhile((t) => { return t < 3; }).asArray());

console.log("flatten", List(List(1,2), List(3,4)).flatten().asArray());

console.log("flatten", List<_option.IOption<number>>(new _option.None<number>(), new _option.Some<number>(1)).flatten().asArray());

console.log("flatMap");
console.log(List(1,2).flatMap((t) => {
    return List(3,4);
}).asArray());

console.log("dropRight", List(1,2,3,4).dropRigth(1).asArray());

console.log("indexOf", List(1,2,3,4).indexOf(2));

console.log("indexOfAfter", List(1,2,3,4,2).indexOfAfter(2, 2));

console.log("indexWhere", List(1,2,3,4,2).indexWhere((t) => { return t == 2; }));

console.log("indexWhereAfter", List(1,2,3,4,2).indexWhere((t) => { return t == 2; }), 2);

console.log("padTo", List(1,2,3,4,5).padTo(10, 0).asArray());

console.log("span", List(1,2,3,4).span((t) => { return t < 3; }));