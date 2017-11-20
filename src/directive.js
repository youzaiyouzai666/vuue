/**
 * @module Class 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
 */
import Watcher from "./watcher";
import * as _ from "./util";

/**
 * Directive 与./src/directive 组合使用
 * 核心分为  bind与 update 两个生命周期
 */
export default class Directive {
    /**
     * 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
     * @param type
     * @param el  element
     * @param vm  Vuue全局对象
     * @param expression
     */
    constructor(type, el, vm, expression) {
        this.type       = type;
        this.el         = el;
        this.vm         = vm;
        this.expression = expression;
        this.attr       = 'nodeValue';

        this._initDef();
        this._bind();
    }

    /**
     * 引入 ./src/directive 中匹配的
     * @private
     */
    _initDef(){
        let def = this.vm.$options.directives[this.type];
        _.extend(this, def);//引入 特定的处理
    }

    /**
     * 生命周期 bind
     * @private
     */
    _bind() {
        if (!this.expression) return;

        this.bind  && this.bind();

        this._watcher = new Watcher(
            this.vm,
            this.expression,
            this._update.bind(this),
            this
        );
        //自己手动update了
        this.update(this._watcher.value);
    }

    /**
     * 生命周期 update
     * 更新DOM,核心更新方法
     * watcher  run()方法调用，并传递参数过来
     */
    _update(value, oldValue) {
        this.update(value, oldValue)
    }
}