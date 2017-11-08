/**
 *
 * @param options
 * @constructor
 */
import directives from './directives/index';
//import * as _ from './util/index';
// import init from './instance/init';

function Vuue(options) {
    this._init(options);
}
// const p = Vuue.prototype;
// _.extend(p,init);
Vuue.prototype = {
    constructor: Vuue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./instance/bindings'),
    ...require('./instance/scope'),
    
    ...require('./api/lifecycle'),
    ...require('./api/data'),

};
Vuue.options = {
    directives: directives
};

module.exports = window.Vuue = Vuue;//todo 这个全局变量这么写太low了