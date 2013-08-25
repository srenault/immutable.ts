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

                Nil.prototype.foldRight = function (z, f) {
                    throw new Error("foldRight of empty list");
                };

                Nil.prototype.foldLeft = function (z, f) {
                    throw new Error("foldLeft of empty list");
                };

                Nil.prototype.append = function (l) {
                    return append1(this, l);
                };
                return Nil;
            })();
            immutable.Nil = Nil;

            function append1(l1, l2) {
                return foldRight1(l1, l2, function (t, acc) {
                    return new Cons(t, acc);
                });
            }

            function foldRight1(l, z, f) {
                if (l.isEmpty()) {
                    return z;
                } else {
                    return f(l.head(), foldRight1(l.tail(), z, f));
                }
            }

            function foldLeft1(l, z, f) {
                if (l.isEmpty()) {
                    return z;
                } else {
                    return foldLeft1(l.tail(), f(z, l.head()), f);
                }
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
                return Cons;
            })();

            immutable.nil = new Nil();
        })(collections.immutable || (collections.immutable = {}));
        var immutable = collections.immutable;
    })(exports.collections || (exports.collections = {}));
    var collections = exports.collections;
});
