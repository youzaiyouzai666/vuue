
exports._init = function (options) {
    this.$data = options.data;
    this.$el   = document.querySelector(options.el);//得到dom
    // this.$template = this.$el.cloneNode(true);
    // this._directives = [];//存放指令

    this._initData(this.$data);

    this._initBindings();

    // _updateBindingAt();
    this.$mount();
};