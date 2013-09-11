import _option = require('./Option');
import _tuple = require('./Tuple');

export interface IList<T> {
    head(): T;

    last(): T;

    headOption(): _option.IOption<T>;

    lastOption(): _option.IOption<T>;

    tail(): IList<T>;

    isEmpty(): boolean;

    length(): number;

    foldLeft<U>(z: U, f: (acc: U, t: T) => U): U;

    foldRight<U>(z: U, f: (t: T, acc: U) => U): U;

    appendOne(t: T): IList<T>;

    append(l: IList<T>): IList<T>;

    prependOne(t: T): IList<T>;

    prepend(l: IList<T>): IList<T>;

    map<U>(f: (t: T) => U): IList<U>;

    flatMap<U>(f: (t: T) => IList<U>): IList<U>;

    filter(f: (t: T) => boolean): IList<T>;

    foreach(f: (t: T) => void): void;

    reverse(): IList<T>;

    asArray(): T[];

    mkString(sep: string): string;

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>>;

    zipWithIndex(): IList<_tuple.Tuple2<T,number>>;

    init(): IList<T>;

    take(n: number): IList<T>;
}

export function List<T>(...as: T[]): IList<T> {
    if(as.length == 0) {
        return new Nil<T>();
    } else {
        var tail = as.splice(1, as.length);
        return new Cons<T>(as[0], List.apply(null, tail));
    }
}

export class Nil<T> implements IList<T> {
    constructor() {
    }

    head(): T {
        throw new Error("head of empty list");
    }

    last(): T {
        throw new Error("last of empty list");
    }

    headOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    lastOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    tail(): IList<T> {
        throw new Error("tail of empty list");
    }

    isEmpty(): boolean {
        return true;
    }

    length(): number {
        return 0;
    }

    foldLeft<U> (z: U, f: (acc: U, t: T) => U): U {
        return z;
    }

    foldRight<U> (z: U, f: (t: T, acc: U) => U): U {
        return z;
    }

    appendOne(t: T): IList<T> {
        return List(t);
    }

    append(l: IList<T>): IList<T> {
        return l;
    }

    prependOne(t: T): IList<T> {
        return List(t);
    }

    prepend(l: IList<T>): IList<T> {
        return l;
    }

    map<U>(f: (t: T) => U): IList<U> {
        return new Nil<U>();
    }

    flatMap<U>(f: (t: T) => IList<U>): IList<U> {
        return new Nil<U>();
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this;
    }

    foreach(f: (t: T) => void): void {
    }

    reverse(): IList<T> {
        return this;
    }

    asArray(): T[] {
        return [];
    }

    mkString(sep: string): string {
        return "";
    }

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>> {
        return new Nil<_tuple.Tuple2<T,U>>();
    }

    zipWithIndex(): IList<_tuple.Tuple2<T,number>> {
        return new Nil<_tuple.Tuple2<T,number>>();
    }

    init(): IList<T> {
        throw new Error("init of empty list")
    }

    take(n: number): IList<T> {
        throw new Error("take of empty list")
    }
}

class Cons<T> implements IList<T> {
    constructor (private hd: T, private tl: IList<T>) {
    }

    head(): T {
        return this.hd;
    }

    last(): T {
        return this.reverse().head();
    }

    headOption(): _option.IOption<T> {
        return _option.Option(this.hd);
    }

    lastOption(): _option.IOption<T> {
        return _option.Option(this.last());
    }

    tail(): IList<T> {
        return this.tl;
    }

    isEmpty(): boolean {
        return false;
    }

    length(): number {
        return 1 + this.tl.length();
    }

    foldRight<U>(z: U, f: (t: T, acc: U) => U): U {
        return foldRight1(this, z, f)
    }

    foldLeft<U>(z: U, f: (acc: U, t: T) => U): U {
        return foldLeft1(this, z, f)
    }

    appendOne(t: T): IList<T> {
        return append1(this, List(t));
    }

    append(l: IList<T>): IList<T> {
        return append1(this, l);
    }

    prependOne(t: T): IList<T> {
        return prepend1(this, List(t));
    }

    prepend(l: IList<T>): IList<T> {
        return prepend1(this, l);
    }

    map<U>(f: (t: T) => U): IList<U> {
        return this.foldRight<IList<U>>(new Nil<U>(), (t, acc) => {
            return new Cons<U>(f(t), acc);
        });
    }

    flatMap<U>(f: (t: T) => IList<U>): IList<U> {
        return concat1<U>(this.map<IList<U>>(f));
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this.foldRight<IList<T>>(new Nil<T>(), (t, acc) => {
            if(f(t)) {
                return acc;
            } else {
                return new Cons<T>(t, acc);
            }
        });
    }

    foreach(f: (t: T) => void): void {
        this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            f(t);
            return acc;
        });
    }

    reverse(): IList<T> {
        return reverse1(this);
    }

    asArray(): T[] {
        return this.foldLeft<T[]>([], (acc, t) => {
            acc.push(t);
            return acc;
        });
    }

    mkString(sep: string): string {
        return this.foldLeft<string>("", (acc, t) => {
            if(acc == "") return t;
            else return acc + sep + t;
        });
    }

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>> {
        var step = (l1: IList<T>, l2: IList<U>, acc: IList<_tuple.Tuple2<T,U>>) => {
            return l1.headOption().flatMap((t) => {
                return l2.headOption().map((u) => {
                    var res = new Cons<_tuple.Tuple2<T,U>>(new _tuple.Tuple2(t, u), acc)
                    return step(l1.tail(), l2.tail(), res)
                });
            }).getOrElse(() => {
                return acc.reverse();
            });
        }
        return step(this, l, new Nil<_tuple.Tuple2>());
    }

    zipWithIndex(): IList<_tuple.Tuple2<T,number>> {
        var indexes = List(0);
        for(var i=1; i<this.length(); i++) {
            indexes = indexes.appendOne(i)
        }
        return this.zip<number>(indexes);
    }

    init(): IList<T> {
        return this.take(this.length() - 1)
    }

    take(n: number): IList<T> {
        return this.zipWithIndex().foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(t._2 >= n) {
                return acc;
            }
            return new Cons<T>(t._1, acc);
        }).reverse();
    }
}

function append1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
    return foldRight1(l1, l2, (t, acc) => {
        return new Cons<T>(t, acc)
    });
}

function prepend1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
    return append1(l2, l1);
}

function foldLeft1<T, U>(l: IList<T>, z: U, f: (acc: U, t: T) => U): U {
    if(l.isEmpty()) {
        return z;
    } else {
        return foldLeft1<T, U>(l.tail(), f(z, l.head()), f);
    }
}

function foldRight1<T, U>(l: IList<T>, z: U, f: (t: T, acc: U) => U): U {
    return l.reverse().foldLeft<U>(z, (acc, t) => {
        return f(t, acc);
    });
}

function concat1<T>(l: IList<IList<T>>): IList<T> {
    return l.foldRight(new Nil<T>(), (t, acc) => {
        return t.append(acc);
    });
}

function reverse1<T>(l: IList<T>): IList<T> {
    return l.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
        return new Cons<T>(t, acc);
    });
}
