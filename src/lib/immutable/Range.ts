import _list = require('./List');

export interface IRange {
    toList<number>(): _list.IList<number>;
}

export class Range implements IRange {
    private range: number[] = [];

    constructor (from: number, to: number) {
        for(var i=from; i<=to; i++) {
            this.range.push(i);
        }
    }

    toList<number>(): _list.IList<number> {
        return _list.List.apply(null, this.range);
    }
}