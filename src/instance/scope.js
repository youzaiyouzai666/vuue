/**
 * Created by CAOYI on 2017/10/26.
 */
import Observer from '../observer/observer';

exports._initData = function (data) {
    if(this.$parent){
        this._observer = this.$parent._observer;
    }else{
        this._observer = Observer.create(data);
    }
};

/**
 * 初始化 计算属性
 * @private
 */
exports._initComputed = function () {
    const computed = this.$options.computed;
    if (!computed) return;

    for (let key in computed) {
        let def = computed[key];
        if (typeof  def === 'function') {
            def = {
                get         : def,
                enumerable  : true,
                configurable: true,
            };
            Object.defineProperty(this.$data, key, def);
        }
    }

};