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
console.log('Vuue:',Vuue);
module.exports = window.Vuue =  Vuue;