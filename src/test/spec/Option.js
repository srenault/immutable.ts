define(['lib/immutable/Option', 'lib/exceptions'],function(_option, _exceptions) {

    var Option = _option.Option,
        None = _option.None,
        Some = _option.Some;

    describe('Option', function() {

        describe('get', function() {
            it("should return the option's value", function() {
                expect(Option(null).get).to.throw(_exceptions.NoSuchElementError);
                expect(Option(2).get()).to.be.equal(2);
            });
        });

        describe('getOrElse', function() {
            it("should return the option's value if the option is nonempty, otherwise return the result of evaluating default", function() {
                expect(Option(null).getOrElse(function() { return 1; })).to.be.equal(1);
                expect(Option(3).getOrElse(function() { return 1; })).to.be.equal(3);
            });
        });

        describe('orElse', function() {
            it("should return this Option if it is nonempty, otherwise return the result of evaluating alternative", function() {
                var nullOrElse2 = Option(null).orElse(function() { return Option(2); });
                expect(nullOrElse2).to.be.an.instanceof(Some);
                expect(nullOrElse2).to.have.deep.property('t', 2);

                var _3OrElse2 = Option(3).orElse(function() { return Option(2); });
                expect(_3OrElse2).to.be.an.instanceof(Some);
                expect(_3OrElse2).to.have.deep.property('t', 3);
            });
        });

        describe('orNull', function() {
            it("should return the option's value if it is nonempty, or null if it is empty", function() {
                expect(Option(3).orNull()).to.be.equal(3);
                expect(Option(null).orNull()).to.be.equal(null);
            });
        });

        describe('isEmpty', function() {
            it("should test whether this option is empty", function() {
                expect(Option(3).isEmpty()).to.be.false;
                expect(Option(null).isEmpty()).to.be.true;
            });
        });

        describe('nonEmpty', function() {
            it("should test whether this option is non-empty", function() {
                expect(Option(3).nonEmpty()).to.be.true;
                expect(Option(null).nonEmpty()).to.be.false;
            });
        });

        describe('map', function() {
            it("should return a Some containing the result of applying f to this Option's value if this Option is nonempty", function() {
                var multiplyBy3 = Option(3).map(function(t) { return 3 * t; });
                expect(multiplyBy3).to.be.an.instanceof(Some);
                expect(multiplyBy3).to.have.deep.property('t', 9);
            });
        });

        describe('flatMap', function() {
            it("should return the result of applying f to this Option's value if this Option is nonempty", function() {
                var multiplyBy3 = Option(3).flatMap(function(t) { return Option(t*3); });
                expect(multiplyBy3).to.be.an.instanceof(Some);
                expect(multiplyBy3).to.have.deep.property('t', 9);
            });
        });

        describe('filter', function() {
            it("should return this Option if it is nonempty and applying the predicate p to this Option's value returns true", function() {
                var filtered = Option(9).filter(function(t) {
                    return t < 10;
                });
                expect(filtered).to.be.an.instanceof(Some);
                expect(filtered).to.have.deep.property('t', 9);
            });
        });

        describe('filterNot', function() {
            it("should return this Option if it is nonempty and applying the predicate p to this Option's value returns false", function() {
                var filtered = Option(9).filterNot(function(t) {
                    return t > 10;
                });
                expect(filtered).to.be.an.instanceof(Some);
                expect(filtered).to.have.deep.property('t', 9);
            });
        });

        describe('isDefined', function() {
            it("should true if the Option is an instance of Some, false otherwise.", function() {
                expect(Option(3).isDefined()).to.be.true;
                expect(Option(null).isDefined()).to.be.false;
            });
        });

        describe('flatten', function() {
            it("should convert this Option into a option formed by the elements of these Options", function() {
                var flattenSome = Option(Option(3)).flatten();
                expect(flattenSome).to.be.an.instanceof(Some);
                expect(flattenSome).to.have.deep.property('t', 3);

                var flattenNone = Option(new None()).flatten();
                expect(flattenNone).to.be.an.instanceof(None);
            });
        });

        describe('exists', function() {
            it("should return true if this Option is nonempty and the predicate p returns true when applied to this Option's value", function() {
                expect(Option(3).exists(function(t) {
                    return t == 3;
                })).to.be.true;
            });
        });
    });
});