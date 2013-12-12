import _tr = require('./Traversable');
import _option = require('./Option');
import _tuple = require('./Tuple');
import _range = require('./Range');
import _exceptions = require('./exceptions');

export interface IList<T> extends _tr.ITraversable<T> {
    head(): T;

    last(): T;

    headOption(): _option.IOption<T>;

    lastOption(): _option.IOption<T>;

    tail(): IList<T>;

    isEmpty(): boolean;

    nonEmpty(): boolean;

    length(): number;

    foldLeft<U>(z: U, f: (acc: U, t: T) => U): U;

    foldRight<U>(z: U, f: (t: T, acc: U) => U): U;

    reduceRight<U>(f: (t: T, acc: U) => U): U;

    reduceRightOption<U>(f: (t: T, acc: U) => U): _option.IOption<U>;

    reduceLeft<U>(f: (acc: U, t: T) => U): U;

    reduceLeftOption<U>(f: (acc: U, t: T) => U): _option.IOption<U>;

    appendOne(t: T): IList<T>;

    append(l: IList<T>): IList<T>;

    prependOne(t: T): IList<T>;

    prepend(l: IList<T>): IList<T>;

    map<U>(f: (t: T) => U): IList<U>;

    flatMap<U>(f: (t: T) => IList<U>): IList<U>;

    flatten<U>(): IList<U>;

    filter(f: (t: T) => boolean): IList<T>;

    collect<U>(f: (t: T) => _option.IOption<U>): IList<U>;

    collectFirst<U>(f: (t: T) => _option.IOption<U>): _option.IOption<U>;

    find(f: (t: T) => boolean): _option.IOption<T>;

    filterNot(f: (t: T) => boolean): IList<T>;

    foreach(f: (t: T) => void): void;

    reverse(): IList<T>;

    asArray(): T[];

    mkString(sep: string): string;

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>>;

    zipWithIndex(): IList<_tuple.Tuple2<T,number>>;

    init(): IList<T>;

    take(n: number): IList<T>;

    takeWhile(f: (t: T) => boolean): IList<T>;

    get(n: number): T;

    getOption(n: number): _option.IOption<T>;

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>>;

    count(f: (t: T) => boolean): number;

    contains(t: T): boolean;

    exists(f: (t: T) => boolean): boolean;

    distinct(): IList<T>;

    drop(n: number): IList<T>;

    dropRight(n: number): IList<T>;

    dropWhile(f: (t: T) => boolean): IList<T>;

    indexOf(t: T): number;

    indexOfAfter(t: T, from: number): number;

    indexWhere(f: (t: T) => boolean): number;

    indexWhereAfter(f: (t: T) => boolean, from: number): number;

    lastIndexOf(t: T): number;

    lastIndexOfAfter(t: T, end: number): number;

    lastIndexWhere(f: (t: T) => boolean): number;

    lastIndexWhereAfter(f: (t: T) => boolean, from: number): number;

    padTo(len: number, t: T): IList<T>;

