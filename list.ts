export module ts {

    export interface IList<T> {
        head(): T;

        tail(): IList<T>;

        isEmpty(): boolean;

        length(): number;

        foldLeft<U>(z: U, f: (acc: U, t: T) => U): U;

        foldRight<U>(z: U, f: (t: T, acc: U) => U): U;

        append(l: IList<T>): IList<T>;

        map<U>(f: (t: T) => U): IList<U>;

        flatMap<U>(f: (t: T) => IList<U>): IList<U>;

        filter(f: (t: T) => boolean): IList<T>;

        foreach(f: (t: T) => void): void;

        reverse(): IList<T>;

        asArray(): T[];

        mkString(sep: string): string;
    }

    export function List<T>(...as: T[]): IList<T> {
        if(as.length == 0) {
            return new Nil<T>();
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

        foldLeft<U> (z: U, f: (acc: U, t: T) => U): U {
            return foldLeft1<T, U>(this, z, f);
        }

        foldRight<U> (z: U, f: (t: T, acc: U) => U): U {
            return foldRight1<T, U>(this, z, f);
        }

        append(l: IList<T>): IList<T> {
            return append1(this, l);
        }

        map<U>(f: (t: T) => U): IList<U> {
            return map1(this, f);
        }

        flatMap<U>(f: (t: T) => IList<U>): IList<U> {
            return flatMap1(this, f);
        }

        filter(f: (t: T) => boolean): IList<T> {
            return filter1(this, f);
        }

        foreach(f: (t: T) => void): void {
            return foreach1(this, f);
        }

        reverse(): IList<T> {
            return reverse1(this);
        }

        asArray(): T[] {
            return asArray1(this);
        }

        mkString(sep: string): string {
            return mkString1(this, sep);
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

        map<U>(f: (t: T) => U): IList<U> {
            return map1(this, f);
        }

        flatMap<U>(f: (t: T) => IList<U>): IList<U> {
            return flatMap1(this, f);
        }

        filter(f: (t: T) => boolean): IList<T> {
            return filter1(this, f);
        }

        foreach(f: (t: T) => void): void {
            return foreach1(this, f);
        }

        reverse(): IList<T> {
            return reverse1(this);
        }

        asArray(): T[] {
            return asArray1(this);
        }

        mkString(sep: string): string {
            return mkString1(this, sep);
        }
    }

    function append1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
        return foldRight1(l1, l2, (t, acc) => {
            return new Cons<T>(t, acc)
        });
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

    function map1<T, U>(l: IList<T>, f: (t: T) => U): IList<U> {
        return l.foldRight<IList<U>>(new Nil<U>(), (t, acc) => {
            return new Cons<U>(f(t), acc);
        });
    }

    function concat1<T>(ll: IList<IList<T>>): IList<T> {
        return ll.foldRight(new Nil<T>(), (t, acc) => {
            return t.append(acc);
        });
    }

    function flatMap1<T, U>(l: IList<T>, f: (t: T) => IList<U>): IList<U> {
        return concat1<U>(l.map<IList<U>>(f));
    }

    function filter1<T>(l: IList<T>, f: (t: T) => boolean): IList<T> {
        return l.foldRight<IList<T>>(new Nil<T>(), (t, acc) => {
            if(f(t)) {
                return acc;
            } else {
                return new Cons<T>(t, acc);
            }
        });
    }

    function foreach1<T>(l: IList<T>, f: (t: T) => void): void {
        l.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            f(t);
            return acc;
        });
    }

    function reverse1<T>(l: IList<T>): IList<T> {
        return l.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            return new Cons<T>(t, acc);
        });
    }

    function mkString1<T>(l: IList<T>, sep: string): string {
        return l.foldLeft<string>("", (acc, t) => {
            if(acc == "") return t;
            else return acc + sep + t;
        });
    }

    function asArray1<T>(l: IList<T>): T[] {
        return l.foldLeft<T[]>([], (acc, t) => {
            acc.push(t);
            return acc;
        });
    }
}