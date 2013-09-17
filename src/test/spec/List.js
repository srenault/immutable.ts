define(['lib/immutable/List', 'lib/immutable/Option', 'lib/immutable/Tuple'],function(_list, _option, _tuple) {
    var Nil = _list.Nil,
        List = _list.List,
        Cons = _list.Cons,
        Exceptions = _list.Exceptions,
        Option = _option.Option,
        None = _option.None,
        Some = _option.Some,
        data = {
            emptyList: new Nil(),
            nonEmptyList: List(1,2,3,4)
        };

    function arrayEquals (a1, b1) {
        return a1.reduce(function(acc, a, index) {
            return acc && (a == b1[index]);
        }, true) && (a1.length == b1.length);
    };

    describe('List', function() {

        describe('asArray', function() {
            it("should transform the List to a native Array", function() {
                var isEquals = arrayEquals(data.nonEmptyList.asArray(), [1,2,3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('head', function() {
            it("should throw an NoSuchElementError on empty List", function() {
                expect(data.emptyList.head).to.throw(Exceptions.NoSuchElementError);
            });

            it("should return the first element on non-empty List", function() {
                expect(data.nonEmptyList.head()).to.equal(1);
            });
        });

        describe('last', function() {
            it("should throw an NoSuchElementError on empty List", function() {
                expect(data.emptyList.last).to.throw(Exceptions.NoSuchElementError);
            });

            it("should return the last element on non-empty List", function() {
                expect(data.nonEmptyList.last()).to.equal(4);
            });
        });

        describe('headOption', function() {
            it("should return None on empty List", function() {
                expect(data.emptyList.headOption()).to.be.an.instanceof(None);
            });

            it("should return Some on non-empty List", function() {
                expect(data.nonEmptyList.headOption()).to.be.an.instanceof(Some);
                expect(data.nonEmptyList.headOption()).to.have.deep.property('t', 1);
            });
        });

        describe('lastOption', function() {
            it("should return None on empty List", function() {
                expect(data.emptyList.lastOption()).to.be.an.instanceof(None);
            });

            it("should return Some on non-empty List", function() {
                expect(data.nonEmptyList.lastOption()).to.be.an.instanceof(Some);
                expect(data.nonEmptyList.lastOption()).to.have.deep.property('t', 4);
            });
        });

        describe('tail', function() {
            it("should return an empty List on empty List", function() {
                expect(data.emptyList.tail()).to.be.an.instanceof(Nil);
            });

            it("should return non-empty List on non-empty List", function() {
                expect(data.nonEmptyList.tail()).to.be.an.instanceof(Cons);
                expect(arrayEquals(data.nonEmptyList.tail().asArray(), [2,3,4])).to.be.true;
            });
        });

        describe('isEmpty', function() {
            it("should return true on empty List", function() {
                expect(data.emptyList.isEmpty()).to.be.true;
            });

            it("should return false on non-empty List", function() {
                expect(data.nonEmptyList.isEmpty()).to.be.false;
            });
        });

        describe('nonEmpty', function() {
            it("should return false on empty List", function() {
                expect(data.emptyList.nonEmpty()).to.be.false;
            });

            it("should return true on non-empty List", function() {
                expect(data.nonEmptyList.nonEmpty()).to.be.true;
            });
        });

        describe('length', function() {
            it("should return the List length", function() {
                expect(data.nonEmptyList.length()).to.equal(4);
            });
        });

        describe('appendOne', function() {
            it("should append one element to the List", function() {
                var isEquals = arrayEquals(data.nonEmptyList.appendOne(5).asArray(), [1,2,3,4,5]);
                expect(isEquals).to.be.true;
            });
        });

        describe('append', function() {
            it("should append one List to another List", function() {
                var isEquals = arrayEquals(data.nonEmptyList.append(data.nonEmptyList).asArray(), [1,2,3,4,1,2,3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('prependOne', function() {
            it("should prepend one element to the List", function() {
                var isEquals = arrayEquals(data.nonEmptyList.prependOne(0).asArray(), [0,1,2,3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('prepend', function() {
            it("should prepend List to another List", function() {
                var isEquals = arrayEquals(data.nonEmptyList.prepend(data.nonEmptyList).asArray(), [1,2,3,4,1,2,3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('foldLeft', function() {
            it("should folds the elements of the List, going left to right", function() {
                expect(data.nonEmptyList.foldLeft(0, function(acc, t) {
                    return acc + t;
                })).to.equal(10);
            });
        });

        describe('foldRight', function() {
            it("should folds the elements of the List, going right to left", function() {
                expect(data.nonEmptyList.foldRight(0, function(t, acc) {
                    return acc + t;
                })).to.equal(10);
            });
        });

        describe('reduceLeft', function() {
            it("should throw NoSuchElementError on empty List", function() {
                expect(data.emptyList.reduceLeft).to.throw(Exceptions.NoSuchElementError)
            });

            it("should reduces the elements of the List, going left to right", function() {
                expect(data.nonEmptyList.reduceLeft(function(acc, t) {
                    return acc + t;
                })).to.equal(10);
            });
        });

        describe('reduceLeftOption', function() {
            it("should reduces the elements of the List, going left to right", function() {
                var sum = data.nonEmptyList.reduceLeftOption(function(t, acc) {
                    return acc + t;
                });
                expect(sum).to.be.an.instanceof(Some);
                expect(sum).to.have.deep.property('t', 10);
            });
        });

        describe('reduceRight', function() {
            it("should throw NoSuchElementError on empty List", function() {
                expect(data.emptyList.reduceRight).to.throw(Exceptions.NoSuchElementError)
            });

            it("should reduces the elements of the List, going right to left", function() {
                expect(data.nonEmptyList.reduceRight(function(t, acc) {
                    return acc + t;
                })).to.equal(10);
            });
        });

        describe('reduceRightOption', function() {
            it("should reduces the elements of the List, going right to left", function() {
                var sum = data.nonEmptyList.reduceRightOption(function(t, acc) {
                    return acc + t;
                });
                expect(sum).to.be.an.instanceof(Some);
                expect(sum).to.have.deep.property('t', 10);
            });
        });

        describe('map', function() {
            it("should build a new List by applying a function to all elements of the List", function() {
                var array = data.nonEmptyList.map(function(t) {
                    return t + 2;
                }).asArray();
                var isEquals = arrayEquals(array, [3,4,5,6]);
                expect(isEquals).to.be.true;
            });
        });

        describe('flatMap', function() {
            it("should build a new List by applying a function to all elements of this List and using the elements of the resulting Lists", function() {
                var array = data.nonEmptyList.flatMap(function(t) {
                    return List(5,6,7,8).map(function(u) {
                        return u * t;
                    });
                }).asArray();
                var isEquals = arrayEquals(array, [5,6,7,8,10,12,14,16,15,18,21,24,20,24,28,32]);
                expect(isEquals).to.be.true;
            });
        });

        describe('flatten', function() {
            it("should converts this List of traversable List into a List formed by the elements of these traversable Lists.", function() {
                (function() {
                    var arrayOfLists = List(List(1,2), List(3,4), List(5,6));
                    var isEquals = arrayEquals(arrayOfLists.flatten().asArray(), [1,2,3,4,5,6]);
                    expect(isEquals).to.be.true;
                })();

                (function() {
                    var arrayOfOptions = List(Option(1), Option(null), Option(2), Option(3));
                    var isEquals = arrayEquals(arrayOfOptions.flatten().asArray(), [1,2,3]);
                    expect(isEquals).to.be.true;
                })();
            });
        });

        describe('filter', function() {
            it("should select all elements of this List which satisfy a predicate", function() {
                var array = data.nonEmptyList.filter(function(t) {
                    return t <= 2;
                }).asArray();
                var isEquals = arrayEquals(array, [1,2]);
                expect(isEquals).to.be.true;
            });
        });

        describe('filterNot', function() {
            it("should returns a new List obtained by removing all key/value pairs for which the predicate returns true", function() {
                var array = data.nonEmptyList.filterNot(function(t) {
                    return t <= 2;
                }).asArray();
                var isEquals = arrayEquals(array, [3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('find', function() {
            it("should find the first element of the List satisfying a predicate", function() {
                (function() {
                    var maybeFound = data.nonEmptyList.find(function(t) {
                        return t == 2;
                    });
                    expect(maybeFound).to.be.an.instanceof(Some);
                    expect(maybeFound).to.have.deep.property('t', 2);
                })();

                (function() {
                    var maybeFound = data.nonEmptyList.find(function(t) {
                        return t == -1;
                    });
                    expect(maybeFound).to.be.an.instanceof(None);
                })();
            });
        });

        describe('foreach', function() {
            it("should apply a function f to all elements of this List", function() {
                var tmp = [];
                data.nonEmptyList.foreach(function(t) {
                    tmp.push(t);
                });
                expect(arrayEquals(tmp, [1,2,3,4])).to.be.true;
            });
        });

        describe('reverse', function() {
            it("should return new list wih elements in reversed order", function() {
                var reversedArray = data.nonEmptyList.reverse().asArray();
                expect(arrayEquals(reversedArray, [4,3,2,1])).to.be.true;
            });
        });

        describe('mkString', function() {
            it("should display all elements of this map in a string", function() {
                expect(data.nonEmptyList.mkString(',')).to.equal('1,2,3,4');
            });
        });

        describe('zip', function() {
            it("should returns a List formed from this List and another List by combining corresponding elements in pairs.", function() {
                var zipped = data.nonEmptyList.zip(data.nonEmptyList).asArray();
                var nonEmptyList = data.nonEmptyList.asArray();
                var isEquals = zipped.reduce(function(acc, t, index) {
                    return acc && (t._1 == nonEmptyList[index] && t._2 == nonEmptyList[index])
                }, true);
                expect(isEquals).to.be.true;
            });
        });

        describe('zipWithIndex', function() {
            it("should zip the List with its indices.", function() {
                var zipped = data.nonEmptyList.zipWithIndex(data.nonEmptyList).asArray();
                var nonEmptyList = data.nonEmptyList.asArray();
                var isEquals = zipped.reduce(function(acc, t, index) {
                    return acc && (t._1 == nonEmptyList[index] && t._2 == index)
                }, true);
                expect(isEquals).to.be.true;
            });
        });

        describe('init', function() {
            it("should select all elements except the last", function() {
                var array = data.nonEmptyList.init().asArray();
                var isEquals = arrayEquals(array, [1,2,3]);
                expect(isEquals).to.be.true;
            });
        });

        describe('take', function() {
            it("should select first n elements", function() {
                var array = data.nonEmptyList.take(2).asArray();
                var isEquals = arrayEquals(array, [1,2]);
                expect(isEquals).to.be.true;
            });
        });

        describe('takeWhile', function() {
            it("should take longest prefix of elements that satisfy a predicate", function() {
                var array = data.nonEmptyList.takeWhile(function(t) {
                    return t <= 2;
                }).asArray();
                var isEquals = arrayEquals(array, [1,2]);
                expect(isEquals).to.be.true;
            });
        });

        describe('drop', function() {
            it("should select all elements except first n ones", function() {
                var array = data.nonEmptyList.dropWhile(function(t) {
                    return t <= 2;
                }).asArray();
                var isEquals = arrayEquals(array, [3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('dropRight', function() {
            it("should select all elements except last n ones", function() {
                var array = data.nonEmptyList.dropRight(2).asArray();
                var isEquals = arrayEquals(array, [1,2]);
                expect(isEquals).to.be.true;
            });
        });

        describe('get', function() {
            it("should throw an NoSuchElementError on empty List", function() {
                expect(data.emptyList.get).to.throw(Exceptions.NoSuchElementError);
            });

            it("should throw an NoSuchElementError when index is out of bounds", function() {
                expect(function() { return data.nonEmptyList.get(-1); }).to.throw(Exceptions.NoSuchElementError);
            });

            it("should return the n element", function() {
                expect(data.nonEmptyList.get(1)).to.equal(2);
            });
        });

        describe('splitAt', function() {
            it("should split this List into two at a given position", function() {
                var split = data.nonEmptyList.splitAt(2);
                var isEquals = arrayEquals(split._1.asArray(), [1,2]) && arrayEquals(split._2.asArray(), [3,4]);
                expect(isEquals).to.be.true;
            });
        });

        describe('count', function() {
            it("should count the number of elements in the List which satisfy a predicate", function() {
                expect(data.nonEmptyList.count(function(t) {
                    return t < 3;
                })).to.equal(2);
            });
        });

        describe('contains', function() {
            it("should test whether this map contains a binding for a key", function() {
                expect(data.nonEmptyList.contains(4)).to.be.true;
                expect(data.nonEmptyList.contains(5)).to.be.false;
            });
        });

        describe('exists', function() {
            it("should test whether a predicate holds for some of the elements of this List", function() {
                expect(data.nonEmptyList.exists(function(t) {
                    return t == 4;
                })).to.be.true;
            });
        });

        describe('distinct', function() {
            it("should build a new List from this List without any duplicate elements", function() {
                var array = List(1,2,1,3,2).distinct().asArray();
                expect(arrayEquals(array, [1,2,3])).to.be.true;
            });
        });

        describe('indexOf', function() {
            it("should find index of first occurrence of some value in this List", function() {
                expect(data.nonEmptyList.indexOf(3)).to.equal(2);
            });
        });

        describe('indexOfAfter', function() {
            it("should find index of first occurrence of some value in this List at some start index", function() {
                expect(List(1,2,1,2,3,4).indexOfAfter(2, 1)).to.equal(3);
            });
        });

        describe('indexWhere', function() {
            it("should find index of the first element satisfying some predicate", function() {
                expect(data.nonEmptyList.indexWhere(function(t) {
                    return t == 3;
                })).to.equal(2);
            });
        });

        describe('indexWhereAfter', function() {
            it("should find index of the first element satisfying some predicate at some start index", function() {
                expect(List(1,2,1,2,3,4).indexWhereAfter(function(t) {
                    return t == 2;
                }, 1)).to.equal(3);
            });
        });

        describe('lastIndexOf', function() {
            it("should find index of last occurrence of some value in this List", function() {
                expect(List(1,2,3,4,2).lastIndexOf(2)).to.equal(4);
            });
        });

        describe('lastIndexWhere', function() {
            it("should find index of last occurrence of some value in this List", function() {
                expect(List(1,2,3,4,2).lastIndexWhere(function(t) {
                    return t == 2;
                }, 4)).to.equal(4);
            });
        });

        describe('lastIndexWhereAfter', function() {
            it("should find index of last occurrence of some value in this List at some end index", function() {
                expect(List(1,2,3,4,2).lastIndexWhereAfter(function(t) {
                    return t == 2;
                }, 4)).to.equal(1);
            });
        });

        describe('padTo', function() {
            it("should make a copy of this List with an element value appended until a given target length is reached", function() {
                var array = data.nonEmptyList.padTo(10, 0).asArray();
                expect(arrayEquals(array, [1,2,3,4,0,0,0,0,0,0])).to.be.true;
            });
        });

        describe('span', function() {
            it("should split this List into a prefix/suffix pair according to a predicate", function() {
                var r = data.nonEmptyList.span(function(t) {
                    return t <= 2;
                });
                expect(arrayEquals(r._1.asArray(), [1,2]) && arrayEquals(r._2.asArray(), [3,4])).to.be.true;
            });
        });

        describe('forall', function() {
            it("should test whether a predicate holds for all elements of this List", function() {
                expect(data.nonEmptyList.forall(function(t) {
                    return t < 5;
                })).to.be.true;
            });
        });

        describe('collect', function() {
            it("should build a new List by applying a function to all elements of this List on which the function is defined", function() {
                var array = data.nonEmptyList.collect(function(t) {
                    if(t > 2) {
                        return new Some(t * 2);
                    } else {
                        return new None();
                    }
                }).asArray();
                var isEquals = arrayEquals(array, [6,8]);
                expect(isEquals).to.be.true;
            });
        });

        describe('collectFirst', function() {
            it("should find the first element of the List for which the given function is defined, and applies the function to it.", function() {
                var result = data.nonEmptyList.collectFirst(function(t) {
                    if(t == 2) {
                        return new Some(t.toString());
                    } else {
                        return new None();
                    }
                });
                expect(result).to.be.an.instanceof(Some);
            });
        });

        describe('partition', function() {
            it("should partitions this list in two lists according to a predicate", function() {
                var r = data.nonEmptyList.partition(function(t) {
                    return (t % 2) == 0;
                });
                expect(arrayEquals(r._1.asArray(), [2,4]) && arrayEquals(r._2.asArray(), [1,3])).to.be.true;
            });
        });

        describe('lift', function() {
            it("should turn this function into another function returning an Option result", function() {
                expect(data.nonEmptyList.lift()(3)).to.be.an.instanceof(Some);
                expect(data.nonEmptyList.lift()(3)).to.have.deep.property('t', 4);
            });
        });

        describe('startsWith', function() {
            it("should test whether this list starts with the given sequence", function() {
                expect(data.nonEmptyList.startsWith(List(1,2))).to.be.true;
            });
        });

        describe('startsWithAt', function() {
            it("should test whether this list contains the given sequence at a given index", function() {
                expect(data.nonEmptyList.startsWithAt(List(3,4), 2)).to.be.true;
            });
        });

        describe('endsWith', function() {
            it("should test whether this list ends with the given sequence", function() {
                expect(data.nonEmptyList.endsWith(List(3,4))).to.be.true;
            });
        });
    });
});