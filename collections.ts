export module collections.immutable {

    export interface IList<T> {
        head(): T;

        tail(): IList<T>;

        isEmpty(): boolean;

        length(): number;

        foldRight<U>(z: U, f: (t: T, acc: U) => U): U;

        foldLeft<U>(z: U, f: (acc: U, t: T) => U): U;

        append(l: IList<T>): IList<T>;
    }

    export function List<T>(...as: T[]): IList<T> {
        if(as.length == 0) {
            return nil;
        } else {
            var tail = as.splice(1, as.length)
            return new Cons<T>(as[0], List.apply(null, tail));
        }
    }

    export class Nil<T> implements IList<T> {
        constructor() {
        }

        head(): T {
            throw new Error("head of empty list");
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

        foldRight<U> (z: U, f: (t: T, acc: U) => U): U {
            throw new Error("foldRight of empty list");
        }

        foldLeft<U> (z: U, f: (t: T, acc: U) => U): U {
            throw new Error("foldLeft of empty list");
        }

        append(l: IList<T>): IList<T> {
            return append1(this, l);
        }
    }

    function append1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
        return foldRight1(l1, l2, (t, acc) => {
            return new Cons<T>(t, acc)
        });
    }

    function foldRight1<T, U>(l: IList<T>, z: U, f: (t: T, acc: U) => U): U {
        if(l.isEmpty()) {
            return z;
        } else {
            return f(l.head(), foldRight1<T, U>(l.tail(), z, f))
        }
    }

    function foldLeft1<T, U>(l: IList<T>, z: U, f: (acc: U, t: T) => U): U {
        if(l.isEmpty()) {
            return z;
        } else {
            return foldLeft1(l.tail(), f(z, l.head()), f)
        }
    }

    class Cons<T> implements IList<T> {
        constructor (private hd: T, private tl: IList<T>) {
        }

        head(): T {
            return this.hd;
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

        append(l: IList<T>): IList<T> {
            return append1(this, l);
        }
    }

    export var nil = new Nil<any>();
}