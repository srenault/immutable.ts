define(["require", "exports", './Traversable', '../exceptions'], function(require, exports, _tr, _exceptions) {
    
    

    function Option(a) {
        if (a != null || a != undefined) {
            return new Some(a);
        } else {
            return new None();
        }
    }
    exports.Option = Option;

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

        Some.prototype.orElse = function (f) {
            return this;
        };

        Some.prototype.orNull = function () {
            return this.get();
        };

        Some.prototype.isEmpty = function () {
            return false;
        };

        Some.prototype.nonEmpty = function () {
            return !this.isEmpty();
        };

        Some.prototype.map = function (f) {
            return new Some(f(this.get()));
        };

        Some.prototype.flatMap = function (f) {
            return f(this.get());
        };

        Some.prototype.flatten = function () {
            var self = this;
            return this.flatMap(function (t) {
                if (_tr.isOption(t)) {
                    return t;
                } else {
                    return new Some(self.get);
                }
            });
        };

        Some.prototype.filter = function (f) {
            if (f(this.get())) {
                return this;
            } else {
                return new None();
            }
        };

        Some.prototype.filterNot = function (f) {
            return this.filter(function (t) {
                return !f(t);
            });
        };

        Some.prototype.isDefined = function () {
            return !this.isEmpty();
        };

        Some.prototype.exists = function (f) {
            return this.filter(f).isDefined();
        };
        return Some;
    })();
    exports.Some = Some;

    var None = (function () {
        function None() {
        }
        None.prototype.get = function () {
            throw new _exceptions.noSuchElement("None.get");
        };

        None.prototype.getOrElse = function (f) {
            return f();
        };

        None.prototype.orElse = function (f) {
            return f();
        };

        None.prototype.orNull = function () {
            return null;
        };

        None.prototype.isEmpty = function () {
            return true;
        };

        None.prototype.nonEmpty = function () {
            return !this.isEmpty();
        };

        None.prototype.map = function (f) {
            return new None();
        };

        None.prototype.flatMap = function (f) {
            return new None();
        };

        None.prototype.flatten = function () {
            return new None();
        };

        None.prototype.filter = function (f) {
            return this;
        };

        None.prototype.filterNot = function (f) {
            return this;
        };

        None.prototype.isDefined = function () {
            return !this.isEmpty();
        };

        None.prototype.exists = function (f) {
            return false;
        };
        return None;
    })();
    exports.None = None;
});
