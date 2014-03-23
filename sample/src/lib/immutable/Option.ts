import _tr = require('./Traversable');
import _exceptions = require('./exceptions');

export interface IOption<T> extends _tr.ITraversable<T> {
    get(): T;
    orElse<U>(f: () => IOption<U>);
    orNull(): T;
    getOrElse<U>(f: () => U): U;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    map<U>(f: (t: T) => U): IOption<U>;
    flatMap<U>(f: (t: T) => IOption<U>): IOption<U>;
    foreach(f: (t: T) => void): void;
    filter(f: (t: T) => boolean): IOption<T>;
    filterNot(f: (t: T) => boolean): IOption<T>;
    isDefined(): boolean;
    //flatten<U>(): IOption<U>;
    exists(f: (t: T)=> boolean): boolean;
}

export function Option<T>(a: any): IOption<T> {
    if(a != null || a != undefined) {
        return new Some<T>(a);
    } else {
        return new None<T>();
    }
}

export class Some<T> implements IOption<T> {
    constructor (private t: T) {
    }

    get(): T {
        return this.t;
    }

    getOrElse<U>(f: () => U): U {
        return <U><any>this.get();
    }

    orElse<U>(f: () => IOption<U>): IOption<U> {
        return <IOption<U>><any>this;
    }

    orNull(): T {
        return this.get();
    }

    isEmpty(): boolean {
        return false;
    }

    nonEmpty(): boolean {
        return !this.isEmpty();
    }

    map<U>(f: (t: T) => U): IOption<U> {
        return new Some<U>(f(this.get()));
    }

    flatMap<U>(f: (t: T) => IOption<U>): IOption<U> {
        return f(this.get())
    }

    // flatten<U>(): IOption<U> {
    //     //var self = this;
    //     return this.flatMap<U>((t) => {
    //         // if(_tr.isOption(t)) {
    //         //     return <U><any>t;
    //         // } else {
    //         //     return new Some<U>(<U><any>self.get());
    //         // }
    //         return new None<U>();
    //     });
    // }
    foreach(f: (t: T) => void): void {
        f(this.get());
    }

    filter(f: (t: T) => boolean): IOption<T> {
        if(f(this.get())) {
            return this;
        } else {
            return new None<T>();
        }
    }

    filterNot(f: (t: T) => boolean): IOption<T> {
        return this.filter((t) => {
            return !f(t);
        });
    }

    isDefined(): boolean {
        return !this.isEmpty();
    }

    exists(f: (t: T) => boolean): boolean {
        return this.filter(f).isDefined();
    }
}

export class None<T> implements IOption<T> {
    constructor() {
    }

    get(): T {
        throw new _exceptions.noSuchElement("None.get");
    }

    getOrElse<U>(f: () => U): U {
        return f();
    }

    orElse<U>(f: () => IOption<U>): IOption<U> {
        return f();
    }

    orNull(): T {
        return null;
    }

    isEmpty(): boolean {
        return true;
    }

    nonEmpty(): boolean {
        return !this.isEmpty();
    }

    map<U>(f: (t: T) => U): IOption<U> {
        return new None<U>();
    }

    flatMap<U>(f: (t: T) => IOption<U>): IOption<U> {
        return new None<U>();
    }

    // flatten<U>(): IOption<U> {
    //     return new None<U>();
    // }

    foreach(f: (t: T) => void): void {
        return null;
    }

    filter(f: (t: T) => boolean): IOption<T> {
        return this;
    }

    filterNot(f: (t: T) => boolean): IOption<T> {
        return this;
    }

    isDefined(): boolean {
        return !this.isEmpty();
    }

    exists(f: (t: T) => boolean): boolean {
        return false;
    }
}