/**
 * Created by CAOYI on 2017/10/24.
 */
import Batcher from './batcher';

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
        this.addDep(expression);
    }

    addDep(path) {
        let vm      = this.vm;
        let binding = vm._createBingingAt(path);
        binding._addSub(this);
    }

    update() {
        // this.cb.call(this.ctx, arguments);
        batcher.push(this);
    }
}