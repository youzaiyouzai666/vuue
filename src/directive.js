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
        this.bind();
        this.update();
    }

    bind() {
        if(!this.expression) return;

        this._watcher = new Watcher(

        );
    }

    /**
     * 更新DOM
     */
    update() {
        this.el[this.attr] = this.vm.$data[this.expression];
    }
}