define(["require", "exports"], function(require, exports) {
    (function (ts) {
        function Option(a) {
            if (a != null || a != undefined) {
                return new Some(a);
            } else {
                return new None();
            }
        }
        ts.Option = Option;

        var Some = (function () {
            function Some(t) {
                this.t = t;
            }
            Some.prototype.get = function () {
                return this.t;
            };

            Some.prototype.getOrElse = function (f) {
                return this.get();
            };

            Some.prototype.isEmpty = function () {
                return false;
            };

            Some.prototype.map = function (f) {
                return new Some(f(this.get()));
            };

            Some.prototype.flatMap = function (f) {
                return f(this.get());
            };

            Some.prototype.filter = function (f) {
                if (f(this.get())) {
                    return this;
                } else {
                    return new None();
                }
            };

            Some.prototype.isDefined = function () {
                return !this.isEmpty();
            };
            return Some;
        })();

        var None = (function () {
            function None() {
            }
            None.prototype.get = function () {
                throw new Error("get on empty value");
            };

            None.prototype.getOrElse = function (f) {
                return f();
            };

            None.prototype.isEmpty = function () {
                return true;
            };

            None.prototype.map = function (f) {
                return new None();
            };

            None.prototype.flatMap = function (f) {
                return new None();
            };

            None.prototype.filter = function (f) {
                return this;
            };

            None.prototype.isDefined = function () {
                return !this.isEmpty();
            };
            return None;
        })();
        ts.None = None;
    })(exports.ts || (exports.ts = {}));
    var ts = exports.ts;
});
