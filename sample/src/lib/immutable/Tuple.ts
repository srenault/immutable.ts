
export class Tuple2<T,U> {
    constructor (public _1, public _2) {
    }

    public toString() {
        return '(' + this._1 + ',' + this._2 + ')';
    }
}
