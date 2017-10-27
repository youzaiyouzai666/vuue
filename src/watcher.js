/**
 * Created by CAOYI on 2017/10/24.
 */
export default class Watcher{
    constructor(vm, expression, cb, ctx){
        this.vm = vm;
        this.expression = expression;
        this.cb = cb;
        this.ctx = ctx || vm;
        this.addDep(expression);
    }

    addDep(path){
        let vm = this.vm;
        let binding = vm._createBingingAt(path);
        binding._addSub(this);
    }
}