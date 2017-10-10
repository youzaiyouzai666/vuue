function Vuue (options){
    this._init(options);
}

Vuue.prototype = {
    constructor: Vuue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle'),
    observer: {...require('./observer/observer')}
};
module.exports = window.Vuue =  Vuue;