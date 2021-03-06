/**
 * 遍历数据 并给数据（通过set）绑定事件
 * Created by CAOYI on 2017/10/9.
 */

const ARRAY  = 0;
const OBJECT = 1;

export default class Observer {
    static  emitGet = false;
    /**
     *
     * @param value
     * @param type
     */
    constructor(value, type) {
        this.value = value;
        if (type === ARRAY) {
            this.link(value);
        } else if (type === OBJECT) {
            this.walk(value);
        }
    }

    static create(value) {
        if (Array.isArray(value)) {
            return new Observer(value, ARRAY);
        } else if (typeof value === 'object') {
            return new Observer(value, OBJECT);
        }
    }

    link() {

    }

    walk(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let val = obj[key];

                // 递归
                // this.observe(key, val);
                this.convert(key, val);

            }
        }
    }

    observe(key, val) {
        let ob = Observer.create(val);
        if (!ob) return;
        ob.parent = {
            key,
            ob: this
        };
    }

    /**
     * set与get方法绑定，可以理解为动态绑定的开关处
     * @param key
     * @param val
     */
    convert(key, val) {//形成闭包
        const ob = this;
        Object.defineProperty(this.value, key, {
            enumerable  : true,
            configurable: true,
            get         : function () {
                if(Observer.emitGet){
                    ob.notify('get',key);
                }
                return val;
            },
            set         : function (newVal) {
                if (newVal === val) return;
                val = newVal;
                ob.notify('set', key, newVal);
            }
        })
    }

    on(event, fn) {
        this._cbs = this._cbs || {};
        if (!this._cbs[event]) {
            this._cbs[event] = [];
        }
        this._cbs[event].push(fn);

        return this;
    }

    emit(event, ...arg) {
        this._cbs     = this._cbs || {};
        let callbacks = this._cbs[event];
        if (!callbacks) return;
        callbacks = callbacks.slice();
        callbacks.forEach((ob, i) => {
            callbacks[i].apply(null, arg);
        })
    }

    notify(event, ...arg) {
        this.emit(event, ...arg);
        //todo 处理父类
        /*let parent = this.parent;
        if (!parent) return;
        let ob = parent.ob;
        ob.notify(event, ...arg);*/
    }
}
