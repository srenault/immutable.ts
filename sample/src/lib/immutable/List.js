define(["require", "exports", './Traversable', './Option', './Tuple', './Range'], function(require, exports, ___tr__, ___option__, ___tuple__, ___range__) {
    var _tr = ___tr__;
    var _option = ___option__;
    var _tuple = ___tuple__;
    var _range = ___range__;

    exports.Exceptions = (function () {
        return {
            noSuchElement: function (message) {
                function NoSuchElementError() {
                    this.name = "NoSuchElementError";
                    this.message = message || "";
                }
                NoSuchElementError.prototype = Error.prototype;
                throw new NoSuchElementError();
            }
        };
    })();

    function List() {
        var as = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            as[_i] = arguments[_i + 0];
        }
        if (as.length == 0) {
            return new Nil();
        } else {
            var tail = as.splice(1, as.length);
            return new Cons(as[0], exports.List.apply(null, tail));
        }
    }
    exports.List = List;

    var Nil = (function () {
        function Nil() {
        }
        Nil.prototype.head = function () {
            throw new exports.Exceptions.noSuchElement("head of empty list");
        };

        Nil.prototype.last = function () {
            throw new Error("last of empty list");
        };

        Nil.prototype.headOption = function () {
            return new _option.None();
        };

        Nil.prototype.lastOption = function () {
            return new _option.None();
        };

        Nil.prototype.tail = function () {
            throw new Error("tail of empty list");
        };

        Nil.prototype.isEmpty = function () {
            return true;
        };

        Nil.prototype.nonEmpty = function () {
            return !this.isEmpty();
        };

        Nil.prototype.length = function () {
            return 0;
        };

        Nil.prototype.foldLeft = function (z, f) {
            return z;
        };

        Nil.prototype.foldRight = function (z, f) {
            return z;
        };

        Nil.prototype.reduceRight = function (f) {
            throw new Error("reduceRight of empty list");
        };

        Nil.prototype.reduceLeft = function (f) {
            throw new Error("reduceLeft of empty list");
        };

        Nil.prototype.appendOne = function (t) {
            return exports.List(t);
        };

        Nil.prototype.append = function (l) {
            return l;
        };

        Nil.prototype.prependOne = function (t) {
            return exports.List(t);
        };

        Nil.prototype.prepend = function (l) {
            return l;
        };

        Nil.prototype.map = function (f) {
            return new Nil();
        };

        Nil.prototype.flatMap = function (f) {
            return new Nil();
        };

        Nil.prototype.flatten = function () {
            return new Nil();
        };

        Nil.prototype.filter = function (f) {
            return this;
        };

        Nil.prototype.find = function (f) {
            return new _option.None();
        };

        Nil.prototype.filterNot = function (f) {
            return this;
        };

        Nil.prototype.foreach = function (f) {
        };

        Nil.prototype.reverse = function () {
            return this;
        };

        Nil.prototype.asArray = function () {
            return [];
        };

        Nil.prototype.mkString = function (sep) {
            return "";
        };

        Nil.prototype.zip = function (l) {
            return new Nil();
        };

        Nil.prototype.zipWithIndex = function () {
            return new Nil();
        };

        Nil.prototype.init = function () {
            throw new Error("init of empty list");
        };

        Nil.prototype.take = function (n) {
            throw new Error("take of empty list");
        };

        Nil.prototype.takeWhile = function (f) {
            return this;
        };

        Nil.prototype.drop = function (n) {
            throw new Error("drop of empty list");
        };

        Nil.prototype.dropWhile = function (f) {
            return this;
        };

        Nil.prototype.dropRigth = function (n) {
            throw new Error("dropRight of empty list");
        };

        Nil.prototype.get = function (n) {
            throw new Error("get of empty list");
        };

        Nil.prototype.splitAt = function (n) {
            throw new Error("split of empty list");
        };

        Nil.prototype.count = function (f) {
            return 0;
        };

        Nil.prototype.contains = function (t) {
            return false;
        };

        Nil.prototype.exists = function (f) {
            return false;
        };

        Nil.prototype.distinct = function () {
            return new Nil();
        };

        Nil.prototype.indexOf = function (t) {
            return -1;
        };

        Nil.prototype.indexOfAfter = function (t, from) {
            return -1;
        };

        Nil.prototype.indexWhere = function (f) {
            return -1;
        };

        Nil.prototype.indexWhereAfter = function (f, from) {
            return -1;
        };

        Nil.prototype.lastIndexOf = function (t) {
            return -1;
        };

        Nil.prototype.lastIndexOfAfter = function (t, end) {
            return -1;
        };

        Nil.prototype.lastIndexWhere = function (f) {
            return -1;
        };

        Nil.prototype.lastIndexWhereAfter = function (f, end) {
            return -1;
        };

        Nil.prototype.padTo = function (len, t) {
            return padTo1(this, len, t);
        };

        Nil.prototype.span = function (f) {
            var nil = new Nil();
            return new _tuple.Tuple2(nil, nil);
        };
        return Nil;
    })();
    exports.Nil = Nil;

    var Cons = (function () {
        function Cons(hd, tl) {
            this.hd = hd;
            this.tl = tl;
        }
        Cons.prototype.head = function () {
            return this.hd;
        };

        Cons.prototype.last = function () {
            return this.reverse().head();
        };

        Cons.prototype.headOption = function () {
            return _option.Option(this.hd);
        };

        Cons.prototype.lastOption = function () {
            return _option.Option(this.last());
        };

        Cons.prototype.tail = function () {
            return this.tl;
        };

        Cons.prototype.isEmpty = function () {
            return false;
        };

        Cons.prototype.nonEmpty = function () {
            return !this.isEmpty();
        };

        Cons.prototype.length = function () {
            return 1 + this.tl.length();
        };

        Cons.prototype.foldRight = function (z, f) {
            return foldRight1(this, z, f);
        };

        Cons.prototype.foldLeft = function (z, f) {
            return foldLeft1(this, z, f);
        };

        Cons.prototype.reduceRight = function (f) {
            var z = this.head();
            return this.tail().foldRight(z, f);
        };

        Cons.prototype.reduceLeft = function (f) {
            var z = this.head();
            return this.tail().foldLeft(z, f);
        };

        Cons.prototype.appendOne = function (t) {
            return append1(this, exports.List(t));
        };

        Cons.prototype.append = function (l) {
            return append1(this, l);
        };

        Cons.prototype.prependOne = function (t) {
            return prepend1(this, exports.List(t));
        };

        Cons.prototype.prepend = function (l) {
            return prepend1(this, l);
        };

        Cons.prototype.map = function (f) {
            return this.foldRight(new Nil(), function (t, acc) {
                return new Cons(f(t), acc);
            });
        };

        Cons.prototype.flatMap = function (f) {
            return this.map(f).flatten();
        };

        Cons.prototype.flatten = function () {
            return this.foldLeft(new Nil(), function (acc, t) {
                if (_tr.isList(t)) {
                    var l = t;
                    return acc.append(l);
                } else if (_tr.isOption(t)) {
                    var o = t;
                    if (o.isDefined()) {
                        return acc.appendOne(o.get());
                    } else
                        return acc;
                } else {
                    return acc.appendOne(t);
                }
            });
        };

        Cons.prototype.filter = function (f) {
            return this.foldRight(new Nil(), function (t, acc) {
                if (f(t)) {
                    return acc;
                } else {
                    return new Cons(t, acc);
                }
            });
        };

        Cons.prototype.find = function (f) {
            var z = new _option.None();
            return this.foldLeft(z, function (acc, t) {
                if (f(t)) {
                    return new _option.Some(t);
                } else {
                    return acc;
                }
            });
        };

        Cons.prototype.filterNot = function (f) {
            return this.filter(function (t) {
                return !f(t);
            });
        };

        Cons.prototype.foreach = function (f) {
            this.foldLeft(new Nil(), function (acc, t) {
                f(t);
                return acc;
            });
        };

        Cons.prototype.reverse = function () {
            return reverse1(this);
        };

        Cons.prototype.asArray = function () {
            return this.foldLeft([], function (acc, t) {
                acc.push(t);
                return acc;
            });
        };

        Cons.prototype.mkString = function (sep) {
            return this.foldLeft("", function (acc, t) {
                if (acc == "")
                    return t;
                else
                    return acc + sep + t;
            });
        };

        Cons.prototype.zip = function (l) {
            var step = function (l1, l2, acc) {
                return l1.headOption().flatMap(function (t) {
                    return l2.headOption().map(function (u) {
                        var res = new Cons(new _tuple.Tuple2(t, u), acc);
                        return step(l1.tail(), l2.tail(), res);
                    });
                }).getOrElse(function () {
                    return acc.reverse();
                });
            };
            return step(this, l, new Nil());
        };

        Cons.prototype.zipWithIndex = function () {
            var indexes = new _range.Range(0, this.length()).toList();
            return this.zip(indexes);
        };

        Cons.prototype.init = function () {
            return this.take(this.length() - 1);
        };

        Cons.prototype.take = function (n) {
            return this.zipWithIndex().foldLeft(new Nil(), function (acc, t) {
                if (t._2 >= n) {
                    return acc;
                }
                return new Cons(t._1, acc);
            }).reverse();
        };

        Cons.prototype.takeWhile = function (f) {
            return this.foldLeft(new Nil(), function (acc, t) {
                if (f(t)) {
                    return new Cons(t, acc);
                } else {
                    return acc;
                }
            }).reverse();
        };

        Cons.prototype.drop = function (n) {
            return this.zipWithIndex().foldLeft(new Nil(), function (acc, t) {
                if (t._2 == n) {
                    return acc;
                }
                return new Cons(t._1, acc);
            }).reverse();
        };

        Cons.prototype.dropWhile = function (f) {
            return this.foldLeft(new Nil(), function (acc, t) {
                if (f(t)) {
                    return acc;
                }
                return new Cons(t, acc);
            }).reverse();
        };

        Cons.prototype.dropRigth = function (n) {
            var self = this;
            return this.zipWithIndex().foldRight(new Nil(), function (t, acc) {
                if (t._2 == (self.length() - n)) {
                    return acc;
                }
                return new Cons(t._1, acc);
            });
        };

        Cons.prototype.get = function (n) {
            var r;
            if (n > 0) {
                r = this.zipWithIndex().reduceRight(function (t, acc) {
                    if (t._2 == n) {
                        return t._1;
                    } else {
                        return null;
                    }
                });
                if (r)
                    return r;
            }
            throw new Error("Index out of bounds");
        };

        Cons.prototype.splitAt = function (n) {
            if (n > 0) {
                var z = new _tuple.Tuple2(new Nil(), new Nil());
                return this.zipWithIndex().foldLeft(z, function (acc, t) {
                    if (t._2 < n) {
                        var left = acc._1.appendOne(t._1);
                        return new _tuple.Tuple2(left, acc._2);
                    } else {
                        var right = acc._2.appendOne(t._1);
                        return new _tuple.Tuple2(acc._1, right);
                    }
                });
            } else {
                throw new Error("Index out of bounds");
            }
        };

        Cons.prototype.count = function (f) {
            return this.foldLeft(0, function (acc, t) {
                if (f(t)) {
                    return acc;
                } else {
                    return acc + 1;
                }
            });
        };

        Cons.prototype.contains = function (t) {
            return this.find(function (t1) {
                return t == t1;
            }).isDefined();
        };

        Cons.prototype.exists = function (f) {
            return this.find(f).isDefined();
        };

        Cons.prototype.distinct = function () {
            return this.foldLeft(new Nil(), function (acc, t) {
                if (acc.contains(t)) {
                    return acc;
                } else {
                    return acc.appendOne(t);
                }
            });
        };

        Cons.prototype.indexOf = function (t) {
            return this.indexWhere(function (t1) {
                return t == t1;
            });
        };

        Cons.prototype.indexOfAfter = function (t, from) {
            return this.indexWhereAfter(function (t1) {
                return t == t1;
            }, from);
        };

        Cons.prototype.indexWhere = function (f) {
            return this.zipWithIndex().foldLeft(-1, function (acc, t1) {
                if (acc == -1 && f(t1._1)) {
                    return t1._2;
                } else
                    return acc;
            });
        };

        Cons.prototype.indexWhereAfter = function (f, from) {
            return this.zipWithIndex().foldLeft(-1, function (acc, t1) {
                if (acc == -1 && f(t1._1) && from < t1._2) {
                    return t1._2;
                } else
                    return acc;
            });
        };

        Cons.prototype.lastIndexOf = function (t) {
            return this.lastIndexWhere(function (t1) {
                return t == t1;
            });
        };

        Cons.prototype.lastIndexOfAfter = function (t, end) {
            return this.lastIndexWhereAfter(function (t1) {
                return t == t1;
            }, end);
        };

        Cons.prototype.lastIndexWhere = function (f) {
            return this.zipWithIndex().foldLeft(-1, function (acc, t1) {
                if (f(t1._1)) {
                    return t1._2;
                } else
                    return acc;
            });
        };

        Cons.prototype.lastIndexWhereAfter = function (f, end) {
            return this.zipWithIndex().foldLeft(-1, function (acc, t1) {
                if (f(t1._1) && end >= t1._2) {
                    return t1._2;
                } else
                    return acc;
            });
        };

        Cons.prototype.padTo = function (len, t) {
            return padTo1(this, len, t);
        };

        Cons.prototype.span = function (f) {
            var nil = new Nil();
            var z = new _tuple.Tuple2(nil, nil);
            return this.foldLeft(z, function (acc, t) {
                if (f(t)) {
                    var left = acc._1.appendOne(t);
                    return new _tuple.Tuple2(left, acc._2);
                } else {
                    var right = acc._2.appendOne(t);
                    return new _tuple.Tuple2(acc._1, right);
                }
            });
        };
        return Cons;
    })();
    exports.Cons = Cons;

    function append1(l1, l2) {
        return foldRight1(l1, l2, function (t, acc) {
            return new Cons(t, acc);
        });
    }

    function prepend1(l1, l2) {
        return append1(l2, l1);
    }

    function foldLeft1(l, z, f) {
        if (l.isEmpty()) {
            return z;
        } else {
            return foldLeft1(l.tail(), f(z, l.head()), f);
        }
    }

    function foldRight1(l, z, f) {
        return l.reverse().foldLeft(z, function (acc, t) {
            return f(t, acc);
        });
    }

    function concat1(l) {
        return l.foldRight(new Nil(), function (t, acc) {
            return t.append(acc);
        });
    }

    function reverse1(l) {
        return l.foldLeft(new Nil(), function (acc, t) {
            return new Cons(t, acc);
        });
    }

    function padTo1(l, len, t) {
        if (l.length() < len) {
            var rest = len - l.length();
            var pad = new _range.Range(0, rest).toList().map(function (_) {
                return t;
            });
            return l.append(pad);
        } else {
            return l;
        }
    }
});
