import parseText from '../../../../src/parses/text';

const testCases = [
    {
        // no tags
        text    : 'haha',
        expected: [
            {tag: false, value: 'haha'}
        ]
    },
    {
        // basic
        text    : 'a{{ a }}c',
        expected: [
            {tag: false, value: 'a '},
            {tag: true, value: 'a',},
            {tag: false, value: ' c'}
        ]
    },
    {
        // html
        text    : '{{ text }} and {{{ html }}}',
        expected: [
            {tag: true, value: 'text'},
            {tag: false, value: 'and'},
            {tag: true, value: 'html'}
        ]
    },
    {
        text: '[{{abc}}]',
        expected: [
            { value: '[' },
            { tag: true, value: 'abc'},
            { value: ']' }
        ]
    },

];

function assertParse(test) {
    var res = parseText(test.text);
    var exp = test.expected;

    if (exp.length <= 1) {
        res.forEach(function (v, i) {
            expect(v.value).to.be.equal(exp[i].value);
            if(v.tag) expect(v.tag).to.be.equal(exp[i].tag);
        });

    } else {

    }

    // tag.should.equal(test.tag)

}

describe('Test parser', function () {
    it('parse', function () {
        testCases.forEach(assertParse);
    })
});
