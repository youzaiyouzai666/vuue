exports.$mount = function (el) {

    // this.$el 赋值
    this._initElement(el);
    /**
     *  1 解析DOM模板，通过data渲染模板
     *  2 解析DOM模板，生成directive,并push到 this._directives
     */
    this._compile();
};

