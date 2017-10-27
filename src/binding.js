/**
 * Created by CAOYI on 2017/10/24.
 */
export default class Binding{
    constructor(){
        this._subs = [];
    }

    _addChild(key){
        return this[key] || new Binding();
    }

    _addSub(sub){
        this._subs.push(sub);
    }
}

