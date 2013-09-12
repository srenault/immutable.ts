import _option = require('./Option');
import _list = require('./List');

export interface ITraversable<T> {}

export function isTraversable(a: any): boolean {
    return isList(a) || isOption(a);
}

export function isList(a: any) {
    return (a instanceof _list.Cons) || (a instanceof _list.Nil);
}

export function isOption(a: any) {
    return (a instanceof _option.Some) || (a instanceof _option.None);
}
