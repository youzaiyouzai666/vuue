/**
 * Created by CAOYI on 2017/11/14.
 */
import config from '../config';
import * as _ from '../util/index';

export default {
    update: function (is) {
        debugger;
        if (is) {
            if (!this.childBM) {
                this.build();
            }
            // this.childBM.$before(this.ref);
            _.before(this.el, this.ref);
        }else{
            _.remove(this.el);
            // this.childBM.$remove();
        }
    },
    bind  : function () {
        let el   = this.el;
        this.ref = document.createComment(`${config.prefix}if`);
        _.after(this.ref, el);
        _.remove(el);
    },
    build: function(){
        this.childBM = new _.Vuue({
            el: this.el
        });
    }
};