/**
 * Created by CAOYI on 2017/10/26.
 */
import Observer  from '../observer/observer';

exports._initData = function(data){
    this._observer = Observer.create(data);

};