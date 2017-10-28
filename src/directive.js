/**
 * @module Class 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
 */
import Watcher from "./watcher";

export default class Directive {
    /**
     * 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
     * @param el  element
     * @param vm  Vuue全局对象
     * @param expression
     */
    constructor(el, vm, expression) {
        this.el         = el;
        this.vm         = vm;
        this.expression = expression;
        this.attr       = 'nodeValue';
        this._bind();
        this._update();
    }

    _bind() {
        if(!this.expression) return;

        this._watcher = new Watcher(
            this.vm,
            this.expression,
            this._update,
            this
        );
    }

    /**
     * 更新DOM
     */
    _update() {
        let properties = this.expression.split('.');
        let value = this.vm.$data;
        properties.forEach((property)=>{
            value = value[property];
        });

        this.el[this.attr] =value;
    }
}