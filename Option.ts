export interface IOption<T> {
    get(): T;
    getOrElse(f: () => any): any;
    isEmpty(): boolean;
    map<U>(f: (t: T) => U): IOption<U>;
    flatMap<U>(f: (t: T) => IOption<U>): IOption<U>;
    filter<U>(f: (t: T) => boolean): IOption<T>;
    isDefined(): boolean;
}

export function Option<T>(a: any): IOption<T> {
    if(a != null || a != undefined) {
        return new Some<T>(a)
    } else {
        return new None<T>()
    }
}

export class Some<T> implements IOption<T> {
    constructor (private t: T) {
    }

    get(): T {
        return this.t;
    }

    getOrElse(f: () => any): any {
        return this.get();
    }

    isEmpty(): boolean {
        return false;
    }

    map<U>(f: (t: T) => U): IOption<U> {
        return new Some<U>(f(this.get()));
    }

    flatMap<U>(f: (t: T) => IOption<U>): IOption<U> {
        return f(this.get())
    }

    filter<U>(f: (t: T) => boolean): IOption<T> {
        if(f(this.get())) {
            return this;
        } else {
            return new None<T>();
        }
    }

    isDefined(): boolean {
        return !this.isEmpty();
    }
}

export class None<T> implements IOption<T> {
    constructor() {
    }

    get(): T {
        throw new Error("get on empty value");
    }

    getOrElse(f: () => any): any {
        return f();
    }

    isEmpty(): boolean {
        return true;
    }

    map<U>(f: (t: T) => U): IOption<U> {
        return new None<U>();
    }

    flatMap<U>(f: (t: T) => IOption<U>): IOption<U> {
        return new None<U>();
    }

    filter<U>(f: (t: T) => boolean): IOption<T> {
        return this;
    }

    isDefined(): boolean {
        return !this.isEmpty();
    }
}