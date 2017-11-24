/**
 * Created by CAOYI on 2017/11/14.
 */
import config from '../config';
import * as _ from '../util/index';

export default {
    bind  : function () {
        let el   = this.el;
        this.ref = document.createComment(`${config.prefix}if`);
        _.after(this.ref, el);
        _.remove(el);
        this.inserted = false;
    },
    update: function (is) {
        if (is) {
            if (!this.inserted) {
                if (!this.childBM) {
                    this.build();
                }
                this.childBM.$before(this.ref);
                _.before(this.el, this.ref);
                this.inserted = true;
            }
        } else {
            if (this.inserted) {
                this.childBM.$remove();
                this.inserted = false;
            }
        }
    },

    build : function () {
        this.childBM = new _.Vuue({
            el  : this.el,
            parent: this.vm
        });
    }
};