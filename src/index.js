function Vuue (options){
    this._init(options);
}

Vuue.prototype = {
    construct: Vuue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle')
};
console.log('I get called from print.js!');
module.exports = Vuue;