const add = require('./add');
const expect = require('chai').expect;

describe('加法运算测试',function(){
    it('1加1应该等于2', function(){
        expect(add(1,1)).to.be.equal(2);
        expect({ foo: 'bar', hello: 'universe' }).to.contain.keys('foo');
    });
});