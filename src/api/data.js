/**
 * Created by CAOYI on 2017/10/24.
 */
import Watcher from '../watcher';

exports.$watch = function(exp, cb){
    new Watcher(this, exp, cb, this);
};