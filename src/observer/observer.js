/**
 * Created by CAOYI on 2017/10/9.
 */

const ARRAY  = 0;
const OBJECT = 1;

class Observer {
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


    link() {

    }

    walk(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let val = obj[key];

                this.convert(key, val);

            }
        }
    }

    convert(key, val) {
        const ob = this;
        Object.defineProperty(this.value, key, {
            enumerable  : true,
            configurable: true,
            get         : function () {
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
            callbacks[i].apply(this, arg);
        })
    }

    notify(event, ...arg){
        this.emit(event,...arg);
        //todo 处理父类
    }

}

/**
 *
 * warn 这是个坑，class中 static方法 不能被遍历出来
 * @param value
 * @returns {Observer}
 */
Observer.create = function (value) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }

}


module.exports = Observer;