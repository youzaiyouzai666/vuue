/**
 * Created by CAOYI on 2017/10/24.
 */
import Batcher from './batcher';
import Observer from './observer/observer';
import * as expParser from './parses/expression';

let uid     = 0;
let batcher = new Batcher();

export default class Watcher {
    /**
     *
     * @param vm {Vuue} Vuue实例
     * @param expression {String} 表达式, 例如: "user.name"
     * @param cb   {Function} 当对应的数据更新的时候执行的回调函数
     * @param ctx  {Object} 回调函数执行上下文
     */
    constructor(vm, expression, cb, ctx) {
        this.id         = uid++;
        this.vm         = vm;
        this.expression = expression;
        this.cb         = cb; //回调函数
        this.ctx        = ctx || vm; //回调函数执行上下文
        this.getter     = expParser.compileGetter(expression);
        this.value      = '';

        this.initDeps(expression);
    }

    initDeps(path) {
        this.addDep(path);
        this.value = this.get();
    }

    /**
     * getter.call是完成计算属性的核心,
     * 因为正是这里的getter.call, 执行了该计算属性的getter方法,
     * 从而执行该计算属性所依赖的原始原型的get方法
     * 从而发出get事件,冒泡到底层, 触发collectDep事件
     */
    get() {
        Observer.emitGet       = true;
        this.vm._activeWatcher = this;

        let value = this.getter.call(this.vm, this.vm.$data);

        Observer.emitGet       = false;
        this.vm._activeWatcher = null;

        return value;
    }

    addDep(path) {
        let vm      = this.vm;
        let binding = vm._createBingingAt(path);
        binding._addSub(this);
    }

    //执行 并准备参数
    run() {
        let value    = this.get();
        let oldValue = this.value;
        this.value   = value;
        this.cb.call(this.ctx, value, oldValue);//准备参数参数
    }

    //添加延时加载
    update() {
        // this.cb.call(this.ctx, arguments);
        batcher.push(this);
    }
}