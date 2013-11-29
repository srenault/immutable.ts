export function noSuchElement (message: string) {
    function NoSuchElementError () {
        this.name = "NoSuchElementError";
        this.message = message || "";
    }
    NoSuchElementError.prototype = Error.prototype;
    throw new NoSuchElementError();
};

export function indexOutOfBounds (message: string) {
    function IndexOutOfBoundsError () {
        this.name = "IndexOutOfBoundsError";
        this.message = message || "";
    }
    IndexOutOfBoundsError.prototype = Error.prototype;
    throw new IndexOutOfBoundsError();
}