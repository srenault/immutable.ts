import _option = require('./Option');

export interface IEither<T, U> {
    isLeft(): boolean;
    isRight(): boolean;
    left(): LeftProjection<T, U>;
    right(): RightProjection<T, U>;
    fold<X>(ft: (t: T) => X, fu: (u: U) => X): X;
}

export class Left<T, U> implements IEither<T, U> {

    constructor(private t: T) {
    }

    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }

    left(): LeftProjection<T, U> {
        return new LeftProjection<T, U>(this);
    }

    right(): RightProjection<T, U> {
        return new RightProjection<T, U>(this);
    }

    fold<X>(ft: (t: T) => X, fu: (u: U) => X): X {
        return ft(this.t);
    }
}

export class Right<T, U> implements IEither<T, U> {

    constructor(private u: U) {
    }

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }

    left(): LeftProjection<T, U> {
        return new LeftProjection<T, U>(this);
    }

    right(): RightProjection<T, U> {
        return new RightProjection<T, U>(this);
    }

    fold<X>(ft: (t: T) => X, fu: (u: U) => X): X {
        return fu(this.u);
    }
}

export class LeftProjection<T, U> {

    constructor(private e: IEither<T, U>) {
    }

    exists(f: (t: T) => boolean): boolean {
        return this.e.fold((t) => {
            return f(t);
        }, (u) => {
            return false;
        });
    }

    toOption(): _option.IOption<T> {
        return this.e.fold<_option.IOption<T>>((t) => {
            return new _option.Some<T>(t);
        }, (u) => {
            return new _option.None<T>();
        });
    }

    filter(f: (t: T) => boolean): _option.IOption<IEither<T, U>> {
        return this.toOption().filter(f).map<IEither<T, U>>(() => {
            return this.e;
        });
    }

    foreach(f: (t: T) => void): void {
        return this.toOption().foreach(f);
    }

    getOrElse(or: () => T): T {
        return this.e.fold((t) => {
            return t;
        }, (u) => {
            return or();
        });
    }
}

export class RightProjection<T, U> {

    constructor(private e: IEither<T, U>) {
    }

    exists(f: (u: U) => boolean): boolean {
        return this.e.fold((t) => {
            return false;
        }, (u) => {
            return f(u);
        });
    }

    toOption(): _option.IOption<U> {
        return this.e.fold<_option.IOption<U>>((u) => {
            return new _option.None<U>();
        }, (u) => {
            return new _option.Some<U>(u);
        });
    }

    filter(f: (u: U) => boolean): _option.IOption<IEither<T, U>> {
        return this.toOption().filter(f).map<IEither<T, U>>(() => {
            return this.e;
        });
    }

    foreach(f: (u: U) => void): void {
        return this.toOption().foreach(f);
    }

    getOrElse(or: () => U): U {
        return this.e.fold((t) => {
            return or();
        }, (u) => {
            return u;
        });
    }
}
