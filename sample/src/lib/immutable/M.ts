import _option = require('./Option');
import _list = require('./List');

export interface Iterable<T> {}

export function flatten<T>(a: any): Iterable<T> {
    if(isList(a)) {
        var l = <_list.IList<T>> <any> a;
        return l;
    } else if(isOption(a)) {
        var o = <_option.IOption<T>> <any> a;
        return o;
    } else {
        throw new Error("flatten on non-iterable structure");
    }
}

export function isIterable(a: any): boolean {
    return isList(a) || isOption(a);
}

export function isList(a: any) {
    return (a instanceof _list.Cons) || (a instanceof _list.Nil);
}

export function isOption(a: any) {
    return (a instanceof _option.Some) || (a instanceof _option.None);
}
