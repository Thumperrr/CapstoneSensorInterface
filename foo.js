var bar = 'bar';

// export the class
module.exports = {
    fooBar: function() {
        console.log(bar);
    },
    foo: function(b) {
        bar = b;
    }
};
