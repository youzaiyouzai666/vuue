import Binding from "../binding";

exports._updateBindingAt = function () {
    const path    = arguments[0];
    const pathAry = path.split('.');

    let r = this._rootBinding;
    pathAry.forEach((key) => {
        r = r[key];
    });
    r._subs.forEach((watcher) =>{
        watcher.update();
    });
};

exports._initBindings = function () {
    this._rootBinding = new Binding();
    this._observer.on('set', this._updateBindingAt.bind(this))
        .on('get',this._collectDep.bind(this));
};

exports._createBingingAt = function (path) {
    let b         = this._rootBinding;
    const pathAry = path.split('.');

    pathAry.forEach((key) => {
        b[key] = b._addChild(key);//层级绑定 b就是一个临时变量， 每一个属性都是 binding对象
        b      = b[key];
    });
    return b;
};
exports._collectDep = function(){

};