    span(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>>;

    partition(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>>;

    forall(f: (t: T) => boolean): boolean;

    lift(): (number) => _option.IOption<T>;

    startsWith(that: IList<T>): boolean;

    startsWithAt(that: IList<T>, offset: number): boolean;

    endsWith(that: IList<T>): boolean;

    indices(): _range.IRange;

    isDefinedAt(n: number): boolean;

    containsSlice(sub: IList<T>): boolean;

    corresponds<U>(l: IList<U>, f: (a: T, b: U) => boolean): boolean;

    segmentLenght(f: (t: T) => boolean, from: number): number;

    slice(from: number, until: number): IList<T>;

    patch(from: number, l: IList<T>, replaced: number): IList<T>;
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
        throw new _exceptions.noSuchElement("head of empty List");
    }

    last(): T {
        throw new _exceptions.noSuchElement("last of empty List");
    }

    headOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    lastOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    tail(): IList<T> {
        return this;
    }

    isEmpty(): boolean {
        return true;
    }

    nonEmpty(): boolean {
        return !this.isEmpty();
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

    reduceRight<U> (f: (t: T, acc: U) => U): U {
        throw new _exceptions.noSuchElement("reduceRight of empty List");
    }

    reduceRightOption<U>(f: (t: T, acc: U) => U): _option.IOption<U> {
        return new _option.None<U>();
    }

    reduceLeft<U> (f: (acc: U, t: T) => U): U {
        throw new _exceptions.noSuchElement("reduceLeft of empty List");
    }

    reduceLeftOption<U>(f: (acc: U, t: T) => U): _option.IOption<U> {
        return new _option.None<U>();
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

    flatten<U>(): IList<U> {
        return new Nil<U>();
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this;
    }

    collect<U>(f: (t: T) => _option.IOption<U>): IList<U> {
        return new Nil<U>();
    }

    collectFirst<U>(f: (t: T) => _option.IOption<U>): _option.IOption<U> {
        return new _option.None<U>();
    }

    find(f: (t: T) => boolean): _option.IOption<T> {
        return new _option.None<T>();
    }

    filterNot(f: (t: T) => boolean): IList<T> {
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
        throw new _exceptions.noSuchElement("init of empty List");
    }

    take(n: number): IList<T> {
        return this;
    }

    takeWhile(f: (t: T) => boolean): IList<T> {
        return this;
    }

    drop(n: number): IList<T> {
        return this;
    }

    dropWhile(f: (t: T) => boolean): IList<T> {
        return this;
    }

    dropRight(n: number): IList<T> {
        return this;
    }

    get(n: number): T {
        throw new _exceptions.indexOutOfBounds(n.toString());
    }

    getOption(n: number): _option.IOption<T> {
        return this.lift()(n);
    }

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>> {
        var emptyList = new Nil<T>();
        return new _tuple.Tuple2<IList<T>, IList<T>>(emptyList, emptyList);
    }

    count(f: (t) => boolean): number {
        return 0;
    }

    contains(t: T): boolean {
        return false;
    }

    exists(f: (t: T) => boolean): boolean {
        return false;
    }

    distinct(): IList<T> {
        return new Nil<T>();
    }

    indexOf(t: T): number {
        return - 1;
    }

    indexOfAfter(t: T, from: number): number {
        return -1;
    }

    indexWhere(f: (t: T) => boolean): number {
        return -1;
    }

    indexWhereAfter(f: (t: T) => boolean, from: number): number {
        return -1;
    }

    lastIndexOf(t: T): number {
        return - 1;
    }

    lastIndexOfAfter(t: T, end: number): number {
        return -1;
    }

    lastIndexWhere(f: (t: T) => boolean): number {
        return -1;
    }

    lastIndexWhereAfter(f: (t: T) => boolean, end: number): number {
        return -1;
    }

    padTo(len: number, t: T): IList<T> {
        return padTo1(this, len, t);
    }

    span(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>> {
        var nil = new Nil<T>();
        return new _tuple.Tuple2<IList<T>,IList<T>>(nil, nil);
    }

    partition(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>> {
        var nil = new Nil<T>();
        return new _tuple.Tuple2<IList<T>,IList<T>>(nil, nil);
    }

    forall(f: (t: T) => boolean): boolean {
        return true;
    }

    lift(): (number) => _option.IOption<T> {
        return (n: number) => {
            return new _option.None<T>();
        }
    }

    startsWith(that: IList<T>): boolean {
        return false;
    }

    startsWithAt(that: IList<T>, offset: number): boolean {
        return false;
    }

    endsWith(that: IList<T>): boolean {
        return false;
    }

    indices(): _range.IRange {
        return new _range.Range(0, 0);
    }

    isDefinedAt(n: number): boolean {
        return false;
    }

    containsSlice(sub: IList<T>): boolean {
        return false;
    }

    corresponds<U>(l: IList<U>, f: (a: T, b: U) => boolean): boolean {
        return false;
    }

    segmentLenght(f: (t: T) => boolean, from: number): number {
        return 0;
    }

    slice(from: number, until: number): IList<T> {
        return this;
    }

    patch(from: number, l: IList<T>, replaced: number): IList<T> {
        return l;
    }
}

export class Cons<T> implements IList<T> {
    constructor (private hd: T, private tl: IList<T>) {
    }

    head(): T {
        return this.hd;
    }

    last(): T {
        return this.reverse().head();
    }

    headOption(): _option.IOption<T> {
        return _option.Option<T>(this.hd);
    }

    lastOption(): _option.IOption<T> {
        return _option.Option<T>(this.last());
    }

    tail(): IList<T> {
        return this.tl;
    }

    isEmpty(): boolean {
        return false;
    }

    nonEmpty(): boolean {
        return !this.isEmpty();
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

    reduceRight<U> (f: (t: T, acc: U) => U): U {
        var z = <U><any>this.head();
        return this.tail().foldRight(z, f);
    }

    reduceRightOption<U>(f: (t: T, acc: U) => U): _option.IOption<U> {
        return new _option.Some<U>(this.reduceRight(f));
    }

    reduceLeft<U> (f: (acc: U, t: T) => U): U {
        var z = <U><any>this.head();
        return this.tail().foldLeft(z, f);
    }

    reduceLeftOption<U> (f: (acc: U, t: T) => U): _option.IOption<U> {
        return new _option.Some<U>(this.reduceLeft(f));
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

    flatMap<U>(f: (t: T) => _tr.ITraversable<U>): IList<U> {
        return <IList<U>> this.map<_tr.ITraversable<U>>(f).flatten<U>();
    }

    flatten<U>(): IList<U> {
        return this.foldLeft<IList<U>>(new Nil<U>(), (acc, t) => {
            if(_tr.isList(t)) {
                var l = <IList<U>><any> t;
                return acc.append(l);
            } else if(_tr.isOption(t)) {
                var o = <_option.IOption<U>><any> t;
                if(o.isDefined()) {
                    return acc.appendOne(o.get());
                } else return acc;
            } else {
                return acc.appendOne(<U><any> t);
            }
        });
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(f(t)) {
                return new Cons<T>(t, acc);
            } else {
                return acc;
            }
        }).reverse();
    }

    collect<U>(f: (t: T) => _option.IOption<U>): IList<U> {
        return this.foldLeft<IList<U>>(new Nil<U>(), (acc, t) => {
            return f(t).map((u) => {
                return new Cons<U>(u, acc);
            }).getOrElse(() => {
                return acc;
            });
        }).reverse();
    }

    collectFirst<U>(f: (t: T) => _option.IOption<U>): _option.IOption<U> {
        return this.foldLeft<_option.IOption<U>>(new _option.None<U>(), (acc, t) => {
            if(!acc.isDefined()) {
                return f(t);
            } else return acc;
        });
    }

    find(f: (t: T) => boolean): _option.IOption<T> {
        var z = new _option.None<T>();
        return this.foldLeft<_option.IOption<T>>(z, (acc, t) => {
            if(f(t)) {
                return new _option.Some<T>(t);
            } else {
                return acc;
            }
        });
    }

    filterNot(f:(t: T) => boolean): IList<T> {
        return this.filter((t) => {
            return !f(t);
        });
    }

    foreach(f: (t: T) => void): void {
        this.foldLeft(new Nil<T>(), (acc, t) => {
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
            if(acc == "") return t.toString();
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
        return step(this, l, new Nil<_tuple.Tuple2<T,U>>());
    }

    zipWithIndex(): IList<_tuple.Tuple2<T,number>> {
        var indexes = new _range.Range(0, this.length()).toList();
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

    takeWhile(f: (t: T) => boolean): IList<T> {
        return this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(f(t)) {
                return new Cons<T>(t, acc);
            } else {
                return acc;
            }
        }).reverse();
    }

    drop(n: number): IList<T> {
        return this.zipWithIndex().foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(t._2 == n) {
                return acc;
            }
            return new Cons<T>(t._1, acc);
        }).reverse();
    }

    dropWhile(f: (t: T) => boolean): IList<T> {
        return this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(f(t)) {
                return acc;
            }
            return new Cons<T>(t, acc);
        }).reverse();
    }

    dropRight(n: number): IList<T> {
        var self = this;
        return this.zipWithIndex().foldRight<IList<T>>(new Nil<T>(), (t, acc) => {
            if(t._2 >= n) {
                return acc;
            }
            return new Cons<T>(t._1, acc);
        });
    }

    get(n: number): T {
        return this.zipWithIndex().foldLeft<_option.IOption<T>>(new _option.None<T>(), (acc, t) => {
            if(t._2 == n) {
                return new _option.Some<T>(t._1);
            } else {
                return acc;
            }
        }).getOrElse(() => {
            throw new _exceptions.indexOutOfBounds(n.toString());
            return null;
        });
    }

    getOption(n: number): _option.IOption<T> {
        return this.lift()(n);
    }

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>> {
        if(n > 0) {
            var z = new _tuple.Tuple2(new Nil<T>(), new Nil<T>());
            return this.zipWithIndex().foldLeft(z, (acc, t) => {
                if(t._2 < n) {
                    var left = acc._1.appendOne(t._1);
                    return new _tuple.Tuple2(left, acc._2);
                } else {
                    var right = acc._2.appendOne(t._1);
                    return new _tuple.Tuple2(acc._1, right);
                }
            });
        } else {
            throw new _exceptions.indexOutOfBounds(n.toString());
        }
    }

    count(f: (t) => boolean): number {
        return this.foldLeft(0, (acc, t) => {
            if(f(t)) {
                return acc;
            } else {
                return acc + 1;
            }
        });
    }

    contains(t: T): boolean {
        return this.find((t1) => {
            return t == t1;
        }).isDefined();
    }

    exists(f: (t: T) => boolean): boolean {
        return this.find(f).isDefined();
    }

    distinct(): IList<T> {
        return this.foldLeft(new Nil<T>(), (acc, t) => {
            if(acc.contains(t)) {
                return acc;
            } else {
                return acc.appendOne(t);
            }
        });
    }

    indexOf(t: T): number {
        return this.indexWhere((t1) => {
            return t == t1;
        });
    }

    indexOfAfter(t: T, from: number): number {
        return this.indexWhereAfter((t1) => {
            return t == t1;
        }, from);
    }

    indexWhere(f: (t: T) => boolean): number {
        return this.zipWithIndex().foldLeft(-1, (acc, t1) => {
            if(acc == -1 && f(t1._1)) {
                return t1._2;
            } else return acc;
        });
    }

    indexWhereAfter(f: (t: T) => boolean, from: number): number {
        return this.zipWithIndex().foldLeft(-1, (acc, t1) => {
            if(acc == -1 && f(t1._1) && from < t1._2) {
                return t1._2;
            } else return acc;
        });
    }

    lastIndexOf(t: T): number {
        return this.lastIndexWhere((t1) => {
            return t == t1;
        });
    }

    lastIndexOfAfter(t: T, end: number): number {
        return this.lastIndexWhereAfter((t1) => {
            return t == t1;
        }, end);
    }

    lastIndexWhere(f: (t: T) => boolean): number {
        return this.zipWithIndex().foldLeft(-1, (acc, t1) => {
            if(f(t1._1)) {
                return t1._2;
            } else return acc;
        });
    }

    lastIndexWhereAfter(f: (t: T) => boolean, end: number): number {
        return this.zipWithIndex().foldLeft(-1, (acc, t1) => {
            if(f(t1._1) && end > t1._2) {
                return t1._2;
            } else return acc;
        });
    }

    padTo(len: number, t: T): IList<T> {
        return padTo1(this, len, t);
    }

    span(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>> {
        var nil = new Nil<T>();
        var z = new _tuple.Tuple2<IList<T>,IList<T>>(nil, nil);
        return this.foldLeft(z, (acc, t) => {
            if(f(t) && acc._2.isEmpty()) {
                var left = acc._1.appendOne(t);
                return new _tuple.Tuple2<IList<T>,IList<T>>(left, acc._2);
            } else {
                var right = acc._2.appendOne(t);
                return new _tuple.Tuple2<IList<T>,IList<T>>(acc._1, right);
            }
        });
    }

    partition(f: (t: T) => boolean): _tuple.Tuple2<IList<T>, IList<T>> {
        var nil = new Nil<T>();
        var z = new _tuple.Tuple2<IList<T>,IList<T>>(nil, nil);
        return this.foldLeft(z, (acc, t) => {
            if(f(t)) {
                var left = acc._1.appendOne(t);
                return new _tuple.Tuple2<IList<T>,IList<T>>(left, acc._2);
            } else {
                var right = acc._2.appendOne(t);
                return new _tuple.Tuple2<IList<T>,IList<T>>(acc._1, right);
            }
        });
    }

    forall(f: (t: T) => boolean): boolean {
        return this.foldLeft(true, (acc, t) => {
            return acc && f(t);
        });
    }

    lift(): (number) => _option.IOption<T> {
        var self = this;
        return (n: number) => {
            return _option.Option<T>(self.get(n));
        };
    }

    startsWith(that: IList<T>): boolean {
        return this.startsWithAt(that, 0);
    }

    startsWithAt(that: IList<T>, offset: number): boolean {
        return this.zip(that).zipWithIndex().foldLeft(true, (acc, t) => {
            var tuple = t._1;
            var index = t._2;
            return (index >= offset) ? acc && (tuple._1 == tuple._2) : true;
        });
    }

    endsWith(that: IList<T>): boolean {
        return this.reverse().startsWith(that.reverse());
    }

    indices(): _range.IRange {
        return new _range.Range(0, this.length() - 1);
    }

    isDefinedAt(n: number): boolean {
        try {
            return !!this.get(n);
        } catch(e) {
            return false;
        }
    }

    containsSlice(sub: IList<T>): boolean {
        var step = (l: IList<T>, sub: IList<T>): boolean => {
            if(l.nonEmpty()) {
                if(l.startsWith(sub)) {
                    return true;
                } else {
                    return step(l.tail(), sub);
                }
            } else {
                return false;
            }
        }
        return step(this, sub);
    }

    corresponds<U>(l: IList<U>, f: (a: T, b: U) => boolean): boolean {
        if(this.length() >= l.length()) {
            return this.zip(l).foldLeft(true, (acc, t) => {
                if(acc) {
                    return f(t._1, t._2);
                } else {
                    return false;
                }
            });
        } else {
            return false;
        }
    }

    segmentLenght(f: (t: T) => boolean, from: number): number {
        var step = (l: IList<T>, acc: number, max: number): number => {
            return l.headOption().map((h) => {
                if(f(h)) {
                    var m = (acc + 1) > max ? (acc + 1) : max;
                    return step(l.tail(), acc + 1, m);
                } else {
                    return step(l.tail(), 0, max);
                }
            }).getOrElse(() => {
                return max;
            });
        }
        return step(this, 0, 0);
    }

    slice(from: number, until: number): IList<T> {
        return this.zipWithIndex().foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(t._2 >= from && t._2 < until) {
                return new Cons<T>(t._1, acc);
            } else {
                return acc;
            }
        }).reverse();
    }

    patch(from: number, l: IList<T>, replaced: number): IList<T> {
        var step = (self: IList<_tuple.Tuple2<T, number>>, p: IList<T>, acc: IList<T>): IList<T> => {
            return self.headOption().map((sh) => {
                if(sh._2 >= from) {
                    return p.headOption().map((ph) => {
                        return step(self.tail(), p.tail(), acc.appendOne(ph));
                    }).getOrElse(() => {
                        return step(self.tail(), p, acc.appendOne(sh._1));
                    });
                } else {
                    return step(self.tail(), p, acc.appendOne(sh._1));
                }
            }).getOrElse(() => {
                return p.headOption().map((ph) => {
                    return step(self, p.tail(), acc.appendOne(ph));
                }).getOrElse(() => {
                    return acc;
                });
            });
        }
        return step(this.zipWithIndex(), l, new Nil<T>());
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

function padTo1<T>(l: IList<T>, len: number, t: T): IList<T> {
    if(l.length() < len) {
        var rest = len - l.length() - 1;
        var pad: IList<T> = new _range.Range(0, rest).toList().map<T>((_) => {
            return t;
        });
        return l.append(pad);
    } else {
        return l;
    }
}
