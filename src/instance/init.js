exports._init = function (options) {
    this.$data = options.data;
    this.$el   = document.querySelector(options.el);//得到dom

    //通过 observer 对data数据进行监听，并且提供订阅某个数据项的变化
    this._initData(this.$data);

    //初始化 _rootBinding 并绑定回调事件
    this._initBindings();

    if (options.el) {
        this._directives = [];//存放指令

        /**
         *  1 解析DOM模板，通过data渲染模板
         *  2 解析DOM模板，生成directive,并push到 this._directives
         */
        this.$mount();
    }
};