import * as _ from '../util/index';

exports._init = function (options) {
    this.$options = options;
    _.extend(this.$options, this.constructor.options);

    this.$data    = options.data || {};

    //通过 observer 对data数据进行监听，并且提供订阅某个数据项的变化
    this._initData(this.$data);
    this._initComputed();

    //初始化 _rootBinding 并绑定回调事件
    this._initBindings();

    if (options.el) {
        this._directives = [];//存放指令

        /**
         *  1 解析DOM模板，通过data渲染模板
         *  2 解析DOM模板，生成directive,并push到 this._directives
         */
        this.$mount(options.el);
    }
};