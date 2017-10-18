const textParser = require('../../../../src/parses/text');
const expect = require('chai').expect;

var testCases = [
    {
        // no tags
        text: 'haha',
        expected: null
    },
    {
        // basic
        text: 'a {{ a }} c',
        expected: [
            { value: 'a ' },
            { tag: true, value: 'a',},
            { value: ' c' }
        ]
    }
];
function assertParse (test) {
    var res = textParser.parseText(test.text)
    var exp = test.expected
    if (!Array.isArray(exp)) {
        expect(res).toBe(exp)
    } else {
        expect(res.length).toBe(exp.length)
        res.forEach(function (r, i) {
            var e = exp[i]
            for (var key in e) {
                expect(e[key]).toEqual(r[key])
            }
        })
    }
}

describe('Test parser', function(){
    it('parse', function(){
        testCases.forEach(assertParse);
    })
});
