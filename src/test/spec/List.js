define(['lib/immutable/List'],function(collections) {
    var Nil = collections.Nil,
        List = collections.List,
        emptyList = new Nil();

    describe('List', function() {

        describe('head', function() {
            it("should throw an Exception when call head on empty List", function() {
                expect(emptyList.head).to.throw(Error);
            });
        });
    });
});