/**
 *
 * @param options
 * @constructor
 */
function Vuue(options) {
    this._init(options);
}

Vuue.prototype = {
    constructor: Vuue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./instance/bindings'),
    ...require('./instance/scope'),
    ...require('./api/lifecycle'),

};

module.exports = window.Vuue = Vuue;//todo 这个全局变量这么写太low了