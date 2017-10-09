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

                this.convert(key,val);
            }
        }
    }

    convert(key,val){
        Object.defineProperty(this.value, key,{
            enumerable: true,
            configurable: true,
            get: function(){
                return val;
            },
            set: function(newVal){
                if(newVal === val) return;
                val = newVal;
            }
        })
    }

    // static create(value){
    //     if(Array.isArray(value)){
    //         return new Observer(value, ARRAY);
    //     }else if(typeof value === 'object'){
    //         return new Observer(value,OBJECT);
    //     }
    // }

}
Observer.create = function(value){
    if(Array.isArray(value)){
        return new Observer(value, ARRAY);
    }else if(typeof value === 'object'){
        return new Observer(value,OBJECT);
    }

}

module.exports = Observer;