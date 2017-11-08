/**
 * @module Class 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
 */
import Watcher from "./watcher";
import * as _ from "./util";

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

    _bind() {
        if (!this.expression) return;

        this._watcher = new Watcher(
            this.vm,
            this.expression,
            this._update.bind(this),
            this
        );
        //自己手动update了
        this.update(this._watcher.value);
    }

    _initDef(){
        let def = this.vm.$options.directives[this.type];
        _.extend(this, def);
    }

    /**
     * 更新DOM,核心更新方法
     */
    _update() {
        this.update()
    }
}