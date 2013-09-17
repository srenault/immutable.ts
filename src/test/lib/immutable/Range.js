define(["require", "exports", './List'], function(require, exports, _list) {
    

    var Range = (function () {
        function Range(from, to) {
            this.range = [];
            for (var i = from; i <= to; i++) {
                this.range.push(i);
            }
        }
        Range.prototype.toList = function () {
            return _list.List.apply(null, this.range);
        };
        return Range;
    })();
    exports.Range = Range;
});
