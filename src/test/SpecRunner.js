require.config({
    urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require(['require', 'vendor/chai', 'vendor/mocha'], function(require,chai){

    // Chai
    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    // Mocha
    mocha.setup('bdd');

    // Require base tests before starting
    require(['spec/Option', 'spec/List'], function(person){
        // Start runner
        mocha.run();
    });

});