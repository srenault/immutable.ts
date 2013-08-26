define(["require", "exports"], function(require, exports) {
    (function (collections) {
        (function (immutable) {
            function List() {
                var as = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    as[_i] = arguments[_i + 0];
                }
                if (as.length == 0) {
                    return immutable.nil;
                } else {
                    var tail = as.splice(1, as.length);
                    return new Cons(as[0], List.apply(null, tail));
                }
            }
            immutable.List = List;

            var Nil = (function () {
                function Nil() {
                }
                Nil.prototype.head = function () {
                    throw new Error("head of empty list");
                };

                Nil.prototype.tail = function () {
                    throw new Error("tail of empty list");
                };

                Nil.prototype.isEmpty = function () {
                    return true;
                };

                Nil.prototype.length = function () {
                    return 0;
                };

                Nil.prototype.foldLeft = function (z, f) {
                    throw new Error("foldLeft of empty list");
                };

                Nil.prototype.foldRight = function (z, f) {
                    throw new Error("foldRight of empty list");
                };

                Nil.prototype.append = function (l) {
                    return append1(this, l);
                };

                Nil.prototype.map = function (f) {
                    return map1(this, f);
                };

                Nil.prototype.flatMap = function (f) {
                    return flatMap1(this, f);
                };

                Nil.prototype.foreach = function (f) {
                    return foreach1(this, f);
                };

                Nil.prototype.reverse = function () {
                    return reverse1(this);
                };

                Nil.prototype.asArray = function () {
                    return asArray1(this);
                };
                return Nil;
            })();
            immutable.Nil = Nil;

            function append1(l1, l2) {
                return foldRight1(l1, l2, function (t, acc) {
                    return new Cons(t, acc);
                });
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

            function map1(l, f) {
                return l.foldRight(new Nil(), function (t, acc) {
                    return new Cons(f(t), acc);
                });
            }

            function concat1(ll) {
                return ll.foldRight(new Nil(), function (t, acc) {
                    return t.append(acc);
                });
            }

            function flatMap1(l, f) {
                return concat1(l.map(f));
            }

            function foreach1(l, f) {
                l.foldLeft(new Nil(), function (acc, t) {
                    f(t);
                    return acc;
                });
            }

            function reverse1(l) {
                return l.foldLeft(new Nil(), function (acc, t) {
                    return new Cons(t, acc);
                });
            }

            function asArray1(l) {
                return l.foldLeft([], function (acc, t) {
                    acc.push(t);
                    return acc;
                });
            }

            var Cons = (function () {
                function Cons(hd, tl) {
                    this.hd = hd;
                    this.tl = tl;
                }
                Cons.prototype.head = function () {
                    return this.hd;
                };

                Cons.prototype.tail = function () {
                    return this.tl;
                };

                Cons.prototype.isEmpty = function () {
                    return false;
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

                Cons.prototype.append = function (l) {
                    return append1(this, l);
                };

                Cons.prototype.map = function (f) {
                    return map1(this, f);
                };

                Cons.prototype.flatMap = function (f) {
                    return flatMap1(this, f);
                };

                Cons.prototype.foreach = function (f) {
                    return foreach1(this, f);
                };

                Cons.prototype.reverse = function () {
                    return reverse1(this);
                };

                Cons.prototype.asArray = function () {
                    return asArray1(this);
                };
                return Cons;
            })();

            immutable.nil = new Nil();
        })(collections.immutable || (collections.immutable = {}));
        var immutable = collections.immutable;
    })(exports.collections || (exports.collections = {}));
    var collections = exports.collections;
});
