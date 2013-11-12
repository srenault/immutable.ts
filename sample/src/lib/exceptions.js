define(["require", "exports"], function(require, exports) {
    function noSuchElement(message) {
        function NoSuchElementError() {
            this.name = "NoSuchElementError";
            this.message = message || "";
        }
        NoSuchElementError.prototype = Error.prototype;
        throw new NoSuchElementError();
    }
    exports.noSuchElement = noSuchElement;
    ;

    function indexOutOfBounds(message) {
        function IndexOutOfBoundsError() {
            this.name = "IndexOutOfBoundsError";
            this.message = message || "";
        }
        IndexOutOfBoundsError.prototype = Error.prototype;
        throw new IndexOutOfBoundsError();
    }
    exports.indexOutOfBounds = indexOutOfBounds;
});
