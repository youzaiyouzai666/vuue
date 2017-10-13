import {_updateBindingAt} from './bindings'
// const _updateBindingAt = require('./bindings')._updateBindingAt;
exports._init = function (options) {
    this.$data = options.data;
    this.$el   = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);
    this._directives = [];//存放指令

    this.observer = this.observer.create(this.$data);

    // this.observer.on('set', this.$mount.bind(this));
    debugger;
    this.observer.on('set', _updateBindingAt.bind(this));

    // _updateBindingAt();
    this.$mount();
};