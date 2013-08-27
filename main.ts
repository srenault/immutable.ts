import Immutable = require("Immutable");
var List = Immutable.List;
var Option = Immutable.Option;

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

l4.asArray();
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
