define(["require", "exports"], function(require, exports) {
    var Tuple2 = (function () {
        function Tuple2(_1, _2) {
            this._1 = _1;
            this._2 = _2;
        }
        Tuple2.prototype.toString = function () {
            return '(' + this._1 + ',' + this._2 + ')';
        };
        return Tuple2;
    })();
    exports.Tuple2 = Tuple2;
});
