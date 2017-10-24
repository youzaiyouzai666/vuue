import Binding from "../binding";

exports._updateBindingAt = function () {
    const path    = arguments[0];
    const pathAry = path.split('.');

    let r = this._rootBinding;
    pathAry.forEach((key) => {
        r = r[key];
    });

    this._directives.forEach((directive) => {
        if (directive.expression !== path) return;
        directive.update();
    });
};

exports._initBindings = function () {
    this._rootBinding = new Binding();
    this.observer.on('set', this._updateBindingAt.bind(this));

    const obj = this.$data;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            this._createBingingAt(key);
        }
    }
};

exports._createBingingAt = function (path) {
    let b         = this._rootBinding;
    const pathAry = path.split('.');

    debugger;
    pathAry.forEach((key) => {
        b[key] = b._addChild(key);//层级绑定 b就是一个临时变量
        b      = b[key];
    });
    return b;
};