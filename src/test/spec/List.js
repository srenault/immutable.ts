define(['lib/immutable/List', 'lib/immutable/Option'],function(_list, _option) {
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
    });
});